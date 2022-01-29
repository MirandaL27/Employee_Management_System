const db = require("../db/connection");
const inquirer = require("inquirer");

const managerSQL = () => {
    return db.query({sql:`SELECT id, first_name, last_name 
    FROM employee 
    WHERE id IN 
    (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)`, rowsAsArray: true});
}

const askManagerQuestion = (managerChoices) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'managerInfo',
            message: 'Select a manager:',
            choices: managerChoices
        }
    ]);
}

const getManagerChoicesArray = () => {
    return managerSQL()
    .then(result => {
        let managers = [];
        result[0].forEach(element => {
            managers.push(element.join(" "));
        })
        return managers;
    })
}

const viewEmployeesByManagerSQL = (managerId) => {
    return db.query(`SELECT * FROM employee WHERE manager_id = ${managerId}`);
}

const viewEmployeesByManagerManager = () =>{
    return getManagerChoicesArray()
    .then(arr => {
        return askManagerQuestion(arr);
    })
    .then(result => {
        let manager = result.managerInfo.split(" ");
        return viewEmployeesByManagerSQL(manager[0]);
    })
}

module.exports = {viewEmployeesByManagerManager};
