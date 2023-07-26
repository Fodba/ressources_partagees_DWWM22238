DROP DATABASE IF EXISTS gescom;
CREATE DATABASE if NOT EXISTS gescom;

USE gescom;

CREATE TABLE Customers (
    cus_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cus_lastname VARCHAR(50) NOT NULL,
    cus_firstname VARCHAR(50) NOT NULL,
    cus_adress VARCHAR(255) NOT NULL,
    cus_zipcode VARCHAR(6) NOT NULL,
    cus_city VARCHAR(50) NOT NULL,
    cus_add_date DATETIME NOT NULL,
    cus_update_date DATETIME NOT NULL,
    cus_login VARCHAR(50) NOT NULL,
    cus_password VARCHAR(50) NOT NULL
);

CREATE TABLE Orders(
    ord_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ord_date DATETIME DEFAULT NOW() NOT NULL,
    ord_payment_date DATETIME NOT NULL,
    ord_cus_id INT NOT NULL,
    CONSTRAINT FK_ORDERS_CUSTOMERS FOREIGN KEY (ord_cus_id) REFERENCES Customers(cus_id)
);

CREATE TABLE Category (
    cat_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cat_label VARCHAR(50) NOT NULL,
    cat_sup_id INT NOT NULL,
    CONSTRAINT FK_CATEGORIES_CUSTOMERS FOREIGN KEY (cat_sup_id) REFERENCES Category(cat_id)
)








