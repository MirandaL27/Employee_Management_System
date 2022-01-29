const db = require("../db/connection");
const inquirer = require("inquirer");
let managers = [];

const askUpdateEmployeeManagerQuestions = (employeeChoices) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newManager',
            message: 'Select a new manager for this employee:',
            choices: managers
        }
    ])
}


const employeeChoicesSQL = () => {
    return db.query({sql: "SELECT e.id , e.first_name, e.last_name, r.title , d.name AS department FROM employee AS e LEFT JOIN role AS r ON r.id = e.role_id LEFT JOIN department AS d ON d.id = r.department_id", rowsAsArray:true});
}

const makeEmployeeChoicesArray = () => {
    return employeeChoicesSQL()
    .then(employeeData => {
        let employees = [];
        employeeData[0].forEach(element => {
            employees.push(element.join(" "));
        });
        return employees;
    })
}
const makeManagerChoicesArray = () => {
    return makeEmployeeChoicesArray()
    .then(result => {
        result.push('None');
        managers = result;
        return;
    })
}

const updateEmployeeManagerSQL = (empId, managerId) => {
    const sql = "UPDATE employee SET manager_id = ? WHERE id = ?";
    const params = [managerId, empId];
    return db.query(sql, params);
}

const updateEmployeeManagerManager = () => {
    return makeManagerChoicesArray()
    .then(makeEmployeeChoicesArray)
    .then(arr => {
        return askUpdateEmployeeManagerQuestions(arr);
    })
    .then(result => {
        let manager = result.newManager.split(" ");
        let employee = result.employee.split(" ");
        let manId = manager[0];
        console.log("manager[0] = " + manager[0]);
        if(manager[0].toLowerCase() === 'none'){
            manId = null;
        }
        return updateEmployeeManagerSQL(employee[0], manId);
    })
    .then(data => {
        console.log("Employee manager updated successfully.");
        return;
    })
}

module.exports = {updateEmployeeManagerManager};