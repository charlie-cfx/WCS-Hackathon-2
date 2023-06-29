const models = require("../models");

const filterPhone = (req, res) => {
  const keys = Object.keys(req.query);
  const values = Object.values(req.query);
  const valueQuery = values.map((value) =>
    value.includes(",") ? value.split(",") : value
  );
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
const browse = (req, res) => {
  models.phone
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  models.phone
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  filterPhone,
  browse,
  destroy,
};
