const inquirer = require('inquirer');
const db = require('mysql2-promise')();
const table = require('console.table');

db.configure({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'MySQL27!2021',
  database: 'cms_employee'
});


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

const viewAllDepartments = () => { 
    db.query('SELECT * FROM department').then(result => {
        console.log(table.getTable(result[0]));
    })
    .then(init);
}

const viewAllRoles = () => {
    //use the db to run a sql query
    //usd console.table to print the results of the query
    //return promptUser
    return init();
}

const viewAllEmpoyees = () => {
    //use the db to run a sql query
    //usd console.table to print the results of the query
    //return promptUser
    return init();
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'depName',
            message: 'What is the name of the department?'
        }
    ])
    .then(data => {
        //make a query that adds the department here!
        return init();
    })

}

const addRole = () => {
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
            type: 'input',
            name: 'roleDep',
            message: 'What is the department of this role?'

        }
    ])
    .then(data => {
        //make a query that adds the role here!
        return init();
    });
}

const addEmployee = () =>{
    return inquirer.prompt([
        {
//employee’s first name, last name, role, and manager
            type: 'input',
            name: 'empFirstName',
            message: 'What is the first name of this employee?'
        },
        {
            type: 'input',
            name: 'empLastName',
            message: 'What is the last name of this employee?'
        },
        {
            type: 'input',
            name: 'empRole',
            message: 'What is the role of this employee?'
        },
        {
            type: 'input',
            name: 'empMan',
            message: 'Who is the Manager of this employee?'
        }
    ])
    .then(data => {
        //make a query that adds the employee here!
        return init();
    })
}

const updateEmployeeRole = () => {
    //make choices array by using a sql query here!
    let choices = [];
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Select an employee to update:',
            choices: choices
        }
    ])
    .then(data => {
        //make a query that updates the employee role here!
        return init();
    })

}

const init = () => {
    promptUser()
    .then((data) => {
        if(data.action === "View all departments"){
            viewAllDepartments();
        }
        else if(data.action === "View all roles"){
            viewAllRoles();
        }
        else if(data.action === 'View all employees'){
            viewAllEmpoyees();
        }
        else if(data.action === 'Add a department'){
            addDepartment();
        }
        else if(data.action === 'Add a role'){
            addRole();
        }
        else if(data.action === 'Add an employee'){
            addEmployee();
        }
        else if(data.action === 'Update an employee role'){
            updateEmployeeRole();
        }
        else {
            console.log('Bye.');
            return;
        }
    })
}

init();