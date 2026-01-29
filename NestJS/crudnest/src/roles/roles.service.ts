import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { Role } from './models/roles.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
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
}
