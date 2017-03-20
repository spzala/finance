var yahooFinance = require('yahoo-finance')


function retrieveStockPrice (stock, res) {
    console.log ("Querying stock: " + stock)

    yahooFinance.snapshot ({
        symbol : stock,
        fields: ['a', 'b', 'b2', 'b3']
    }, function (err, snapshot) {
        if (err) {
            console.log ("Error during retrieveStockPrice for stock: " + stock + ":" + err)
        }
        if (snapshot != undefined && snapshot.ask != null) {
            res.send ("symbol: " + snapshot.symbol + " ask: " + snapshot.ask)
        }
    })
}


module.exports = {
    stockPrice: function(stock, res) {
        retrieveStockPrice(stock, res)
    }
}