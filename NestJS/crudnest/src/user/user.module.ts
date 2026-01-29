import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserRole } from './models/user_role.model';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/models/roles.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole]), RolesModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
