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

beforeAll(() => {
    fs.writeFileSync(`./${dir}/data.json`, "[]");
});

describe("test post", () => {
    it("should save the url in a database", async () => {
        const res = await request(app).post('/api/shorturl').type('form').send(URL);
        expect(res.status).toBe(200);
        expect(res.body.originalUrl).toEqual(URL.url);
    });

    test('If an error message returns when url already exists', async () => {
        const res = await request(app).post('/api/shorturl').type('form').send(URL);
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(expectedMessage);
    });
});