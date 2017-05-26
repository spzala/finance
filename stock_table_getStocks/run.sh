cid=$(docker run -P -d patrocinio/finance_stock_table_get_stocks:dev-1)
echo Container ID: $cid
docker logs $cid