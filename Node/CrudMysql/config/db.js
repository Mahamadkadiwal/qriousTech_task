const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qrious_task',
    // connectionLimit: 10,
    // waitForConnections: true,
    // queueLimit: 10
});

module.exports = pool;

