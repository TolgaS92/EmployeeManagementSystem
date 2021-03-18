DROP DATABASE IF EXISTS employeestracked_db;
CREATE DATABASE employeestracked_db;

USE employeestracked_db;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  
  name VARCHAR(30) NOT NULL,
  
  PRIMARY KEY (id)
);

CREATE TABLE roles(
	id INT NOT NULL AUTO_INCREMENT,
    
    title VARCHAR(30) NOT NULL,
    
    salary DECIMAL,
    
    department_id INT,
    
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    
    first_name VARCHAR(30) NOT NULL,
    
    last_name VARCHAR(30) NOT NULL,
    
    role_id INT,
    
    manager_id INT,
    
    PRIMARY KEY (id)
);