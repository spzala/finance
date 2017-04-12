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

function retrieveStock (res, symbol) {
    connection.query ("SELECT * FROM STOCK WHERE SYMBOL = '" + symbol + "'", 
        function (error, result, fields) {
        if (error) {
            console.log ("Error: " + error)
            res.send ("Error" + error)
        } else {
            res.send(result[0])
        }
    })
}


function updateStock (res, stock, price) {
    console.log ("Updating stock " + stock)
    connection.query ("UPDATE STOCK SET LAST_PRICE = " + price + 
        " WHERE SYMBOL = '" + stock + "'", 
        function (error, results, fields) {
            if (error) {
                console.log ("Error: " + error)
                res.send("Error" + error)
            } else {
                console.log ("Stock set")
                res.send ("Stock set")
            }
        }
    );
}

function insertStock (res, stock, price) {
    console.log ("Inserting " + stock)
    connection.query ("INSERT INTO STOCK(SYMBOL, LAST_PRICE) VALUES ('" + stock + 
        "', " + price + ")", 
        function (error, results, fields) {
            if (error) {
                console.log ("Error: " + error)
                res.send("Error" + error)
            } else {
                console.log ("Stock set")
                res.send ("Stock set")
            }
        }
    );
}

function setStock (res, stock, price) {
    console.log ("Query stock " + stock)
    connection.query ("SELECT * FROM STOCK WHERE SYMBOL = '" + symbol + "'", 
        function (error, result, fields) {
        if (error) {
            console.log ("Error: " + error)
            res.send ("Error" + error)
        } else {
            console.log ("result length:" + result.length )
            if (result.length == 1) {
                updateStock (res, stock, price)
            } else {
                insertStock (res, stock, price)
            }
        }
    })


}

createDBConnection()

module.exports = {
    set: function(req, res) {
        symbol = req.params.symbol
        price = req.params.price
        console.log ("Setting stock for " + symbol + " price: " + price)
        setStock(res, symbol, price)
    }
}