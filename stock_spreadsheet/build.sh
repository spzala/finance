mkdir -p tmp/
cp /tmp/tickers/tickers.xlsx tmp/
docker build -t patrocinio/finance_stock_spreadsheet:dev-1 .

