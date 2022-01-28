// const addDepartment = () => {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'depName',
//             message: 'What is the name of the department?'
//         }
//     ])
//     .then(data => {
//         //make a query that adds the department here!
//         db.query(`INSERT INTO department (name) VALUES ('${data.depName}')`, (err, result) => {
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             console.log(table.getTable(result[0]));
//             return userChoices();
//         })
//     });    
// }