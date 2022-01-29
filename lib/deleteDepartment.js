const db = require("../db/connection");
const inquirer = require("inquirer");

const askDepartmentQuestion = (depChoices) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'depInfo',
            message: 'Select a department to delete:',
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

const deleteDepartmentSQL = (depId) => {
    return db.execute(`DELETE FROM department
    WHERE department.id = ${depId}`);
}

const deleteDepartmentManager = () => {
    return makeDepartmentChoicesArray()
    .then(arr => {
        return askDepartmentQuestion(arr);
    })
    .then(result => {
        let department = result.depInfo.split(" ");
        return deleteDepartmentSQL(department[0]);
    })
    .then(data => {
        console.log("Department successfully deleted.");
        return;
    })
}

module.exports = {deleteDepartmentManager};