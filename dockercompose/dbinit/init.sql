CREATE DATABASE IF NOT EXISTS carsdb;

USE carsdb;

DROP TABLE IF EXISTS brands;

create table brands (
    id BIGINT PRIMARY key auto_increment,
    name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS cars;

CREATE TABLE cars(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    base_price DECIMAL(8,2) UNSIGNED NOT NULL,
    per_day_rate DECIMAL(8,2) UNSIGNED NOT NULL,
    plate CHAR(7) NOT NULL,
    color VARCHAR(255) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    date_of_rent datetime,
    deleted BOOLEAN DEFAULT FALSE,
    brand_id BIGINT,
    FOREIGN KEY (brand_id) REFERENCES brands(id),
    PRIMARY KEY(id)
);

