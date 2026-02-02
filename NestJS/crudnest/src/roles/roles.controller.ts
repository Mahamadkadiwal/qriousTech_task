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
import { Permission } from 'src/common/decorator/permission.decorator';
import { PermissionsGuard } from 'src/common/guards/permission.guard';
import { AssignPerDto } from 'src/permission/dto/assign-per.dto';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorator/auth.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin', 'user', 'manager')
  @Permission('role', 'add')
  @Post('create')
  async createRole(@Body() roleDto: RoleDto) {
    const role = await this.roleService.createRole(roleDto);
    return role;
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permission('role', 'view')
  @Get()
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get('getAssign')
  async getAssignPermission() {
    return await this.roleService.getAssignedPermissions();
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permission('role', 'view')
  @Get(':id')
  async getRoleById(@Param('id') id: number) {
    return this.roleService.getRoleById(id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permission('role', 'update')
  @Put(':id')
  async updateRole(@Param('id') id: number, @Body() roleDto: RoleDto) {
    return this.roleService.updateRole(id, roleDto);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permission('role', 'delete')
  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Roles('admin')
  @Permission('assign', 'add')
  @Post('assign')
  async assignPermission(@Body() assignPerDto: AssignPerDto) {
    return await this.roleService.assignPermission(assignPerDto);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Roles('admin')
  @Permission('assign', 'update')
  @Put('assign/:id')
  async editAssignedPermission(
    @Param('id') id: number,
    @Body() assignPerDto: AssignPerDto,
  ) {
    return await this.roleService.editAssignedPermission(id, assignPerDto);
  }
}
