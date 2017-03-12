const ZIP_FILE = "http://investexcel.net/wp-content/uploads/2015/01/Yahoo-Ticker-Symbols-Jan-2016.zip"
const FILE="/tmp/ticker.zip"
const TARGET_DIR="/tmp/tickers"

var http = require("http")
var fs = require("fs")
var spawn = require('child_process').spawn

console.log ("Downloading file")
var file = fs.createWriteStream(FILE)
http.get(ZIP_FILE, function (rsp) {
	rsp.pipe(file)
})

console.log ("Unzipping")

ls = spawn("unzip", [ FILE ])

ls.stdout.on( 'data', data => {
    console.log( `stdout: ${data}` );
});

ls.stderr.on( 'data', data => {
    console.log( `stderr: ${data}` );
});

ls.on( 'close', code => {
    console.log( `child process exited with code ${code}` );
});
