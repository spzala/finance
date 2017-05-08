cid=$(docker run -P -d patrocinio/finance_process_stock_symbol:dev-1)
docker logs $cid