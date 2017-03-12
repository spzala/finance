export PATH=$PATH:/Applications/MySQLWorkbench.app/Contents/MacOS
mysql -u root -p --execute "create database tick"
mysql -u root -p tick < create_table.sql