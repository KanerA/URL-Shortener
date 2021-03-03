const { Router } = require("express");

const statistic = Router();


statistic.use("*", (req, res) => {
  res.status(404).send(({"message": "Page Not Found"}));
});

module.exports = statistic;