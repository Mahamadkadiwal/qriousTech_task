import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permission } from 'src/permission/models/permission.model';
import { Role } from './roles.model';

@Table({
  tableName: 'role_permission',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['role_id', 'permission_id'],
    },
  ],
})
export class RolePermission extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare role_per_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  declare role_id: number;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.INTEGER,
  })
  declare permission_id: number;

  @BelongsTo(() => Permission)
  declare Permission: Permission;

  @BelongsTo(() => Role)
  declare Role: Role;
}
