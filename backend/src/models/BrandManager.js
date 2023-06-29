const AbstractManager = require("./AbstractManager");

class brandManager extends AbstractManager {
  constructor() {
    super({ table: "brand" });
  }

  insert(brand) {
    return this.database.query(
      `insert into ${this.table} (name, weighting) values (?,?)`,
      [brand.name, brand.weighting]
    );
  }

  delete(brand) {
    return this.database.query(`delete ${this.table} where id = ?`, [brand.id]);
  }
}

module.exports = brandManager;
