'use strict';

const request = require('supertest');
const server = require('../server.js');

describe('POST /auth', () => {

  it('responds with 400 if there is no request body', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400, {err: 'bad request'}, done);
  });

  it('throws an error if username does not exist', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .send({
        username: 'demo513',
        password: 'password1'
      })
      .expect('Content-Type', /json/)
      .expect(404, {err: 'user not found'}, done);
  });

  xit('throws an error if username and password do not match', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .send({
        username: 'demo',
        password: 'password513'
      })
      .expect('Content-Type', /json/)
      .expect(404, {err: 'username and password do not match'}, done);
  });

  xit('responds with 200 and success message if username/password match', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .send({
        username: 'demo',
        password: 'password1'
      })
      .expect('Content-Type', /json/)
      .expect(200, {message: 'Login successful'}, done);
  });

});
