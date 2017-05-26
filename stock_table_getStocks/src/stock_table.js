var mysql      = require('mysql');
var connection;
const mysqlHost = process.env.MYSQL_HOST || "localhost"
const mysqlPassword = process.env.MYSQL_PASSWORD || "Boch3ch4"
const mysqlPort = process.env.MYSQL_PORT || 3306

var Client = require('node-rest-client').Client;
var client = new Client(); 

function createDBConnection () {
    console.log ("Connecting to DB on " + mysqlHost + " port " + mysqlPort + " password " + mysqlPassword)
    connection = mysql.createConnection({
        host     : mysqlHost,
        user     : 'root',
        password : mysqlPassword,
        database : 'stock',
        port     : mysqlPort
    });

    connection.connect();
}

function retrieveStocks (res) {
    connection.query ("SELECT * FROM STOCK WHERE LAST_PRICE < 10 " + 
        "ORDER BY LAST_PE DESC", 
        function (error, result, fields) {
        if (error) {
            console.log ("Error: " + error)
        }
        res.send(result)
    })
}

console.log ("Waiting a few seconds to create connection")
setTimeout(createDBConnection, 20000)

module.exports = {
    get: function(req, res) {
        console.log ("Retrieving stocks")
        retrieveStocks(res)
    }
}