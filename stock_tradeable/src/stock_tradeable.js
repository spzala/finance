var robinhood = require('robinhood')

function obtainAuth (req) {

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const a = new Buffer(b64auth, 'base64').toString().split(':')
    login = a[0]
    password = a[1]

    return {"username" : login, "password": password}
}

function retrieveStock (req, res, symbol) {

    credentials = obtainAuth(req)

    Robinhood = robinhood(credentials, function(){

        console.log ("Querying stock  " + symbol)
 
        //Robinhood is connected and you may begin sending commands to the api.
        Robinhood.instruments(symbol, function(err, response, body){
            if(err){
                console.error(err);
            }else{
                console.log(body.results[0]);
                res.json({symbol: symbol, tradeable: body.results[0].tradeable})
            }
        });
    });
}

module.exports = {
    get: function(req, res) {
     symbol = req.params.symbol
       retrieveStock(req, res, symbol)
    }
}