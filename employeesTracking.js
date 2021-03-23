const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const logo = require('asciiart-logo');

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
            choices: ['View All Employees', 'View All Department', 'View All Roles', 'Add Department', 'Add Role', 'Add Employee', 'Remove Department', 'Remove Role', 'Remove Employee', 'Update Employee Role ID', 'Update Employee Manager ID', 'View the total utilized budget of a department', 'EXIT'],
        }
    ]).then((answer) => {
        switch (answer.choices) {
            case "View All Employees":
                viewEmployees();
            break;
            case "View All Department":
                viewDepartments();
            break;
            case "View All Roles":
                viewRoles();
            break;
            case "Add Department":
                addDepartment();
            break;
            case "Add Role":
                addRole();
            break;
            case "Add Employee":
                addEmployee();
            break;
            case "Remove Department":
                removeDepartment();
            break;
            case "Remove Role":
                removeRole();
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
            case "View the total utilized budget of a department":
                viewBudgetDepartment();
                break;
            case "EXIT":
                connection.end();            
        }
    })
}
//Build a command-line application that at a minimum allows the user to:
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

const viewRoles = () => {
    connection.query('SELECT * FROM roles', (err, results) => {
        if (err) throw err;
        console.table(results);
        employeeManagement();
    })
};

const addDepartment = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of department you would like to add ?'
        },
    ]).then((answers) => {
        connection.query(
            'INSERT INTO departments SET ?',
            {
                name: answers.departmentName,
            },
            (err) => {
                if(err) throw err;
                console.log("New Department added to Department's list!");
                employeeManagement();
            }
            );     
    });
};

const addRole = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title you would like to add ?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary amount you would like to add ?',
            validate(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
            },
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID for this role ?'
        },
    ]).then((answers) => {
        connection.query(
            'INSERT INTO roles SET ?',
            {
                title: answers.title,
                salary: answers.salary || 0,
                department_id: answers.departmentId,
            },
            (err) => {
                if(err) throw err;
                console.log("New Role added to Role's list!");
                employeeManagement();
            }
            );     
    });
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


// Bonus points if you're able to:

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

const removeDepartment = () => {
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ name }) => {
                            choiceArray.push(name);
                        });
                        return choiceArray;
                    },
                    message: 'Which department you would like to delete?',
                },
            ]).then((answer) => {
                connection.query(
                    'DELETE FROM departments WHERE ?',
                    {
                        name: answer.choice,
                    },
                    (err, res) => {
                        if(err) throw err;
                        console.log(`${res.affectedRows} department is deleted!`);
                        employeeManagement();
                    })
            });
        });
};

const removeRole = () => {
    connection.query('SELECT * FROM roles', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ title }) => {
                            choiceArray.push(title);
                        });
                        return choiceArray;
                    },
                    message: 'Which role you would like to delete?',
                },
            ]).then((answer) => {
                connection.query(
                    'DELETE FROM roles WHERE ?',
                    {
                        title: answer.choice,
                    },
                    (err, res) => {
                        if(err) throw err;
                        console.log(`${res.affectedRows} role is deleted!`);
                        employeeManagement();
                    })
            });
        });
};

const removeEmployee = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({ first_name }) => {
                            choiceArray.push(first_name);
                        });
                        return choiceArray;
                    },
                    message: 'Which employee you would like to delete?',
                },
            ]).then((answer) => {
                connection.query(
                    'DELETE FROM employee WHERE ?',
                    {
                        first_name: answer.choice,
                    },
                    (err, res) => {
                        if(err) throw err;
                        console.log(`${res.affectedRows} employee information is deleted!`);
                        employeeManagement();
                    })
            });
        });
};

const viewBudgetDepartment = () => {
    connection.query('SELECT * FROM roles', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    choices() {
                        const choices = [];
                        results.forEach(({ title })=> {
                            choices.push(title);
                        });
                        return choices;
                    },
                    message: "Which Role's salary would you ike to see?",
                },
            ]).then((answer) => {
                connection.query(
                    'SELECT * FROM roles',
                    {
                        salary: answer.choice,
                    },
                    (err, res) => {
                        if(err) throw err;
                        console.table(res);
                        employeeManagement();   
                    }
                )
            })
        }
    )
}

connection.connect((err) => {
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    const logoText = logo({ name: "Employe Management Systems"}).render();
    console.log(logoText);
    employeeManagement();
});