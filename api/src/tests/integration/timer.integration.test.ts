import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import { ensureDatabaseConnection } from '../../config/database';

let token: string;

beforeAll(async () => {
  jest.setTimeout(120000); // Increase the timeout for Jest tests for Github Actions
  await mongoose.connect(process.env.MONGO_URI!);

  // Create a user and get a valid token
  await request(app)
    .post('/api/auth/register')
    .send({ email: 'test@example.com', password: 'password' });
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password' });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await ensureDatabaseConnection(); // Ensure the connection is established
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase(); // Clear the database before each test
  }
});

describe('Timer Endpoints', () => {
  describe('POST /api/timer/submit-reaction-time', () => {
    it('should submit a reaction time', async () => {
      const res = await request(app)
        .post('/api/timer/submit-reaction-time')
        .set('Authorization', `Bearer ${token}`)
        .send({ time: 150 });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('user_id');
      expect(res.body).toHaveProperty('time', 150);
    });
  });

  describe('GET /api/timer/get-reaction-times', () => {
    it('should retrieve reaction times for authenticated user', async () => {
      await request(app)
        .post('/api/timer/submit-reaction-time')
        .set('Authorization', `Bearer ${token}`)
        .send({ time: 150 });

      const res = await request(app)
        .get('/api/timer/get-reaction-times')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('time', 150);
    });
  });
});
