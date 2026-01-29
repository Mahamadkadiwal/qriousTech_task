import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { RolesService } from './roles.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { Roles } from 'src/common/decorator/auth.decorator';
import { Permission } from 'src/auth/permission.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createRole(@Body() roleDto: RoleDto) {
    const role = await this.roleService.createRole(roleDto);
    return role;
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getRoleById(@Param('id') id: number) {
    return this.roleService.getRoleById(id);
  }

  @Put(':id')
  async updateRole(@Param('id') id: number, @Body() roleDto: RoleDto) {
    return this.roleService.updateRole(id, roleDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
