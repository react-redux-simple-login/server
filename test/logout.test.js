'use strict';

const request = require('supertest');
const server = require('../server.js');

xdescribe('DELETE /auth', () => {
  it('should respond with 200', (done) => {
    request(server)
      .del('/auth')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
