const models = require("../models");

const filterPhone = (req, res) => {
  const keys = Object.keys(req.query);
  const values = Object.values(req.query);
  const valueQuery = values.map((value) =>
    value.includes(",") ? value.split(",") : value
  );
  console.info(keys, valueQuery);
  models.phone
    .getAllPhonesFiltered(keys, valueQuery)
    .then(([result]) => {
      if (result != null) {
        res.status(200).send(result);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  filterPhone,
};
