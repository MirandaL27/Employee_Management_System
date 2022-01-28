const db = require('mysql2-promise')();

db.configure({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'MySQL27!2021',
  database: 'cms_employee'
});

module.exports = db;