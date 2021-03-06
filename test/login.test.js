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
      .expect(400, {err: 'please complete all fields'}, done);
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
      .expect(401, {err: 'user not found'}, done);
  });

  it('throws an error if username and password do not match', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .send({
        username: 'demo',
        password: 'password513'
      })
      .expect('Content-Type', /json/)
      .expect(401, {err: 'password incorrect'}, done);
  });

  it('responds with 200 if username/password match', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .send({
        username: 'demo',
        password: 'password1'
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('assigns user jwt token', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .send({
        username: 'demo',
        password: 'password1'
      })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.token).to.not.be.null;
        done();
      });
  });

  it('returns node.js version, app path, date & time and user', (done) => {
    request(server)
      .post('/auth')
      .set('Accept', 'application/json')
      .send({
        username: 'demo',
        password: 'password1'
      })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.username).to.not.be.null;
        expect(res.body.username).to.equal('demo');
        expect(res.body.node_version).to.not.be.null;
        expect(res.body.node_version).to.equal(process.version);
        expect(res.body.app_path).to.equal(process.cwd())
        expect(res.body.timestamp).to.not.be.null;
        done();
      });
  });

});
