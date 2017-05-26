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


function updateStock (res, stock, price, pe) {
    console.log ("Updating stock " + stock)
    query = "UPDATE STOCK SET LAST_PRICE = " + price + 
        ", LAST_PE = " + pe + " WHERE SYMBOL = '" + stock + "'"

    console.log ("Query: " + query)
    connection.query (query, 
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

function insertStock (res, stock, price, pe) {
    console.log ("Inserting " + stock)
    connection.query ("INSERT INTO STOCK(SYMBOL, LAST_PRICE, LAST_PE) " +
            "VALUES ('" + stock +  "', " + price + ", " + pe + ")", 
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

function setStock (res, stock, body) {
    console.log ("Query stock " + stock + " body: " + body)
    connection.query ("SELECT * FROM STOCK WHERE SYMBOL = '" + symbol + "'", 
        function (error, result, fields) {
        if (error) {
            console.log ("Error: " + error)
            res.send ("Error" + error)
        } else {
            console.log ("result length:" + result.length + 
                " body: "+ body)
            price = body.price
            pe = body.pe
            if (result.length == 1) {
                updateStock (res, stock, price, pe)
            } else {
                insertStock (res, stock, price, pe)
            }
        }
    })


}

createDBConnection()

module.exports = {
    set: function(req, res) {
        symbol = req.params.symbol
        body = req.body
        console.log ("Setting stock for " + symbol + " body: " + body)
        setStock(res, symbol, body)
    }
}