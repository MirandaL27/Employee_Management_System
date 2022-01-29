const db = require("../db/connection");
const inquirer = require("inquirer");

const askEmployeeQuestion = (empChoices) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'empInfo',
            message: 'Select an employee to delete:',
            choices: empChoices
        }
    ]);
}

const employeeSQL = () => {
    return db.execute({sql:"SELECT id, first_name, last_name FROM employee", rowsAsArray: true});
}

const makeEmployeeChoicesArray = () => {
    return employeeSQL()
    .then(result => {
        let employees = [];
        result[0].forEach(element => {
            employees.push(element.join(" "));
        })
        return employees;
    })
}

const deleteEmployeeSQL = (employeeId) => {
    return db.execute(`DELETE FROM employee
    WHERE employee.id = ${employeeId}`);
}

const deleteEmployeeManager = () => {
    return makeEmployeeChoicesArray()
    .then(arr => {
        return askEmployeeQuestion(arr);
    })
    .then(result => {
        let role = result.empInfo.split(" ");
        return deleteEmployeeSQL(role[0]);
    })
    .then(data => {
        console.log("Employee successfully deleted.");
        return;
    })
}

module.exports = {deleteEmployeeManager};