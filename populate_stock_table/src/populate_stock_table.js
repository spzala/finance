var mysql      = require('mysql');
var connection;
const stockURL = process.env.STOCK_URL || "http://localhost:32788"

var Client = require('node-rest-client').Client;
var client = new Client();

function retrieveStocks () {
    console.log ("Stock URL: " + stockURL)
    url = stockURL + "/stocks"
    // direct way 
    client.get(url, function (data, response) {
        stocksStr = data.toString('utf8')
        stocks = JSON.parse(stocksStr)
        console.log (stocks)
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