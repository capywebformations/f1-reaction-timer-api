import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import { ensureDatabaseConnection } from '../../config/database';

beforeAll(async () => {
  // Connect to the database before running the tests
  jest.setTimeout(120000); // Increase the timeout for Jest tests for Github Actions
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not defined');
  }
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  // Close the database connection after all tests are completed
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Ensure the database connection is established and clear the database before each test
  await ensureDatabaseConnection();
  await mongoose.connection.db!.dropDatabase(); // Assert db is not undefined
});

describe('Auth Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      // Send a registration request
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'unique_test@example.com', password: 'password' }); // Use a unique email

      // Debugging: Log the response body if the status code is not as expected
      if (res.statusCode !== 201) {
        console.error('Registration failed:', res.body);
      }

      // Check if the registration was successful
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual({ message: 'User registered successfully' });

      // Verify the user was created in the database
      const user = await mongoose.connection
        .db!.collection('users')
        .findOne({ email: 'unique_test@example.com' });
      expect(user).not.toBeNull();
      expect(user!.email).toEqual('unique_test@example.com');
    });

    it('should return 400 if the email is missing', async () => {
      // Test case for missing email
      const res = await request(app)
        .post('/api/auth/register')
        .send({ password: 'password' });

      // Expect a 400 status code for missing required fields
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 if the password is missing', async () => {
      // Test case for missing password
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' });

      // Expect a 400 status code for missing required fields
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a registered user', async () => {
      // First, register a user
      await request(app)
        .post('/api/auth/register')
        .send({ email: 'login_test@example.com', password: 'password' });

      // Then, attempt to login with the registered user
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login_test@example.com', password: 'password' });

      // Debugging: Log the response body if the status code is not as expected
      if (res.statusCode !== 200) {
        console.error('Login failed:', res.body);
      }

      // Check if the login was successful
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 400 for invalid credentials', async () => {
      // Attempt to login with incorrect credentials
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login_test@example.com', password: 'wrongpassword' });

      // Expect a 400 status code for invalid credentials
      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ message: 'Invalid email or password' });
    });

    it('should return 400 if the email is missing', async () => {
      // Test case for missing email during login
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password' });

      // Expect a 400 status code for missing required fields
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 if the password is missing', async () => {
      // Test case for missing password during login
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' });

      // Expect a 400 status code for missing required fields
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });
});
