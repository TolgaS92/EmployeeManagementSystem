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
            choices: ['View All Employees', 'View All Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'EXIT'],
        }
    ]).then((answer) => {
        switch (answer.choices) {
            case "View All Employees":
                viewEmployees();
            break;
            case "View All Department":
                viewDepartments();
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

const viewDepartments = () => {
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        console.table(results);
        employeeManagement();
    })
};

const viewEmployeesByManager = () => {
    connection.query('SELECT * FROM roles', (err, results) => {
        if (err) throw err;
        console.table(results);
        employeeManagement();
    })
};

const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the name for employee ?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name for employee ?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role ID for this employee ?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the manager ID for this employee ?'
        }
    ]).then((answers) => {
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.roleId || 0,
                manager_id: answers.managerId || 0,
            },
            (err) => {
                if(err) throw err;
                console.log("New Employee added to employee's list!");
                employeeManagement();
            }
            );     
    });
};

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