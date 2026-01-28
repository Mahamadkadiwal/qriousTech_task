import { DataTypes} from "sequelize";
import { sequelize } from "../config/db.js";

const Role = sequelize.define("roles", {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'roles',
    timestamps: true,
    underscored: true
});

export default Role;