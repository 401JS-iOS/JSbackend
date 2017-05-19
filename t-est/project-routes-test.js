'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const Project = require('../model/project');
const User = require('../model/user');
const Npo = require('../model/npo');
const mongoose = require('mongoose');
const projectMocks = require('./lib/mock-project');
const serverControl = require('./lib/server-control');
// const mockUser = require('./lib/mock-user');
// const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
require('../server.js');
mongoose.Promise = Promise;
chai.use(http);

const baseURL = `http://localhost:${process.env.PORT}`;

describe('=================================================\n  testing project-routes\n  =================================================\n',

function(){
  before(serverControl.startServer);
  after(serverControl.killServer);

  after(done => {
    User.remove({})
    .then(() => done)
    .catch(done);
    done();
  });

  after(done => {
    Npo.remove({})
    .then(() => done)
    .catch(done);
    done();
  });

  after(done => {
    Project.remove({})
    .then(() => done)
    .catch(done);
    done();
  });

  describe('testing POST /api/project', function(){
    it('should respond with a 200 on good request', function(done){
      // chai.request(server)
      // .post(`${baseURL}/api/project desc:'asoidj' service:'ewfoihdf'`)
      //
      // .then(done)
      // .catch(done);
      done();
    });

    let results = [];

    it('should respond with a 404 if a field is missing', done => {
      superagent.post(`${baseURL}/api/project`)
      .send({projectMocks})
      .then(done)
      .catch(err => {
        console.log(err.status);
        results.push(err.message);
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });

    it('should respond with Not Found if a field is missing', done => {

      expect(results[0]).to.equal('Not Found');
      results.pop();
      done();
    });

    it('should respond with a 404 given a bad endpoint', done => {
      superagent.post(`${baseURL}/api/badEndpoint`)
      .send({})
      .then(done)
      .catch(err => {
        console.log(err.status);

        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });

    it('should return a 401 error for improper post', function(done){
      superagent.post(`${baseURL}/api/npo/:id/project`)
      .send({})
      .catch(err => {
        console.log('err.status', err.status);
        results.push(err.message);
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should return Unauthorized error for improper post', function(done){

      expect(results[0]).to.equal('Unauthorized');
      results.pop();
      done();
    });
  });

  describe('testing GET /api/projectlist', function(){
    beforeEach(projectMocks.bind(this));
    let results = [];

    it('should respond with a 200 status code on good request', (done) => {
      superagent.get(`${baseURL}/api/projectlist`)
      .auth(`${this.username}:${this.password}`)
      .then(res => {
        console.log(res.status);

        expect(res.status).to.equal(200);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404 status code on bad request', (done) => {
      superagent.get(`${baseURL}/api/badlogin`)
      // .auth(this.tempProject.username, '1234')
      .then(done)
      .catch(err => {
        console.log(err.status);

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

    describe('UPDATE proj', function() {

      describe('/api/npo/:id/project/:id', function() {
        it('should return a 200 if successful', done => {
          superagent.put(`${baseURL}/api/project`);

          done();
        });

        it('should remove the record from the db', done => {

          done();
        });
      });
    });
  });

  describe('DELETE proj', function() {

    describe('/api/npo/:id/project/:id', function() {
      it('should return a 200 if successful', done => {
        Project.remove({})
        .then(() => done)
        .catch(done);

        done();
      });

      it('should remove the record from the db', done => {

        done();
      });
    });
  });
  // });
});
