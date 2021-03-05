const request = require("supertest");
const app = require("./app.js");
const fs = require('fs');
const dir = "./test";

const URL = {
    url : "https://www.google.com"
}

const URLExist = {
    url : "https://www.youtube.com/"
}

const expectedMessage = "URL already shortened";