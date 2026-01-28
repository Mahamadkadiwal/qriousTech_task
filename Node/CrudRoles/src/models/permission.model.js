import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Permission = sequelize.define("Permission", {
    permission_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    feature:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {    
    tableName: 'permission',
    timestamps: true,
    underscored:true
});

export default Permission;