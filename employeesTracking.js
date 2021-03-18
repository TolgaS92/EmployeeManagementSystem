const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeesTracked_db',
});


connection.connect((err) => {
    if(err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
});