const db = require("../db/connection");

const allRolesSQL = () => {
    return db.execute("SELECT * FROM role");
}

module.exports = {allRolesSQL};