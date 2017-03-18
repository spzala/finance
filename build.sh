# Build portfolio
echo Building portfolio
cd portfolio
docker build -t patrocinio/finance_portfolio .
cd ..

echo Building all stocks
cd all_stocks
./unzip_file.sh
cd ..

echo Building tick table
cd create_stock_table
./create_table.sh
cd ..

echo Building stock table
cd stock_table
./build.sh
cd ..

echo Building stock spreadsheet
cd stock_spreadsheet
./build.sh
cd ..


