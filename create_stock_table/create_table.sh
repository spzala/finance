export PATH=$PATH:/Applications/MySQLWorkbench.app/Contents/MacOS
mysql -u root -p --execute "create database stock"
mysql -u root -p stock < create_table.sql