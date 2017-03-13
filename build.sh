# Build portfolio
cd portfolio
docker build -t patrocinio/finance_portfolio .
cd ..

cd all_ticks
./unzip_file.sh
cd ..

cd tick_table
./create_table.sh
cd ..

ticks/build.sh


