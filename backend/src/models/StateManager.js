const AbstractManager = require("./AbstractManager");

class stateManager extends AbstractManager {
  constructor() {
    super({ table: "state" });
  }

  insert(state) {
    return this.database.query(
      `insert into ${this.table} (name, weighting) values (?,?)`,
      [state.name, state.weighting]
    );
  }

  delete(state) {
    return this.database.query(`delete ${this.table} where id = ?`, [state.id]);
  }
}

module.exports = stateManager;
