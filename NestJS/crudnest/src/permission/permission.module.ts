import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from './models/permission.model';
import { RolePermission } from 'src/roles/models/role_permission.model';

@Module({
  imports: [SequelizeModule.forFeature([Permission, RolePermission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
