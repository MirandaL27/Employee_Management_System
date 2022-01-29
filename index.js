const userChoices = require('./lib/userChoices');
const fs = require('fs');

fs.readFile("EMS.txt","utf8", function(err,data){
    if(err){
        console.log(err);
    }
    console.log(data);
    console.log("------Employee Management Systems------");
    console.log(".");
    console.log(".");
    console.log("------WELCOME!------");
    console.log(".");
    console.log(".");
    userChoices.userChoices();
});
