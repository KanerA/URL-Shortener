const request = require("supertest");
const app = require("./app.js");
const fs = require('fs');
const dir = "./test";
const DB = require('./dataBase');

const URL = {
    url : "https://www.google.com"
}

const URLExist = {
    url : "https://www.youtube.com/"
}

const expectedMessage = "URL already shortened";

beforeAll(() => {
    fs.writeFileSync(`./${dir}/data.json`, "[]");
});

describe("Test post", () => {
    it("should save the url in a database", async () => {
        await DB.readData();
        const expectedLength = DB.urls.length + 1;
        const res = await request(app).post('/api/shorturl').type('form').send(URL);
        await DB.readData();
        expect(DB.urls.length).toBe(expectedLength); // test in the data base
        expect(res.status).toBe(200); // test the response status
        expect(res.body.originalUrl).toEqual(URL.url); // test if the correct url was saved
    });

    test('If an error message returns when url already exists', async () => {
        const res = await request(app).post('/api/shorturl').type('form').send(URL);
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(expectedMessage);
    });

    test('If an error message return when url field is empty', async () => {
        const res = await request(app).post('/api/shorturl').type('form').send({url: ''});
        expect(res.body).toEqual({message: "can't send empty url input"});
    });
});

describe("Test get with ID", () => {
    it("Should redirect to the original URL", async () => {
        const postRes = await request(app).post("/api/shorturl").type("form").send(URLExist); // create a temporary url in the db
        const { body: { shortUrlId } } = postRes; // using the shorturl of the new object to make a get request
        const res = await request(app).get(`/api/${shortUrlId}`);
        expect(res.status).toBe(302);
        expect(res.redirect).toBe(true);
    });
});