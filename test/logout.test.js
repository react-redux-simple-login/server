'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const server = require('../server.js');

describe('DELETE /auth', () => {

  it('should return an error message if logout is attempted with no jwt token', (done) => {
    request(server)
      .del('/auth')
      .set('Accept', 'application/json')
      .expect(400, { err: 'bad request' }, done);
  });


  it('should respond with 200 if logout is successful', (done) => {
    request(server)
      .del('/auth')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should delete the jwt token', (done) => {
    request(server)
      .del('/auth')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.have.property('token');
        expect(res.body.token).to.be.null;
        expect(res.body.token).to.be.a('null');
        done();
      });
  });

});
