const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'hs_vpn',
    password: ''
});

module.exports = pool.promise();