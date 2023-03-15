-- USE
USE dev_training

-- INSERT
load data local infile "./accounts.csv" into table accounts fields terminated by ',' optionally enclosed by '"';
load data local infile "./todo.csv" into table todo fields terminated by ',' optionally enclosed by '"';
commit;