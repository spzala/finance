ZIP_FILE="http://investexcel.net/wp-content/uploads/2015/01/Yahoo-Ticker-Symbols-Jan-2016.zip"
OUTPUT_FILE="/tmp/tickers.zip"
OUTPUT_DIR="/tmp/tickers/"
TICKER_FILE=tickers.xlsx

wget $ZIP_FILE -O $OUTPUT_FILE
mkdir -p $OUTPUT_DIR
cd $OUTPUT_DIR
rm *
unzip -o $OUTPUT_FILE
mv *.xlsx $TICKER_FILE

echo File created in directory $OUTPUT_DIR


