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

INSERT INTO departments (name)
VALUES ('Human Resources'), ('Sales Department'), ('IT Department'), ('Finance Department');

INSERT INTO roles (title, salary, department_id)
VALUES ('CEO', 250000, 1),('General Manager', 150000, 2),('Sales Representative', 60000, 5),('Accountant', 70000, 4), ('Software Engineer', 90000, 3), ('Project Manager', 110000, 6),('Intern', 45000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tolga', 'Secme', 7, 2),('Eugene', 'Maxwell', 3, 15),('Madeline', 'Lane', 4, 25),('Xina', 'Xeidoss', 5, 32),('Paco', 'Coup', 6, 25), ('Xavier', 'Soussa', 7, 55),('John', 'Heritage', 1, 1);
