export PATH=$PATH:/Applications/MySQLWorkbench.app/Contents/MacOS
echo Sleeping 10 seconds
sleep 10
echo Connecting to MySQL at $MYSQL_HOST using password $MYSQL_PASSWORD
mysql -u root --password=$MYSQL_PASSWORD --host=$MYSQL_HOST stock  < create_table.sql