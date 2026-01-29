import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from 'src/roles/models/roles.model';

@Table({
  tableName: 'user_roles',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'role_id'],
    },
  ],
})
export class UserRole extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare user_role_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  declare role_id: number;
}
