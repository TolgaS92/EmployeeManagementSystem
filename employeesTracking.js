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
            choices: ['View All Employees', 'View All Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role ID', 'Update Employee Manager ID', 'EXIT'],
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
            case "Update Employee Role ID":
                updateEmployeeRole();
            break;
            case "Update Employee Manager ID":
                updateEmployeeManagerId();
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
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'choice',
                type: 'rawlist',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ first_name }) =>{
                        choiceArray.push(first_name);
                    });
                    return choiceArray;
                },
                message: 'Which employee role ID would you like to update?',
            },
            {
                name: 'newRoleId',
                type: 'input',
                message: 'What is the role ID would you like to change to?',
            },
        ]).then((answer) => {
            let givenID;
            results.forEach((role_id) => {
                if(role_id.first_name === answer.choice) {
                    givenID = role_id;
                }
            });
            if (parseInt(answer.newRoleId)) {
                connection.query(
                    'UPDATE employee SET ? WHERE ?',
                    [
                        {
                            role_id: answer.newRoleId,
                        },
                        {
                            id: givenID.id,
                        },
                    ],
                    (error) => {
                        if(error) throw err;
                        console.log('New Role ID Updated succesfully!');
                        employeeManagement();
                    }
                );
            } else {
                console.log("It didn't updated!")
                employeeManagement();
            }
        });
    });
};

const updateEmployeeManagerId = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'choice',
                type: 'rawlist',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ first_name }) =>{
                        choiceArray.push(first_name);
                    });
                    return choiceArray;
                },
                message: 'Which employee manager ID would you like to update?',
            },
            {
                name: 'newRoleId',
                type: 'input',
                message: 'What is the manager ID would you like to change to?',
            },
        ]).then((answer) => {
            let givenID;
            results.forEach((manager_id) => {
                if(manager_id.first_name === answer.choice) {
                    givenID = manager_id;
                }
            });
            if (parseInt(answer.newRoleId)) {
                connection.query(
                    'UPDATE employee SET ? WHERE ?',
                    [
                        {
                            manager_id: answer.newRoleId,
                        },
                        {
                            id: givenID.id,
                        },
                    ],
                    (error) => {
                        if(error) throw err;
                        console.log('New Manager ID Updated succesfully!');
                        employeeManagement();
                    }
                );
            } else {
                console.log("It didn't updated!")
                employeeManagement();
            }
        });
    });
};


connection.connect((err) => {
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    employeeManagement();
});