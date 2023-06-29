const AbstractManager = require("./AbstractManager");

class PhoneManager extends AbstractManager {
  constructor() {
    super({ table: "phone" });
  }

  getAllPhonesFiltered(keys, valueQuery) {
    const query = `SELECT * FROM ${this.table}`;
    const nbOfKeys = keys.length;
    let filters = " WHERE ";
    if (nbOfKeys) {
      filters += `${keys[0]} = ${valueQuery[0]}`;
      if (nbOfKeys > 1) {
        for (let j = 1; j < nbOfKeys; j += 1) {
          if (!Array.isArray(valueQuery[j])) {
            filters += ` AND ${keys[j]} = ${valueQuery[j]}`;
          } else {
            const nbOfValues = valueQuery[j].length;
            filters += ` AND (${keys[j]} = ${valueQuery[0]}`;
            for (let i = 1; i < nbOfValues; i += 1) {
              filters += ` OR ${keys[j]} = ${valueQuery[j][i]}`;
            }
            filters += `)`;
          }
        }
      }
      console.info({ filters });
      return this.database.query(query + filters, [...keys]);
    }
    console.info({ filters });
    return this.database.query(query);
  }
}

module.exports = PhoneManager;
