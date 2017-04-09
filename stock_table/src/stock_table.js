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

function insertStock (stocks) {
    for (var i = 0; i < stocks.length; i++) {
        stock = stocks[i]
        console.log ("Inserting " + stock)
        connection.query ("INSERT INTO STOCK(SYMBOL) VALUES ('" + stock + "')", 
            function (error, results, fields) {
            if (error) {
                console.log ("Error: " + error)
            }
        });
    }
}

function retrieveStock (res, symbol) {
    connection.query ("SELECT * FROM STOCK WHERE SYMBOL = '" + symbol + "'", 
        function (error, result, fields) {
        if (error) {
            console.log ("Error: " + error)
        }
        res.send(result[0])
    })
}

console.log ("Waiting a few seconds to create connection")
setTimeout(createDBConnection, 20000)

module.exports = {
    get: function(req, res) {
        symbol = req.params.symbol
        console.log ("Retrieving stock for " + symbol)
        retrieveStock(res, symbol)
    }
}