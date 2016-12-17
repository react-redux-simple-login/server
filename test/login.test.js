'use strict';

const expect = require('chai').expect;
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

  it('throws an error if username does not match', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .send({
        username: 'demo513',
        password: 'password1'
      })
      .expect('Content-Type', /json/)
      .expect(400, {err: 'bad request'}, done);
  });


});
