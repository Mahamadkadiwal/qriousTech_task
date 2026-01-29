import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from './models/permission.model';
import { AssignPerDto } from './dto/assign-per.dto';
import { RolesService } from 'src/roles/roles.service';
import { RolePermission } from 'src/roles/models/role_permission.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission) private permissionModel: typeof Permission,
    private readonly roleService: RolesService,
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

  async assignPermission(assignPerDto: AssignPerDto) {
    const role = await this.roleService.findByRole(assignPerDto.role);

    const permission = await this.findByPermission(
      assignPerDto.feature,
      assignPerDto.permission,
    );

    const exists = await RolePermission.findOne({
      where: {
        role_id: role.role_id,
        permission_id: permission.permission_id,
      },
    });

    if (exists) {
      throw new ConflictException('Permission already assigned to this role');
    }

    await role.$add('permissions', permission);

    return { message: 'Permission assigned successfully' };
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
