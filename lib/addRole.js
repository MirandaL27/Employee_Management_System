const inquirer = require('inquirer');
const table = require('console.table');
const db = require("../db/connection");
const allRolesSQL = require('./viewAllRoles');



const addRoleQuestions = (depChoices) => {
        return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'roleDep',
            message: 'Select a department for this role:',
            choices: depChoices

        }
    ]);
}

const departmentSQL = () => {
    return db.query({sql: "SELECT * FROM department", rowsAsArray: true});
}

const departmentChoices = () => {
    return departmentSQL()
    .then(data => {
        let choicesArr = [];
        data[0].forEach(element => {
            choicesArr.push(element.join(" "));
        });
        return choicesArr;
    })
}


const addRoleSQL = (roleName, roleSalary, depId) => {
    let params = [roleName, roleSalary, depId];
    let sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    return db.query(sql, params);
}

const addRoleManager = () => {
    return departmentChoices()
    .then(arr => {
        return addRoleQuestions(arr);
    })
    .then(result => {
        let depId = result.roleDep.split(" ")[0];
        return addRoleSQL(result.roleName, result.roleSalary, depId);
    })
    .then(data => {
        console.log("Role added Successfully");
        return;
    })
}

module.exports = {addRoleManager};
