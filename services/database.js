require('dotenv').config({ path: './.env' });
const mySql = require('mysql');
const dbConnection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MY_SQL_PASSWORD,
    database: 'shoe-store'
});

dbConnection.connect((err) => {
    if (err) throw err;
    
    console.log("Connection established")
});

module.exports = dbConnection;