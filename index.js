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
   db.query('SELECT * FROM department')
   .then(result => {
        console.log(table.getTable(result[0]));
    })
    .then(init);
}

const viewAllRoles = () => {
    db.query('SELECT * FROM role')
    .then(result => {
        console.log(table.getTable(result[0]));
    })
    .then(init);
}

const viewAllEmpoyees = () => {
    db.query('SELECT * FROM employee')
    .then(result => {
        console.log(table.getTable(result[0]));
    })
    .then(init);

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
        db.query(`INSERT INTO department (name) VALUES ('${data.depName}')`)
        .then(result => {
            console.log(table.getTable(result[0]));
        })
        .then(init);
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
            message: 'What is the department name for this role?'

        }
    ])
    .then(data => {
        //make a query that adds the role here!
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(`SELECT id FROM department WHERE name = '${data.roleDep}'`)
        //console.log(depId);        
        .then(result => {
            console.log(result[2]);
            const params = [data.roleName, data.roleSalary, result[2]];
            db.query(sql, params)})
            .then(init);
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
            message: 'What is the role name for this employee?'
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
    db.query('SELECT id, first_name, last_name FROM employee')
    .then(result => {
        console.log("-------Employees-------");
        console.log(table.getTable(result[0]));
        return;
    })
    .then(result => {
        db.query('SELECT title FROM role')
        .then(result => {
            console.log("-------Roles-------");
            console.log(table.getTable(result[0]));
            return;
        });
        return;
    })
    .then(result => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'employee',
                message: 'Select an employee to update by entering their name:',
            },
            {
                type : 'input',
                name: 'newRole',
                message: 'Select a new role for the employee:'
            }
        ])
        .then(data => {
            //make a query that updates the employee role here!
            let employeeName = data.employee.split(" ");
            let sql = 'UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?'
            let params = [data.newRole,employeeName[0], employeeName[1]];
            db.query(sql, params)
            .then(init);
        });
    });    
}

const init = () => {
    promptUser()
    .then((data) => {
        if(data.action === "View all departments"){
            console.log('View all departments.');
            return viewAllDepartments();
        }
        else if(data.action === "View all roles"){
            console.log('View all roles');
            return viewAllRoles();
        }
        else if(data.action === 'View all employees'){
            console.log('View all employees');
            return viewAllEmpoyees();
        }
        else if(data.action === 'Add a department'){
            console.log('Add a department');
            return addDepartment();
        }
        else if(data.action === 'Add a role'){
            console.log('Add a role');
            return addRole();
        }
        else if(data.action === 'Add an employee'){
            console.log('Add an employee');
            return addEmployee();
        }
        else if(data.action === 'Update an employee role'){
            console.log('Update an employee role');
            return updateEmployeeRole();
        }
        else {
            console.log('Bye.');
            return;
        }
        
    })
    .catch(err => {
        console.log(err);
    })
}

init();