const db = require("../db/connection");

const allRolesSQL = () => {
    return db.execute("SELECT r.id, r.title, r.salary, d.name AS department FROM role AS r LEFT JOIN department AS d ON d.id = r.department_id");
}

module.exports = {allRolesSQL};