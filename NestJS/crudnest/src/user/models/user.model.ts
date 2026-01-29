import { Optional } from 'sequelize';
import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from 'src/roles/models/roles.model';
import { UserRole } from './user_role.model';

export interface UserAttributes {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'user_id'>;

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @BelongsToMany(() => Role, () => UserRole)
  declare roles: Role[];
}
