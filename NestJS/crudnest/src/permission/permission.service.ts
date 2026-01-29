import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolePermission } from 'src/roles/models/role_permission.model';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './models/permission.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionModel: typeof Permission,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const permission = await this.permissionModel.create(createPermissionDto);

    return permission;
  }

  async findAll() {
    const permissions = await this.permissionModel.findAll();
    if (!permissions) {
      throw new NotFoundException(`Not permissions found`);
    }
    return permissions;
  }

  async getPermissionById(id: number) {
    const permission = await this.permissionModel.findByPk(id);
    if (!permission) {
      throw new NotFoundException(`No permission found with id ${id}`);
    }
    return permission;
  }

  async findByPermission(feature: string, name: string) {
    const permission = await this.permissionModel.findOne({
      where: {
        feature: feature,
        name: name,
      },
      attributes: ['permission_id'],
    });

    if (!permission) {
      throw new NotFoundException(`No permission found`);
    }

    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionModel.findByPk(id);

    if (!permission) {
      throw new NotFoundException(`No permission found with id ${id}`);
    }

    await permission.update(updatePermissionDto);
    return permission;
  }

  async remove(id: number) {
    const permission = await this.getPermissionById(id);

    await permission.destroy();
    return {
      message: 'Role deleted successfully',
    };
  }

  async getPermissionByUserId(roleIds: number[]) {
    const permissions = await RolePermission.findAll({
      where: {
        role_id: roleIds,
      },
      include: [
        {
          model: Permission,
          attributes: ['feature', 'name'],
        },
      ],
    });

    const permissionNames = permissions.map((rp) => {
      return {
        feature: rp?.Permission?.feature,
        name: rp?.Permission?.name,
      };
    });

    return permissionNames;
  }
}
