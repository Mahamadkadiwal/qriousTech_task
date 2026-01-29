import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { AssignPerDto } from './dto/assign-per.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';
import { Roles } from 'src/common/decorator/auth.decorator';
import { Permission } from 'src/auth/permission.decorator';
import { PermissionsGuard } from 'src/auth/permission.guard';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles()
  @Permission('permission', 'add')
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionService.create(createPermissionDto);
  }

  @Get()
  async findAll() {
    return await this.permissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionService.getPermissionById(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.permissionService.remove(+id);
  }

  @Post('assign')
  async assignPermission(@Body() assignPerDto: AssignPerDto) {
    return await this.permissionService.assignPermission(assignPerDto);
  }
}
