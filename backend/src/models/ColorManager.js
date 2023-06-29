const AbstractManager = require("./AbstractManager");

class colorManager extends AbstractManager {
  constructor() {
    super({ table: "color" });
  }

  insert(color) {
    return this.database.query(
      `insert into ${this.table} (color_name_en, color_name_fr) values (?,?)`,
      [color.color_name_en, color.color_name_fr]
    );
  }

  delete(color) {
    return this.database.query(`delete ${this.table} where id = ?`, [color.id]);
  }
}

module.exports = colorManager;
