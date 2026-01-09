const {DataTypes} = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    product_image: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true
});

module.exports = Product;

