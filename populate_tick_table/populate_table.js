const TICKERS="/tmp/tickers/tickers.xlsx"

var excel = require('excel-parser')

console.log ("Opening " + TICKERS)
excel.parse({
  inFile: TICKERS, 
  worksheet: 'Stock'
}, function(err, records){
  if(err) console.error(err);
  console.log(records);

});