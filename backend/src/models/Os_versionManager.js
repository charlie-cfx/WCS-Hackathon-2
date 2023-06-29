const AbstractManager = require("./AbstractManager");

class osVersionManager extends AbstractManager {
  constructor() {
    super({ table: "os_version" });
  }

  insert(osVersion) {
    return this.database.query(
      `insert into ${this.table} (version) values (?)`,
      [osVersion.version]
    );
  }

  delete(osVersion) {
    return this.database.query(`delete ${this.table} where id = ?`, [
      osVersion.id,
    ]);
  }
}

module.exports = osVersionManager;
