'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const server = require('../server.js');

describe('DELETE /auth', () => {

  it('should return an error message if logout is attempted with no username or token', (done) => {
    request(server)
      .del('/auth')
      .set('Accept', 'application/json')
      .expect(400, { err: 'bad request' }, done);
  });

  it('should delete the jwt token and respond with 200', (done) => {
    request(server)
      .del('/auth')
      .set('Accept', 'application/json')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW8iLCJwYXNzd29yZCI6InBhc3N3b3JkMSIsInRva2VuIjpudWxsLCJpYXQiOjE0ODE5OTI0ODV9.eodZkYLImqvUWcsgd4HQasil0x6zzruxDPf-Lk_KCDg'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.token).to.be.null;
        done();
      });
  });

});
