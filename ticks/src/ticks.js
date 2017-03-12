const TICKERS="/tmp/tickers/tickers.xlsx"

var excel = require('excel-parser')

ticks = []

function retrieveTicks () {
	console.log ("Opening " + TICKERS)
	excel.parse({
  		inFile: TICKERS, 
  		worksheet: 'Stock'
	}, function(err, records){
  	if(err) console.error(err);
  		for (var i = 0; i < records.length; i++) {
        tick = records[i][0]
        console.log ("Tick:" + tick)
        ticks[i] = tick
  		}

	});
}

module.exports = {
    init: function() {
      console.log ("Initializing ticks...")
      retrieveTicks()
    },
    getTicks: function(req, res) {
        res.json(ticks); 
    }
}
