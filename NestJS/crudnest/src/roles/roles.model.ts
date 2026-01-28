import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface RoleAttrs {
  role_id: number;
  name: string;
}

export interface RoleCreationAttributes extends Optional<
  RoleAttrs,
  'role_id'
> {}

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
}
