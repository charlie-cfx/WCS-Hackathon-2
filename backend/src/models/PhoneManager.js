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
      if (Array.isArray(valueQuery[0])) {
        const nbOfValuesForFirstKey = valueQuery[0].length;
        filters += `${keys[0]} = ${valueQuery[0][0]}`;
        for (let k = 1; k < nbOfValuesForFirstKey; k += 1) {
          filters += ` OR ${keys[0]} = ${valueQuery[0][k]}`;
        }
      } else {
        filters += `${keys[0]} = ${valueQuery[0][0]}`;
      }
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
      return this.database.query(query + filters, [...keys]);
    }
    return this.database.query(query);
  }
}

module.exports = PhoneManager;
