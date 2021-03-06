const express = require("express");
const api = require("./api");
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use("/api", api);
app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.render('index');
});



module.exports = app;

