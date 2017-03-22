var mysql      = require('mysql');
var connection;
const stockSpreadsheetURL = process.env.STOCK_URL || "http://localhost:32817"

var Client = require('node-rest-client').Client;
var client = new Client();

var amqp = require('amqplib/callback_api');

const queueHost = process.env.QUEUE_HOST || "localhost"

function retrieveStock(ch, q, stock) {
    // Note: on Node 6 Buffer.from(msg) should be used
    if (stock != null) {
        console.log("Sending " + stock);
        ch.sendToQueue(q, new Buffer(stock));
    }
}

function retrieveStocks (ch, q) {
    console.log ("Stock URL: " + stockSpreadsheetURL)
    url = stockSpreadsheetURL + "/stocks"
    // direct way 
    client.get(url, function (data, response) {
        stocksStr = data.toString('utf8')
        stocks = JSON.parse(stocksStr)
        for (var i = 0; i < stocks.length; i++) {
            retrieveStock(ch, q, stocks[i])
        }
    });
}

function createMQConnection() {
    console.log ("Connecting to MQ")
    amqp.connect('amqp://localhost', function(err, conn) {
        console.log ("Creating channel")
        conn.createChannel(function(err, ch) {
            var q = 'stocks';

            ch.assertQueue(q, {durable: false});

            retrieveStocks(ch, q)
        });
    });

}

createMQConnection()

function populateTable () {
    createMQConnection ()
}

module.exports = {
    populateTable: function(req, res) {
        console.log ("Populating table...")
        populateTable ();
        res.send ("Table populated")
    }
}