from openpyxl import load_workbook
print "Opening file..."
wb = load_workbook('/tmp/tickers/tickers.xlsx')
stocks = wb['Stock']
for row in stocks.rows:
	cell = row[0]
	print cell.value
