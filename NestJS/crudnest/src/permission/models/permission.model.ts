import { Optional } from 'sequelize';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { RolePermission } from 'src/roles/models/role_permission.model';
import { Role } from 'src/roles/models/roles.model';

export interface PermissionAttrs {
  permission_id: number;
  feature: string;
  name: string;
}

export type PermissionCreationAttributes = Optional<
  PermissionAttrs,
  'permission_id'
>;

@Table({ tableName: 'permission', timestamps: true, underscored: true })
export class Permission extends Model<
  PermissionAttrs,
  PermissionCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare permission_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare feature: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @BelongsToMany(() => Role, () => RolePermission)
  declare roles: Role[];
}
