const db = require("../db/connection");

const allEmployeesSQL = () => {
    return db.execute("SELECT e.id, e.first_name, e.last_name, r.title, r.salary, me.first_name AS manager_first_name, me.last_name AS manager_last_name, d.name AS department FROM employee AS e LEFT JOIN role AS r ON r.id = e.role_id LEFT JOIN department AS d ON d.id = r.department_id LEFT JOIN employee AS me ON me.id = e.manager_id");
}

module.exports = {allEmployeesSQL};