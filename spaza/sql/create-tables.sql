CREATE TABLE categories
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE product
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	price int(255) NOT NULL,
	categoryID int(255) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(categoryID) REFERENCES categories(id)
);

CREATE TABLE sale
(
	id int NOT NULL AUTO_INCREMENT,
	product int(255) NOT NULL,
	price int(255) NOT NULL,
	quantity int(255) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(product) REFERENCES products(id)
);

CREATE TABLE supplier
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE purchase
(
	id int NOT NULL AUTO_INCREMENT,
	product int(255) NOT NULL,
	supplier int(255) NOT NULL,
	price int(255) NOT NULL,
	quantity int(255) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(product) REFERENCES products(id),
	FOREIGN KEY(supplier) REFERENCES supplier(id)
);

CREATE TABLE employeeLevel
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	level int(255) NOT NULL,
	ID_NUMBER int(255) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(level) REFERENCES employeeLevel(id)
);