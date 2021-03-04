const { Router } = require("express");
const shorturl = require("./shorturl");
const statistics = require("./statistics");
const DB = require('../dataBase');
const { checkIdExist } = require('../utils');
const { checkIdValid } = require('../utils');

const api = Router();

api.use("/shorturl", shorturl);
api.use("/statistics", statistics);
api.get('/:id', checkIdValid, checkIdExist, DB.redirectUrl);

api.use("*", (req, res) => {
    res.status(404).send(({"message": "Page Not Found"}));
  });

module.exports = api;