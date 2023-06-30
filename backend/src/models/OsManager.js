const AbstractManager = require("./AbstractManager");

class OsManager extends AbstractManager {
  constructor() {
    super({ table: "os" });
  }

  insert(os) {
    return this.database.query(
      `insert into ${this.table} (OS_name, weighting) values (?,?)`,
      [os.name, os.weighting]
    );
  }

  delete(os) {
    return this.database.query(`delete ${this.table} where id = ?`, [os.id]);
  }
}

module.exports = OsManager;
