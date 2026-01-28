import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const UserRole = sequelize.define("UserRole", {
    user_role_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'users',
            key: 'user_id'
        }
    },
    role_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'role_id'
        }
    }
},{
    tableName: 'user_roles',
    timestamps: true,
    underscored: true
});

export default UserRole;