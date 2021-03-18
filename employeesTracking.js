const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeesTracked_db',
});


const employeeManagement = () => {
    inquirer
    .prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'EXIT'],
        }
    ]).then((answer) => {
        switch (answer.choices) {
            case "View All Employees":
                viewEmployees();
            break;
            case "View All Employees By Department":
                viewEmployeesByDepartment();
            break;
            case "View All Employees By Manager":
                viewEmployeesByManager();
            break;
            case "Add Employee":
                addEmployee();
            break;
            case "Remove Employee":
                removeEmployee();
            break;
            case "Update Employee Role":
                updateEmployeeRole();
            break;
            case "Update Employee Manager":
                updateEmployeeManager();
            break;
            case "EXIT":
                connection.end();            
        }
    })
}

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
        employeeManagement();
    })

};

const viewEmployeesByDepartment = () => {
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        console.table(results);
        employeeManagement();
    })

    
}

const viewEmployeesByManager = () => {

}

const addEmployee = () => {
    
}

const removeEmployee = () => {
    
}

const updateEmployeeRole = () => {
    
}

const updateEmployeeManager = () => {
    
}


connection.connect((err) => {
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    employeeManagement();
});