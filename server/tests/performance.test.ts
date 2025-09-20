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

test('performance CRUD with auth guard', async () => {
  const reg = await request(app).post('/auth/register').send({ name: 'P', email: 'p@example.com', password: 'secret123', role: 'athlete' });
  const token = reg.body.accessToken as string;

  const created = await request(app).post('/performance').set('Authorization', `Bearer ${token}`).send({ date: new Date().toISOString(), metrics: { distance: 5 } });
  expect(created.status).toBe(201);

  const list = await request(app).get('/performance').set('Authorization', `Bearer ${token}`);
  expect(list.status).toBe(200);
  expect(Array.isArray(list.body)).toBe(true);

  const id = created.body._id;
  const updated = await request(app).patch(`/performance/${id}`).set('Authorization', `Bearer ${token}`).send({ metrics: { distance: 6 } });
  expect(updated.status).toBe(200);

  const del = await request(app).delete(`/performance/${id}`).set('Authorization', `Bearer ${token}`);
  expect(del.status).toBe(204);

  const unauth = await request(app).get('/performance');
  expect(unauth.status).toBe(401);
});
