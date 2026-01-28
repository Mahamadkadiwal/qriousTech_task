import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const RolePermission = sequelize.define("RolePermission", {
    role_per_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    role_id:{
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'roles',
            key: 'role_id'
        } 
    },
    permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'permission',
            key: 'permission_id'
        }
    }
}, {
    tableName: 'role_permission',
    timestamps: true,
    underscored: true
});

export default RolePermission;

