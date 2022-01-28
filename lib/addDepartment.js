const inquirer = require('inquirer');
const table = require('console.table');
const db = require("../db/connection");
const allDepartmentsSQL = require('./viewAllDepartments');

const departmentNameQuestion = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'depName',
            message: 'What is the name of the new department?'
        }
    ]);
}

const addDepartmentSQL = (depName) => {
    return db.query(`INSERT INTO department (name) VALUES ('${depName}')`);
}

const addDepartmentManager = () => {
    return allDepartmentsSQL.allDepartmentsSQL()
    .then(data => {
        console.log("------Existing Departments------");
        console.log(table.getTable(data[0]));
        return departmentNameQuestion();
    })
    .then(data => {
        return addDepartmentSQL(data.depName);
    })
    .then(data => {
        console.log("department added successfully.");
        return;
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {addDepartmentManager};