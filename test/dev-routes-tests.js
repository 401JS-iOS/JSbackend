'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const User = require('../model/user.js');
const Dev = require('../model/dev.js');
const userMocks = require('./lib/mock-user.js');
const devMocks = require('./lib/mock-dev.js');
const serverControl = require('./lib/server-control.js');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing dev-router', function(){
  before(serverControl.startServer);
  after(serverControl.killServer);
  afterEach((done) => {
    User.remove({})
    .then(() => done())
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe('testing POST /api/dev', function(){
    it('should respond with a 200 on good request', function(done){
      superagent.post(`${baseURL}/api/dev`)
      .send({userMocks})
      .then(res => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });
    it('should respond with a 400 if a field is missing', done => {
      superagent.post(`${baseURL}/api/dev`)
      .send({username: 'jimmy', password: 'secret'})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
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
    it('should return a 400 error for improper signup', function(done){
      superagent.post(`${baseURL}/api/dev`)
      .send({
        email: 'boats@boatsboats.com',
        password: '1234',
      })
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      });
    });
  });
  // describe('testing GET /api/devlist', function(){
  //   beforeEach(devMocks.bind(this));
  //
  //   it('should respond with a 200 status code on good request', (done) => {
  //     superagent.get(`${baseURL}/api/devlist`)
  //     .auth(this.username)
  //     .then(res => {
  //       expect(res.status).to.equal(200);
  //       done();
  //     })
  //     .catch(done);
  //   });
  //   it('should respond with a 404 status code on bad request', (done) => {
  //     superagent.get(`${baseURL}/api/badlogin`)
  //     .auth(this.tempUser.username, '1234')
  //     .then(done)
  //     .catch(err => {
  //       expect(err.status).to.equal(404);
  //       done();
  //     })
  //     .catch(done);
  //   });
  // });
});
