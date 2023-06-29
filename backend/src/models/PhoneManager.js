const AbstractManager = require("./AbstractManager");

class PhoneManager extends AbstractManager {
  constructor() {
    super({ table: "phone" });
  }

  getAllPhonesFiltered(keys, valueQuery) {
    const nbOfKeys = keys.length;
    const query = `SELECT brand_name, brand.weighting as brand_weighting, model_name, screen_size_inch, model.weighting as model_weighting, color_name_en, color_name_fr, OS_name, OS.weighting as OS_weighting, OS_version.version as OS_version, OS_version.weighting as OS_version_weighting, ram, memory, network, accessory.name as accessory_name, accessory.weighting as accessory_weighting, state, state.weighting as state_weighting FROM ${this.table} JOIN brand ON brand.id=${this.table}.brand_id JOIN model ON model.id=${this.table}.model_id JOIN color ON color.id=model.color_id JOIN OS ON OS.id=${this.table}.OS_id JOIN OS_version ON OS_version.id=OS.OS_version_id JOIN accessory ON accessory.id=${this.table}.accessory_id JOIN state ON state.id=${this.table}.state_id`;
    // const query = `SELECT brand_name, brand.weighting as brand_weighting, model_name, screen_size_inch, model.weighting as model_weighting, color_name_en, color_name_fr, OS_name, OS.weighting as OS_weighting, OS_version.version as OS_version, OS_version.weighting as OS_version_weighting, ram, memory, network, accessory.name as accessory_name, accessory.weighting as accessory_weighting, state, state.weighting as state_weighting FROM phone JOIN brand ON brand.id=phone.brand_id JOIN model ON model.id=phone.model_id JOIN color ON color.id=model.color_id JOIN OS ON OS.id=phone.OS_id JOIN OS_version ON OS_version.id=OS.OS_version_id JOIN accessory ON accessory.id=phone.accessory_id JOIN state ON state.id=phone.state_id`;
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
