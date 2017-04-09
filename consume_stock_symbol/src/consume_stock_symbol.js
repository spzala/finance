var connection;

var Client = require('node-rest-client').Client;
var client = new Client();

var amqp = require('amqplib/callback_api');

const queueHost = process.env.QUEUE_HOST || "localhost"

function retrieveStocks (ch, q) {
    ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
}

function createMQConnection() {
    console.log ("Connecting to MQ at " + queueHost)
    amqp.connect('amqp://' + queueHost, function(err, conn) {
        console.log ("Creating channel")
        conn.createChannel(function(err, ch) {
            var q = 'stocks';

            ch.assertQueue(q, {durable: false});

            retrieveStocks(ch, q)
        });
    });

}

function consume () {
    createMQConnection ()
}

module.exports = {
    consume: function(req, res) {
        console.log ("Consuming symbols...")
        consume ();
        res.send ("Consuming symbols")
    }
}