const express = require("express");
const api = require("./api");
const app = express();

app.use("/api", api);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;

