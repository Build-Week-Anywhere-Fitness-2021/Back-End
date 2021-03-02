const request = require('supertest');
const db = require('../data/db-config');
const server = require('../server');

const tara = { username: 'tara', email: 'email@email.com', password: '123', role: 'student' };

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

afterAll(async () => {
    await db.destroy();
});

it('auth sanity check', () => {
    expect(true).not.toBe(false);
});

test('POST /register', async () => {
    const res = await request(server)
        .post('/api/auth/register')
        .send(tara);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
        message: 'Registration was successful!'
    });
});

describe('POST /login', () => {
    it('responds with user info and token', async () => {
        let res = await request(server).post('/api/auth/login').send(tara);
        expect(res.body.token && res.body.user).toExist;
    });
    it('responds with invalid credentials', async () => {
        let res = await request(server).post('/api/auth/login').send({
            username: "invalid",
            password: "invalid"
        });
        expect(res.status).toBe(401);
    });
});