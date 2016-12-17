'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const server = require('../server.js');

describe('POST /auth', () => {
  it('should respond with 200', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

describe('DELETE /auth', () => {
  it('should respond with 200', (done) => {
    request(server)
      .del('/auth')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
