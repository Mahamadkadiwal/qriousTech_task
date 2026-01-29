import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AssignPerDto } from 'src/permission/dto/assign-per.dto';
import { PermissionService } from 'src/permission/permission.service';
import { RoleDto } from './dto/role.dto';
import { RolePermission } from './models/role_permission.model';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    private readonly permissionService: PermissionService,
  ) {}

  async createRole(roleDto: RoleDto) {
    const role = await this.roleModel.create(roleDto);
    return role;
  }

  async getAllRoles() {
    return this.roleModel.findAll();
  }

  async getRoleById(id: number) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async findByRole(roleName: string) {
    const role = await this.roleModel.findOne({
      where: {
        name: roleName,
      },
      attributes: ['role_id'],
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async getRoleByName(roleName: string) {
    const role = await this.roleModel.findOne({
      where: { name: roleName },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async updateRole(id: number, roleDto: RoleDto) {
    const role = await this.getRoleById(id);

    await role.update(roleDto);
    return role;
  }

  async deleteRole(id: number) {
    const role = await this.getRoleById(id);

    await role.destroy();
    return {
      message: 'Role deleted successfully',
    };
  }

  async assignPermission(assignPerDto: AssignPerDto) {
    const role = await this.findByRole(assignPerDto.role);

    const permission = await this.permissionService.findByPermission(
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
}
