import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { buildApp } from '../src/app';

let mongo: MongoMemoryServer;
const app = buildApp();

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongo.getUri();
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongo) await mongo.stop();
});

const user = { name: 'Test', email: 'test@example.com', password: 'secret123', role: 'athlete' };

test('register, login, refresh, me', async () => {
  const r1 = await request(app).post('/auth/register').send(user);
  expect(r1.status).toBe(200);
  expect(r1.body.accessToken).toBeDefined();

  const r2 = await request(app).post('/auth/login').send({ email: user.email, password: user.password });
  expect(r2.status).toBe(200);
  expect(r2.body.accessToken).toBeDefined();

  const r3 = await request(app).post('/auth/refresh').send({ refreshToken: r2.body.refreshToken });
  expect(r3.status).toBe(200);
  expect(r3.body.accessToken).toBeDefined();

  const r4 = await request(app).get('/auth/me').set('Authorization', `Bearer ${r2.body.accessToken}`);
  expect(r4.status).toBe(200);
  expect(r4.body.email).toBe(user.email);
});

