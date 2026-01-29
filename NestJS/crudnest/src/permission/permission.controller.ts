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
import { Roles } from 'src/common/decorator/auth.decorator';
import { Permission } from 'src/common/decorator/permission.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permission.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';

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

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permission('permission', 'view')
  @Get()
  async findAll() {
    return await this.permissionService.findAll();
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permission('permission', 'view')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionService.getPermissionById(+id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permission('permission', 'update')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionService.update(+id, updatePermissionDto);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Permission('permission', 'delete')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.permissionService.remove(+id);
  }
}
