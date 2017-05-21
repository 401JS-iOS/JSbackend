
'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const devMocks = require('./lib/mock-dev');
const serverControl = require('./lib/server-control');
const token = require('./auth-routes-test');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('=================================================\n  testing dev-router\n  =================================================\n',
function(){
  before(serverControl.startServer);
  after(serverControl.killServer);

  describe('testing POST /api/dev', function(){
    let results = [];

    it('should respond with a 200 on good request', function(done){
      console.log('token', token[0]);
      superagent.post(`${baseURL}/api/dev`)
      .send({username:'chris', email:'c@c.com', phone:'123-4567'})
      .set({
        'Authorization': `Bearer ${token[0]}`,
        'Content-Type': 'application/json',
      })
      .then(res => {
        console.log('res', res.text);

      })
      .catch(err => {
        console.log('the error im lookin at', err);

      });
      done();
    });

    it('should respond with a 401 if a field is missing', done => {
      superagent.post(`${baseURL}/api/dev`)
      .send({devMocks})
      .then(done)
      .catch(err => {
        console.log('err.error', err.message);
        results.push(err.message);
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should respond with Unauthorized if a field is missing', done => {

      expect(results[0]).to.equal('Unauthorized');
      results.pop();
      done();
    });

    it('should respond with a 404 given a bad endpoint', done => {
      superagent.post(`${baseURL}/api/badEndpoint`)
      .send({})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });

    it('should return a 401 error for improper signup', function(done){
      superagent.post(`${baseURL}/api/dev`)
      .send({})
      .then(done)
      .catch(err => {
        console.log('err.status', err.status);
        results.push(err.message);
        expect(err.status).to.equal(401);
        done();
      });
    });

    it('should return Unauthorized error for improper signup', function(done){

      expect(results[0]).to.equal('Unauthorized');
      results.pop();
      done();
    });
  });

  describe('testing GET /api/devlist', function(){
    beforeEach(devMocks.bind(this));
    let results = [];

    it('should respond with a 200 status code on good request', (done) => {
      superagent.get(`${baseURL}/api/devlist`)
      .auth(`${this.username}:${this.password}`)
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404 status code on bad request', (done) => {
      superagent.get(`${baseURL}/api/badlogin`)
      .then(done)
      .catch(err => {
        console.log('err.message', err.message);
        results.push(err.message);

        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });

    it('should respond with Not Found status code on bad request', (done) => {
      expect(results[0]).to.equal('Not Found');
      results.pop();
      done();
    });
  });
});
