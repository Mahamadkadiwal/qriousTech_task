import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { UserRole } from 'src/user/models/user_role.model';
import { RolePermission } from './models/role_permission.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, UserRole, RolePermission])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
