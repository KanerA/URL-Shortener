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

module.exports = api;