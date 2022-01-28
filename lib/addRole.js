// const addRole = () => {
//         return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'roleName',
//             message: 'What is the name of the role?'
//         },
//         {
//             type: 'input',
//             name: 'roleSalary',
//             message: 'What is the salary for this role?'
//         },
//         {
//             type: 'input',
//             name: 'roleDep',
//             message: 'What is the department name for this role?'

//         }
//     ])
//     .then(data => {
//         //make a query that adds the role here!
//         let depId = 0;
//         const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
//         db.query(`SELECT id FROM department WHERE name = '${data.roleDep}'`, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             depId = results[0].id;
//             const params = [data.roleName, data.roleSalary, depId];
//             db.query(sql, params, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 console.log("Role successfully added.");
//                 return;
//             })
//             return userChoices();
//         });
//     })
// }