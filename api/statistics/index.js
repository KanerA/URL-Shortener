const { Router } = require("express");

const statistics = Router();


statistics.use("*", (req, res) => {
  res.status(404).send(({"message": "Page Not Found"}));
});

module.exports = statistics;