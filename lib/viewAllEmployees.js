const db = require("../db/connection");

const allEmployeesSQL = () => {
    return db.execute("SELECT * FROM employee");
}

module.exports = {allEmployeesSQL};