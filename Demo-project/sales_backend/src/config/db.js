const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'qrious_task',
    'root',
    '',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        logging: false
    }
)

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed: ', error);
    }
}

module.exports = {sequelize, connectDB}