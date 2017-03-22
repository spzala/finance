var mysql      = require('mysql');
var connection;
const stockSpreadsheetURL = process.env.STOCK_URL || "http://localhost:32804"
const stockPriceURL = process.env.STOCK_PRICE_URL || "http://localhost:32805"

var Client = require('node-rest-client').Client;
var client = new Client();

const priceURL = stockPriceURL+"/stockPrice/"

function retrieveStock(stock) {
    var url = priceURL + stock
    console.log ("Price URL: " + url)
    client.get(url, function (data, response) {
        if (response.statusCode == 200) {
            console.log (data)
        } else {
//            console.log ("Skipping " + stock)
        }
    })
}

function retrieveStocks () {
    console.log ("Stock URL: " + stockSpreadsheetURL)
    url = stockSpreadsheetURL + "/stocks"
    // direct way 
    client.get(url, function (data, response) {
        stocksStr = data.toString('utf8')
        stocks = JSON.parse(stocksStr)
        max = Math.min (stocks.length, 300)
        for (var i = 0; i < max; i++) {
            retrieveStock(stocks[i])
        }
    });
}

function populateTable () {
    retrieveStocks ()
}

module.exports = {
    populateTable: function(req, res) {
        console.log ("Populating table...")
        populateTable ();
        res.send ("Table populated")
    }
}