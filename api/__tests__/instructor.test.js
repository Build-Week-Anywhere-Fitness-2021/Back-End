const request = require("supertest");
const db = require("../data/db-config");
const server = require("../server");
const Classes = require("../instructor/instructor-model");

const tara = { username: "tara", email: "email@email.com", password: "123", role: "instructor" };
const newClass = {
    name: "HIIT",
    instructor_name: "Chloe",
    type: "Aerobic",
    time: "10:00 AM",
    duration: "1 Hour",
    intensity: "High",
    location: "Los Angeles, CA",
    attendees: 5,
    max_size: 15
};

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

afterAll(async () => {
    await db.destroy();
});

describe("instructor sanity check", () => {
    test("sanity", () => {
        expect(true).toBe(true);
    });
});

describe("GET classes", () => {
    it("gets all classes", async () => {
        const result = await Classes.getClasses();
        expect.arrayContaining(result.body);
    });
});

describe("POST add class", () => {
    it("adds new class", async () => {
        await request(server).post("/api/auth/register").send(tara);
        let res = await request(server).post("/api/auth/login").send(tara);
        const token = res.body.token;
        let body = await request(server).post("/api/classes/",).set("Authorization", token).send(newClass);
        expect(JSON.stringify(body)).toEqual(expect.stringMatching(/HIIT/i));
    });
});

describe("PUT updates class", () => {
    it("updates class", async () => {
        await request(server).post("/api/auth/register").send(tara);
        let res = await request(server).post("/api/auth/login").send(tara);
        const token = res.body.token;
        let body = await request(server).put("/api/classes/1",).set("Authorization", token).send({name: "updated class name"});
        expect(JSON.stringify(body)).toEqual(expect.stringMatching(/updated class name/i));
    });
});

describe("DELETE deletes class", () => {
    it("deletes class", async () => {
        await request(server).post("/api/auth/register").send(tara);
        let res = await request(server).post("/api/auth/login").send(tara);
        const token = res.body.token;
        let body = await request(server).delete("/api/classes/1",).set("Authorization", token);
        expect(JSON.stringify(body)).toEqual(expect.stringMatching(/removed/i));
    });
});