var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "forum_dev",
    port: "3306"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = { con }