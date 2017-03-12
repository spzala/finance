# Build portfolio
docker build -t patrocinio/finance_portfolio .

# Build all ticks
cd all_ticks
./unzip_file.sh

cd tick_table
./create_table.sh

