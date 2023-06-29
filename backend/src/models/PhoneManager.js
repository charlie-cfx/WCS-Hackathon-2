const AbstractManager = require("./AbstractManager");

class PhoneManager extends AbstractManager {
  constructor() {
    super({ table: "phone" });
  }

  getAllPhonesFiltered(keys, valueQuery) {
    const nbOfKeys = keys.length;
    const query = `SELECT ${this.table}.id AS phone_id, brand.id AS brand_id, brand_name, model.id as model_id, model_name, screen_size_inch, color_name_en, color_name_fr, OS_name, OS_version.version as OS_version, ram, memory, network, accessory.name as accessory_name, accessory.weighting as accessory_weighting, state.id as state_id, state, state.weighting as state_weighting, base_price FROM ${this.table} JOIN brand ON brand.id=${this.table}.brand_id JOIN model ON model.id=${this.table}.model_id JOIN color ON color.id=model.color_id JOIN OS ON OS.id=${this.table}.OS_id JOIN OS_version ON OS_version.id=OS.OS_version_id JOIN accessory ON accessory.id=${this.table}.accessory_id JOIN state ON state.id=${this.table}.state_id`;
    let filters = " WHERE ";
    if (nbOfKeys) {
      if (Array.isArray(valueQuery[0])) {
        const nbOfValuesForFirstKey = valueQuery[0].length;
        filters += `(${keys[0]} = ${valueQuery[0][0]}`;
        for (let k = 1; k < nbOfValuesForFirstKey; k += 1) {
          filters += ` OR ${keys[0]} = ${valueQuery[0][k]}`;
        }
        filters += `)`;
      } else if (!Array.isArray(valueQuery[0])) {
        filters += `${keys[0]} = ${valueQuery[0][0]}`;
      }
      if (nbOfKeys > 1) {
        for (let j = 1; j < nbOfKeys; j += 1) {
          if (!Array.isArray(valueQuery[j])) {
            filters += ` AND ${keys[j]} = ${valueQuery[j]}`;
          } else {
            const nbOfValues = valueQuery[j].length;
            filters += ` AND (${keys[j]} = ${valueQuery[j][0]}`;
            for (let i = 1; i < nbOfValues; i += 1) {
              filters += ` OR ${keys[j]} = ${valueQuery[j][i]}`;
            }
            filters += `)`;
          }
        }
      }
      return this.database.query(query + filters);
    }
    return this.database.query(query);
  }
}

module.exports = PhoneManager;
