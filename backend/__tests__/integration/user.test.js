import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app).post('/users').send({
      name: 'Ian Mateus',
      email: 'test@test.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('_id');
    // mongoose.connection.close()
  });

  it('should not be able register with duplacated email', async () => {
    const response = await request(app).post('/users').send({
      name: 'Ian Mateus',
      email: 'test@test.com',
      password: '123456',
    });

    expect(response.status).toBe(400);
    mongoose.connection.close()
  });
});
