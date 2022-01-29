const db = require("../db/connection");
const inquirer = require("inquirer");

const askRoleQuestion = (roleChoices) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'roleInfo',
            message: 'Select a role to delete:',
            choices: roleChoices
        }
    ]);
}

const roleSQL = () => {
    return db.execute({sql:"SELECT id, title FROM role", rowsAsArray: true});
}

const makeRoleChoicesArray = () => {
    return roleSQL()
    .then(result => {
        let roles = [];
        result[0].forEach(element => {
            roles.push(element.join(" "));
        })
        return roles;
    })
}

const deleteRoleSQL = (roleId) => {
    return db.execute(`DELETE FROM role
    WHERE role.id = ${roleId}`);
}

const deleteRoleManager = () => {
    return makeRoleChoicesArray()
    .then(arr => {
        return askRoleQuestion(arr);
    })
    .then(result => {
        let role = result.roleInfo.split(" ");
        return deleteRoleSQL(role[0]);
    })
    .then(data => {
        console.log("Role successfully deleted.");
        return;
    })
}

module.exports = {deleteRoleManager};