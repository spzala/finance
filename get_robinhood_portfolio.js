//The username and password you use to sign into the robinhood app.

var credentials = {
    username: process.env.ROBINHOOD_USERNAME,
    password: process.env.ROBINHOOD_PASSWORD
};

var robinhood = require('robinhood')

stocks = {}


function proceed (stocks) {
    console.log ("Portfolio: ")
    for (stock in stocks) {
        console.log (stock)
    }
}

function retrieveInstrument (err, response, body){
    if(err){
        console.error(err);
    }else{
        symbol = body["symbol"]
        console.log ("Symbol: " + symbol)
        stocks[symbol] = stock;
        num_stocks--
        if (num_stocks == 0) {
            proceed(stocks)
        }
    }
}

function retrievePositions (err, response, body) {
    if(err){
        console.error(err);
    }else{
        results = body["results"]
        num_stocks = 0;
        for (i = 0; i < results.length; i++) {
            stock = results[i];
            shares = parseInt(stock["shares_held_for_sells"]);
            if (shares > 0) {
                num_stocks++
                Robinhood.url(stock["instrument"], retrieveInstrument)
            }
        }
    }         
        
} 


module.exports = {
    retrievePortfolio: function(res) {
        Robinhood = robinhood(credentials, function(){

            console.log ("Logging in to Robinhood")

            //Robinhood is connected and you may begin sending commands to the api.
            Robinhood.accounts(function(err, response, body){
                if(err){
                    console.error(err);
                }else{
                    positions = body["results"][0]["positions"]

                    console.log ("Retrieving positions")
                    Robinhood.url(positions, retrievePositions)
                }
            });
        });
    },

    getPortfolio: function(res) {
            res.json(stocks); 
    }
}