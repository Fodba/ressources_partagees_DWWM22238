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

CREATE TABLE Categories (
    cat_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cat_label VARCHAR(50) NOT NULL,
    cat_parent_id INT NOT NULL,
    CONSTRAINT FK_CATEGORIES_CATEGORIES FOREIGN KEY (cat_parent_id) REFERENCES Categories(cat_id)
);

CREATE TABLE Employees (
    emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emp_lastname VARCHAR(50) NOT NULL,
    emp_firstname VARCHAR(50) NOT NULL,
    emp_adress VARCHAR(255) NOT NULL,
    emp_zipcode VARCHAR(6) NOT NULL,
    emp_city VARCHAR(50) NOT NULL,
    emp_add_date DATETIME NOT NULL,
    emp_update_date DATETIME NOT NULL,
    emp_job VARCHAR(50) NOT NULL,
    emp_salary DECIMAL(6,2) NOT NULL,
    emp_store VARCHAR(50) NOT NULL,
    emp_service VARCHAR(50) NOT NULL,
    emp_sexe BOOLEAN NOT NULL,
    emp_children INT NOT NULL,
    emp_superior_id INT NOT NULL,
    CONSTRAINT FK_EMPLOYEE_EMPLOYEE FOREIGN KEY (emp_superior_id) REFERENCES Employees(emp_id)
);


CREATE TABLE Suppliers (
    sup_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sup_name VARCHAR(50) NOT NULL,
    sup_adress VARCHAR(255) NOT NULL,
    sup_zipcode VARCHAR(15) NOT NULL,
    sup_city VARCHAR(50) NOT NULL,
    sup_contact VARCHAR(50) NOT NULL,
    sup_phone VARCHAR(15) NOT NULL,
    sup_mail VARCHAR(255) NOT NULL
);

CREATE TABLE Products (
    pro_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pro_price DECIMAL(5,2) NOT NULL,
    pro_reference VARCHAR(50) NOT NULL,
    pro_ean VARCHAR(50) NOT NULL,
    pro_physic_stock INT NOT NULL,
    pro_alert_stock INT NOT NULL,
    pro_color VARCHAR(50) NOT NULL,
    pro_label VARCHAR(50) NOT NULL,
    pro_description TEXT,
    pro_add_date DATETIME NOT NULL,
    pro_update_date DATETIME NOT NULL,
    pro_photo VARCHAR(255) NOT NULL,
    pro_dispo BOOLEAN NOT NULL,
    pro_cat_id INT NOT NULL,
    pro_sup_id INT NOT NULL,
    CONSTRAINT FK_PRODUCTS_CATEGORIES FOREIGN KEY (pro_cat_id) REFERENCES Categories(cat_id),
    CONSTRAINT FK_PRODUCTS_SUPPLIERS FOREIGN KEY (pro_sup_id) REFERENCES Suppliers(sup_id)
);


CREATE TABLE contenir(
    cont_pro_id INT NOT NULL,
    cont_ord_id INT NOT NULL,
    cont_quantite INT NOT NULL,
    cont_remise DECIMAL(4,2) NULL,
    CONSTRAINT FK_CONTENIR_PRODUCTS FOREIGN KEY (cont_pro_id) REFERENCES Products(pro_id),
    CONSTRAINT FK_CONTENIR_ORDERS FOREIGN KEY (cont_ord_id) REFERENCES Orders(ord_id),
    CONSTRAINT PK_CONTENIR PRIMARY KEY(cont_pro_id,cont_ord_id)
);


CREATE TABLE Order_details(
    od_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    od_pro_id INT NOT NULL,
    od_ord_id INT NOT NULL,
    od_quantite INT NOT NULL,
    od_remise DECIMAL(4,2) NULL,
    CONSTRAINT FK_ORDER_DETAILS_PRODUCTS FOREIGN KEY (od_pro_id) REFERENCES Products(pro_id),
    CONSTRAINT FK_ORDER_DETAILS_ORDERS FOREIGN KEY (od_ord_id) REFERENCES Orders(ord_id)
);