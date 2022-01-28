const allDepartmentsSQL = require('./viewAllDepartments');
const allRolesSQL = require('./viewAllRoles');
const allEmployeesSQL = require('./viewAllEmployees');
const addDepartmentManager = require('./addDepartment');
const addRoleManager = require('./addRole');
const inquirer = require('inquirer');
const table = require('console.table');


const viewAllDepartments = () => {
    return allDepartmentsSQL.allDepartmentsSQL()
    .then(data => {
        console.log(table.getTable(data[0]));
        return userChoices();
    });
}

const viewAllRoles = () => {
    return allRolesSQL.allRolesSQL()
    .then(data => {
        console.log(table.getTable(data[0]));
        return userChoices();
    });
}

const viewAllEmployees = () => {
    return allEmployeesSQL.allEmployeesSQL()
    .then(data => {
        console.log(table.getTable(data[0]));
        return userChoices();
    });
}

const addDepartment = () => {
    return addDepartmentManager.addDepartmentManager()
    .then(userChoices);
}

const addRole = () => {
    return addRoleManager.addRoleManager()
    .then(userChoices);
}


const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
    }
];

const promptUser = () => {
    return inquirer.prompt(questions);
}

const userChoices = () => {
    promptUser()
    .then((data) => {
        if(data.action === "View all departments"){
            //console.log(viewAllDepartments);
            return viewAllDepartments();
        }
        else if(data.action === "View all roles"){
            return viewAllRoles();
        }
        else if(data.action === 'View all employees'){
            return viewAllEmployees();
        }
        else if(data.action === 'Add a department'){
            return addDepartment();
        }
        else if(data.action === 'Add a role'){
            return addRole();
        }
        else if(data.action === 'Add an employee'){
            return addEmployee();
        }
        else if(data.action === 'Update an employee role'){
            return updateEmployeeRole();
        }
        else {
            console.log('Bye.');
            process.exit();
        }
        
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {userChoices};