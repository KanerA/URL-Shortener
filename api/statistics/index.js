const { Router } = require("express");
const DB = require('../../dataBase');

const statistics = Router();

statistics.get("/:id", DB.getIdStatistics);

statistics.get("/", (req, res) => {
  res.render('statistics');
});

statistics.use("*", (req, res) => {
  res.status(404).send(({"message": "Page Not Found"}));
});

module.exports = statistics;