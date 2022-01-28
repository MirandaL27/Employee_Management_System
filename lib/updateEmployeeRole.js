// const updateEmployeeRole = () => {
//     //make choices array by using a sql query here!
//     let employeeUpdateObj = {};
//     db.query('SELECT e.id, e.first_name, e.last_name, r.title FROM employee as e LEFT JOIN role as r ON r.id = e.role_id')
//     .then(result => {
//         console.log("-------Employees-------");
//         console.log(table.getTable(result[0]));
//         return;
//     })
//     .then(result => {
//         return db.query('SELECT title FROM role');
//     })
//     .then(result => {
//         console.log("-------Roles-------");
//         console.log(table.getTable(result[0]));
//         return;
//     })
//     .then(result => {
//         return inquirer.prompt([
//             {
//                 type: 'input',
//                 name: 'employee',
//                 message: 'Select an employee to update by entering their name:',
//             },
//             {
//                 type : 'input',
//                 name: 'newRole',
//                 message: 'Select a new role for the employee:'
//             }
//         ])
//     })
//     .then(result => {
//         let employeeName = data.employee.split(" ");
//         employeeUpdateObj.first_name = employeeName[0];
//         employeeUpdateObj.last_name = employeeName[1];
//         return db.query(`SELECT id FROM role WHERE title = '${result.newRole}'`);
//     })
//     .then(result => {
//         //make a query that updates the employee role here!
//         console.log(result, employeeUpdateObj.first_name);
//         let sql = 'UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?';
//         let params = [result.id,employeeUpdateObj.first_name, employeeUpdateObj.last_name];
//         return db.query(sql, params);       
//     })
//     .then(userChoices);  
// }