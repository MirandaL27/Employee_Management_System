const db = require("../db/connection");

const allDepartmentsSQL = () => {
    return db.execute("SELECT * FROM department");
}

module.exports = {allDepartmentsSQL};
