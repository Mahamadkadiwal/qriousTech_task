import { Optional } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from 'src/permission/models/permission.model';
import { User } from 'src/user/models/user.model';
import { UserRole } from 'src/user/models/user_role.model';
import { RolePermission } from './role_permission.model';

export interface RoleAttrs {
  role_id: number;
  name: string;
}

export type RoleCreationAttributes = Optional<RoleAttrs, 'role_id'>;

@Table({ tableName: 'roles', timestamps: true, underscored: true })
export class Role extends Model<RoleAttrs, RoleCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare role_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @BelongsToMany(() => User, () => UserRole)
  declare users: User[];

  @BelongsToMany(() => Permission, () => RolePermission)
  declare permissions: Permission[];
}
