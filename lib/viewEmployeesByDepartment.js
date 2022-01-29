const db = require("../db/connection");
const inquirer = require("inquirer");


const askDepartmentQuestion = (depChoices) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'depInfo',
            message: 'Select a department:',
            choices: depChoices
        }
    ]);
}

const departmentSQL = () => {
    return db.execute({sql:"SELECT * FROM department", rowsAsArray: true});
}

const makeDepartmentChoicesArray = () => {
    return departmentSQL()
    .then(result => {
        let departments = [];
        result[0].forEach(element => {
            departments.push(element.join(" "));
        })
        return departments;
    })
}

const employeesByDepartmentSQL = (depId) => {
    return db.execute(`SELECT * FROM employee 
    LEFT JOIN role ON role.id = employee.role_id 
    LEFT JOIN department ON department.id = role.department_id 
    WHERE department.id = ${depId}`);
}

const viewEmployeesByDepartmentManager = () => {
    return makeDepartmentChoicesArray()
    .then(arr => {
        return askDepartmentQuestion(arr);
    })
    .then(result => {
        let department = result.depInfo.split(" ");
        return employeesByDepartmentSQL(department[0]);
    })
}

module.exports = {viewEmployeesByDepartmentManager};