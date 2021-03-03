const { Router } = require("express");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { urlencoded } = require('body-parser');
const DB = require('../../dataBase');
const { urlExist } = require('../../utils');
const { checkIfBlank } = require('../../utils');
const shorturl = Router();

shorturl.use(cors());
shorturl.use("/public", express.static(`../../public`));
shorturl.use(urlencoded({ extended: false }))

shorturl.post('/', checkIfBlank, urlExist, DB.addURL);

shorturl.use("*", (req, res) => {
  res.status(404).json(({"message": "Page Not Found"}));
});

module.exports = shorturl;