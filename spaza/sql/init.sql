drop database spazas ;
create database spazas;
use spazas;
drop table user;
CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    storename varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY(id)

);

INSERT INTO user (username,password,storename,email)
VALUES ('Sipho','skay','SikaMareyza','sikwana@gmail.com');

INSERT INTO user (username,password,storename,email)
VALUES ('Sipho','skay','SikaMareyza','sikwana@gmail.com');

INSERT INTO user (username,password,storename,email)
VALUES ('Sipho','skay','SikaMareyza','sikwana@gmail.com');

INSERT INTO user (username,password,storename,email)
VALUES ('Sipho','skay','SikaMareyza','sikwana@gmail.com');

INSERT INTO user (username,password,storename,email)
VALUES ('Sipho','skay','SikaMareyza','sikwana@gmail.com');