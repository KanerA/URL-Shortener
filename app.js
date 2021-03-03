require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { urlencoded } = require('body-parser');
const  DB  = require('./dataBase');

app.use(cors());
app.use("/public", express.static(`./public`));
app.use(urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
