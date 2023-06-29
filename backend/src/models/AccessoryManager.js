const AbstractManager = require("./AbstractManager");

class AccessoryManager extends AbstractManager {
  constructor() {
    super({ table: "accessory" });
  }

  insert(accessory) {
    return this.database.query(
      `insert into ${this.table} (name, weighting) values (?,?)`,
      [accessory.name, accessory.weighting]
    );
  }

  delete(accessory) {
    return this.database.query(`delete ${this.table} where id = ?`, [
      accessory.id,
    ]);
  }
}

module.exports = AccessoryManager;
