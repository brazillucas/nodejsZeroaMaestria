const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'android',
    password: 'marshmallow',
    database: 'nodemysql'
})

module.exports = pool