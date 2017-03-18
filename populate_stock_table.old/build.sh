mkdir tmp/
cp /tmp/tickers/tickers.xlsx tmp/
docker build -t patrocinio/finance_populate_stock_table:dev-1 .

