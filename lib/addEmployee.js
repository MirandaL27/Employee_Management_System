// const askEmployeeQuestions = (roleChoices) => {
//     return inquirer.prompt([
//         {
// //employee’s first name, last name, role, and manager
//             type: 'input',
//             name: 'empFirstName',
//             message: 'What is the first name of this employee?'
//         },
//         {
//             type: 'input',
//             name: 'empLastName',
//             message: 'What is the last name of this employee?'
//         },
//         {
//             type: 'list',
//             name: 'empRole',
//             message: 'What is the role name for this employee?',
//             choices: roleChoices
//         },
//         {
//             type: 'input',
//             name: 'empMan',
//             message: 'Who is the Manager of this employee?'
//         }
//     ])
//     .then(data => {
//         console.log(data);
//     })
// }

// const addEmployee = () => {
//     db.query({sql:"SELECT title FROM role", rowsAsArray: true}, (err, result) => {
//         //console.log(result);
//         let test = [];
//         result.forEach(data => {
//             test.push(data[0]);
//         })
//         //console.log(test);
//         askEmployeeQuestions(test);
//     })
//     // .then(data => {
//     //     //make a query that adds the employee here!
//     //     const {empFirstName, empLastName, empRole, empMan} = data;
//     //     return userChoices();
//     // })
// }