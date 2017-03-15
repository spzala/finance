var mysql      = require('mysql');
var yahooFinance = require('yahoo-finance')
var connection;

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

function insertStock (stock, ask) {
    stmt = "UPDATE STOCK SET LAST_PRICE = " + ask + " WHERE  SYMBOL = '" + stock + "'"
    console.log ("Statement: " + stmt)
    connection.query (stmt, function (error, results, fields) {
            if (error) {
                console.log ("Error during insertStock: " + error)
            }
        })
}

function retrieveStockPrice (stock) {
//    console.log ("Querying stock: " + stock)

    yahooFinance.snapshot ({
        symbol : stock,
        fields: ['a', 'b', 'b2', 'b3']
    }, function (err, snapshot) {
        if (err) {
            console.log ("Error during retrieveStockPrice for stock: " + stock + ":" + err)
        }
        if (snapshot != undefined && snapshot.ask != null) {
            insertStock (snapshot.symbol, snapshot.ask)
        }
    })
}

function retrieveStocks () {
    console.log ("Retrieving stocks")

    connection.query ("SELECT symbol FROM STOCK WHERE LAST_PRICE IS NULL", function (error, results, fields) {
        if (error) {
            console.log ("Error: " + error)
        }

        console.log ("=========== Result size: " + results.length)

        max = Math.max(results.length, 1000)

        for (i = 0; i < results.length; i ++) {
            retrieveStockPrice (results[i].symbol)
        }
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