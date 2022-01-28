const db = require("../db/connection");
const inquirer = require("inquirer");
const roles = [];

const askUpdateEmployeeRoleQuestions = (employeeChoices) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Select a new role for the employee:',
            choices: roles
        }
    ])
}

const roleChoicesSQL = () => {
    return db.query({sql:"SELECT r.id, r.title, d.name AS department FROM role AS r LEFT JOIN department AS d ON d.id = r.department_id", rowsAsArray: true});
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
const makeRoleChoicesArray = () => {
    return roleChoicesSQL()
    .then(roleData => {
        roleData[0].forEach(element => {
            roles.push(element.join(" "));
        });
        return;
    })
}

const updateEmployeeRoleSQL = (empId, roleId) => {
    const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
    const params = [roleId, empId];
    return db.query(sql, params);
}

const updateEmployeeRoleManager = () => {
    return makeRoleChoicesArray()
    .then(makeEmployeeChoicesArray)
    .then(arr => {
        return askUpdateEmployeeRoleQuestions(arr);
    })
    .then(result => {
        let role = result.newRole.split(" ");
        let employee = result.employee.split(" ");
        return updateEmployeeRoleSQL(employee[0], role[0]);
    })
    .then(data => {
        console.log("Employee role updated successfully.");
        return;
    })
}

module.exports = {updateEmployeeRoleManager};