
var yql = require('yql')
stmt = 'select * from yahoo.finance.quote '

config= {
    baseURL: {
        http: 'http://query.yahooapis.com/v1/public/yql',
        https: 'https://query.yahooapis.com/v1/public/yql'
    },
    env: 'store://datatables.org/alltableswithkeys',
    headers: {},
    ssl: false,
    timeout: 0 // 0 = No timeout
};


var query = new yql(stmt, config);
query.exec (function (error, rsp) {
	console.log (error)

	query = rsp["query"]
	results = query["results"]
	console.log (results)

	quote = results["quote"]
	console.log (quote)
})