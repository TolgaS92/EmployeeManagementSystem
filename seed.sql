INSERT INTO departments (name)
VALUES ('Human Resources'), ('Sales Department'), ('IT Department'), ('Finance Department');

INSERT INTO roles (title, salary, department_id)
VALUES ('CEO', 250000, 1),('General Manager', 150000, 2),('Sales Representative', 60000, 5),('Accountant', 70000, 4), ('Software Engineer', 90000, 3), ('Project Manager', 110000, 6),('Intern', 45000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tolga', 'Secme', 7, 2),('Eugene', 'Maxwell', 3, 15),('Madeline', 'Lane', 4, 25),('Xina', 'Xeidoss', 5, 32),('Paco', 'Coup', 6, 25), ('Xavier', 'Soussa', 7, 55),('John', 'Heritage', 1, 1);

SELECT FROM * employeestracked_db;