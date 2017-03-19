from openpyxl import load_workbook
from flask import Flask
import json

app = Flask(__name__)

print ("Opening file...")

result = []
wb = load_workbook('/tmp/tickers.xlsx')
stocks = wb['Stock']
for row in stocks.rows:
	cell = row[0]
	result.append (cell.value)

@app.route("/stocks")
def getStocks():
	return json.dumps(result)

@app.route('/')
def index():
    return 'Index Page'

if __name__ == '__main__':
    app.run(host='0.0.0.0')