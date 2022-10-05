require("dotenv").config();
var mysql = require("mysql2");
var mysqlPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    debug: false,
    queueLimit: 30,
    connectTimeout: 40000,
    multipleStatements: true,
});
// Attempt to catch disconnects
mysqlPool.on("connection", function (connection) {
    console.log("DB Connection established");

    mysqlPool.on("error", function (err) {
        console.error("MySQL error", err.code);
    });
    mysqlPool.on("close", function (err) {
        console.error("MySQL close", err);
    });
});
mysqlPool.on("error", function (connection) {
    console.error("MySQL error", err.code);
});

// now get a Promise wrapped instance of that pool
const promisePool = mysqlPool.promise();
module.exports = promisePool;
