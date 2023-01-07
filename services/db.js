const mysql = require("mysql");
const conn = mysql.createPool({
    user: "root",
    password: "Ammar@2022",
    host: "localhost",
    port: "3306",
    database: "foresight"
});

module.exports = conn;