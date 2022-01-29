const db = require("../db/connection");
const inquirer = require("inquirer");
const table = require('console.table');
const viewAllEmployees = require('./viewAllEmployees');
const roles = [];

const roleChoicesSQL = () => {
    return db.query({sql:"SELECT r.id, r.title, d.name AS department FROM role AS r LEFT JOIN department AS d ON d.id = r.department_id", rowsAsArray: true});
}

const managerChoicesSQL = () => {
    return db.query({sql: "SELECT e.id , e.first_name, e.last_name, r.title , d.name AS department FROM employee AS e LEFT JOIN role AS r ON r.id = e.role_id LEFT JOIN department AS d ON d.id = r.department_id", rowsAsArray:true});
}

const makeManagerChoicesArray = () => {
    return managerChoicesSQL()
    .then(managerData => {
        let managers = [];
        managerData[0].forEach(element => {
            managers.push(element.join(" "));
        });
        managers.push("None");
        return managers;
    })
}
const makeRoleChoicesArray = () => {
    return roleChoicesSQL()
    .then(roleData => {
        roleData[0].forEach(element => {
            roles.push(element.join(" "));
        });
        return;
    })
}

const askEmployeeQuestions = (manChoices) => {
    return inquirer.prompt([
        {
//employee’s first name, last name, role, and manager
            type: 'input',
            name: 'empFirstName',
            message: 'What is the first name of this employee?',
            validate: empFirstName => {
                if (empFirstName) {
                return true;
            } 
            else {
                console.log('The employee\'s first name is required.');
                return false;
                }
            }
        },
        {
            type: 'input',
            name: 'empLastName',
            message: 'What is the last name of this employee?',
            validate: empLastName => {
                if (empLastName) {
                return true;
            } else {
                console.log('The employee\'s last name is required.');
                return false;
            }
        }
        },
        {
            type: 'list',
            name: 'empRole',
            message: 'Select a role for this employee:',
            choices: roles
        },
        {
            type: 'list',
            name: 'empMan',
            message: 'Who is the Manager of this employee?',
            choices: manChoices
        }
    ])
}

const addEmployeeSQL = (firstName, lastName, roleId, managerId) => {
    const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    const params = [firstName, lastName, roleId, managerId];
    return db.query(sql, params);
}

const addEmployeeManager = () => {
    return viewAllEmployees.allEmployeesSQL()
    .then(result => {
        console.log("------Existing employees------");
        console.log(table.getTable(result[0]));
        return makeRoleChoicesArray();
    })
    .then(makeManagerChoicesArray)
    .then(arr => {
        return askEmployeeQuestions(arr);
    })
    .then(result => {
        let role = result.empRole.split(" ");
        let manager = result.empMan.split(" ");
        let manId = manager[0];
        if(manager[0].toLowerCase() === "none"){
            manId = null;
        }
        return addEmployeeSQL(result.empFirstName, result.empLastName, role[0], manId);
    })
    .then(data => {
        console.log("employee added successfully");
        return;
    })
}

module.exports = {addEmployeeManager};