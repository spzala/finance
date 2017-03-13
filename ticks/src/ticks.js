const TICKERS="tickers.xlsx"

var excel = require('excel-parser')

ticks = []

function retrieveTicks () {
//  process.chdir("node_modules/excel-parser")
	console.log ("Opening " + TICKERS + " current directory " + process.cwd())
	excel.parse({
  		inFile: TICKERS, 
  		worksheet: 'Stock'
	}, function(err, records){
  	if(err) console.error("Error: " + err);
    if (records != undefined) {
    		for (var i = 0; i < records.length; i++) {
          tick = records[i][0]
          console.log ("Tick:" + tick)
          ticks[i] = tick
  		  }
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
