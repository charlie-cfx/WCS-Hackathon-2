const AbstractManager = require("./AbstractManager");

class ModelManager extends AbstractManager {
  constructor() {
    super({ table: "model" });
  }

  insert(model) {
    return this.database.query(
      `insert into ${this.table} (model_name, screen_size_inch, screen_size_cm, weighting) values (?,?,?,?)`,
      [
        model.name,
        model.screen_size_inch,
        model.screen_size_cm,
        model.weighting,
      ]
    );
  }

  delete(model) {
    return this.database.query(`delete ${this.table} where id = ?`, [model.id]);
  }
}

module.exports = ModelManager;
