//The username and password you use to sign into the robinhood app.

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

function obtainAuth (req) {

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const a = new Buffer(b64auth, 'base64').toString().split(':')
    login = a[0]
    password = a[1]

    return {"username" : login, "password": password}
}


module.exports = {
    retrievePortfolio: function(req, res) {

        credentials = obtainAuth(req)

        Robinhood = robinhood(credentials, function(){

            console.log ("Logging in to Robinhood username: " + 
                credentials["username"] + " password: " + credentials["password"])

            //Robinhood is connected and you may begin sending commands to the api.
            Robinhood.accounts(function(err, response, body){
                if(err){
                    console.error(err);
                }else{
                    positions = body["results"][0]["positions"]

                    console.log ("Retrieving positions")
                    Robinhood.url(positions, retrievePositions)
                    res.send ("Portfolio updated")
                }
            });
        });
    },

    getPortfolio: function(res) {
            res.json(stocks); 
    }
}