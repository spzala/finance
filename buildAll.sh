echo Buidling create stock table
cd create_stock_table
./build.sh
cd ..

echo Building portfolio
cd portfolio
docker build -t patrocinio/finance_portfolio .
cd ..

echo Building all stocks
cd all_stocks
./unzip_file.sh
cd ..

echo Building stock table get
cd stock_table_get
./build.sh
cd ..

echo Building stock table set
cd stock_table_set
./build.sh
cd ..

echo Building stock spreadsheet
cd stock_spreadsheet
./build.sh
cd ..

echo Building pump stock symbol
cd pump_stock_symbol
./build.sh
cd ..

echo Building stock price
cd stock_price
./build.sh
cd ..

echo Building process stock symbol
cd process_stock_symbol
./build.sh
cd ..




