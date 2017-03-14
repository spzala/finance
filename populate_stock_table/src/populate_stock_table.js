var mysql      = require('mysql');
var connection;
const stockURL = process.env.STOCK_URL || "http://localhost:32824"

var Client = require('node-rest-client').Client;
var client = new Client();

 

function createDBConnection () {
    console.log ("Connecting to DB...")
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Boch3ch4',
        database : 'stock'
    });

    connection.connect();
}

function insertStock (stocks) {
    for (var i = 0; i < stocks.length; i++) {
        stock = stocks[i]
        console.log ("Inserting " + stock)
        connection.query ("INSERT INTO STOCK(SYMBOL) VALUES ('" + stock + "')", function (error, results, fields) {
            if (error) {
                console.log ("Error: " + error)
            }
        });
    }
}

function retrieveStocks () {
    console.log ("Stock URL: " + stockURL)
    url = stockURL + "/ticks"
    // direct way 
    client.get(url, function (data, response) {
        stocksStr = data.toString('utf8')
        stocks = JSON.parse(stocksStr)
        insertStock(stocks)
    });
}

function populateTable () {
    createDBConnection()
    retrieveStocks ()
}

populateTable()

module.exports = {
    populateTable: function(req, res) {
        console.log ("Populating table...")
        populateTable ();
        res.send ("Table populated")
    }
}