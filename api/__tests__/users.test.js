const request = require('supertest');
const db = require('../data/db-config');
const server = require('../server');
const Users = require('../users/users-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });
  beforeEach(async () => {
    await db.seed.run();
  });
  afterAll(async (done) => {
    await db.destroy();
    done();
  });
  
  it('users sanity check', () => {
    expect(true).not.toBe(false);
  });