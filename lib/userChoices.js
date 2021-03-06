const allDepartmentsSQL = require('./viewAllDepartments');
const allRolesSQL = require('./viewAllRoles');
const allEmployeesSQL = require('./viewAllEmployees');
const addDepartmentManager = require('./addDepartment');
const addRoleManager = require('./addRole');
const addEmployeeManager = require('./addEmployee');
const updateEmployeeRoleManager = require('./updateEmployeeRole');
const viewEmployeesByDepartmentManager = require('./viewEmployeesByDepartment');
const totalDepartmentBudgetManager = require('./viewTotalBudgetOfDepartment');
const viewEmployeesByManagerManager = require('./viewEmployeesByManager');
const deleteDepartmentManager = require('./deleteDepartment');
const deleteRoleManager = require('./deleteRole');
const deleteEmployeeManager = require('./deleteEmployee');
const updateEmployeeManagerManager = require('./updateEmployeeManagers');
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

const viewEmployeesByDepartment = () => {
    return viewEmployeesByDepartmentManager.viewEmployeesByDepartmentManager()
    .then(data => {
        console.log(table.getTable(data[0]));
        return userChoices();
    })
}

const viewTotalBudgetOfDepartment = () => {
    return totalDepartmentBudgetManager.totalDepartmentBudgetManager()
    .then(data => {
        console.log(table.getTable(data[0]));
        return userChoices();
    })
}

const viewEmployeesByManager = () => {
    return viewEmployeesByManagerManager.viewEmployeesByManagerManager()
    .then(data => {
        console.log(table.getTable(data[0]));
        return userChoices();
    })
}

const addDepartment = () => {
    return addDepartmentManager.addDepartmentManager()
    .then(userChoices);
}

const addRole = () => {
    return addRoleManager.addRoleManager()
    .then(userChoices);
}

const addEmployee = () => {
    return addEmployeeManager.addEmployeeManager()
    .then(userChoices);
}

const updateEmployeeRole = () => {
    return updateEmployeeRoleManager.updateEmployeeRoleManager()
    .then(userChoices);
}

const updateEmployeeManager = () => {
    return updateEmployeeManagerManager.updateEmployeeManagerManager()
    .then(userChoices);
}

const deleteDepartment = () => {
    return deleteDepartmentManager.deleteDepartmentManager()
    .then(userChoices);
}

const deleteRole = () => {
    return deleteRoleManager.deleteRoleManager()
    .then(userChoices);
}

const deleteEmployee = () => {
    return deleteEmployeeManager.deleteEmployeeManager()
    .then(userChoices);
}

const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'View employees by department', 'View total budget of department', 'View employees by manager', 'Delete department', 'Delete role', 'Delete employee', 'Update employee manager', 'Exit']
    }
];

const promptUser = () => {
    return inquirer.prompt(questions);
}

const userChoices = () => {
    promptUser()
    .then((data) => {
        if(data.action === "View all departments"){
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
        else if(data.action === 'View employees by department'){
            return viewEmployeesByDepartment();
        }
        else if(data.action === 'View total budget of department'){
            return viewTotalBudgetOfDepartment();
        }
        else if(data.action === 'View employees by manager'){
            return viewEmployeesByManager();
        }
        else if(data.action === 'Delete department'){
            return deleteDepartment();
        }
        else if(data.action === 'Delete role'){
            return deleteRole();
        }
        else if(data.action === 'Delete employee'){
            return deleteEmployee();
        }
        else if(data.action === 'Update employee manager'){
            return updateEmployeeManager();
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