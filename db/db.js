const mysql = require('mysql');

let connection;
try {
    connection = mysql.createConnection({
        multipleStatements: true,
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    });
} catch (error) {
    console.log(error);
}


connection.connect((err) => {
    if (err) throw err;
    console.log("Conexion Exitosa");
});

module.exports = { connection }