const request = require('supertest');
const express = require('express');
const path = require('path');
const app = require('../server/server');
const loginRouter = require('../server/routes/login.js');
const homepageRouter = require('../server/routes/homepage.js');

jest.mock('../server/routes/login.js', () => jest.fn());
jest.mock('../server/routes/homepage.js', () => jest.fn());

describe('Server', () => {
  beforeEach(() => {
    loginRouter.mockClear();
    homepageRouter.mockClear();
  });

  test('should respond with 200 status code and send index.html on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
  test('should handle unknown routes and return 404 status code', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});
