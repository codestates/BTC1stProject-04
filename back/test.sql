show databases;
use bithumb;

show tables;
select * from accounts;
select * from wallets;

select * from migrations;
select * from moonbeamBlocks;
select * from moonbeamTestnetBlocks;
select * from moonbeamTestnetTransactions;
select * from moonbeamTransactions;

TRUNCATE TABLE bithumb.moonbeamTestnetTransactions;
TRUNCATE TABLE bithumb.moonbeamTestnetBlocks;