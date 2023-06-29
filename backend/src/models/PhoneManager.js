const AbstractManager = require("./AbstractManager");

class PhoneManager extends AbstractManager {
  constructor() {
    super({ table: "phone" });
  }

  getAllPhonesFiltered(keys, valueQuery) {
    const query = `SELECT * FROM ${this.table}`;
    const nbOfKeys = keys.length;
    let filters = " WHERE ";
    const dependencies = [];
    if (nbOfKeys) {
      if (Array.isArray(valueQuery[0])) {
        const nbOfValuesForFirstKey = valueQuery[0].length;
        filters += `(? = ${valueQuery[0][0]}`;
        dependencies.push(keys[0]);
        for (let k = 1; k < nbOfValuesForFirstKey; k += 1) {
          filters += ` OR ? = ${valueQuery[0][k]}`;
          dependencies.push(keys[0]);
        }
        filters += `)`;
      } else if (!Array.isArray(valueQuery[0])) {
        filters += `? = ${valueQuery[0][0]}`;
        dependencies.push(keys[0]);
      }
      if (nbOfKeys > 1) {
        for (let j = 1; j < nbOfKeys; j += 1) {
          if (!Array.isArray(valueQuery[j])) {
            filters += ` AND ? = ${valueQuery[j]}`;
            dependencies.push(keys[j]);
          } else {
            const nbOfValues = valueQuery[j].length;
            filters += ` AND (? = ${valueQuery[j][0]}`;
            dependencies.push(keys[j]);
            for (let i = 1; i < nbOfValues; i += 1) {
              filters += ` OR ? = ${valueQuery[j][i]}`;
              dependencies.push(keys[j]);
            }
            filters += `)`;
          }
        }
      }
      return this.database.query(query + filters, [...dependencies]);
    }
    return this.database.query(query);
  }
}

module.exports = PhoneManager;
