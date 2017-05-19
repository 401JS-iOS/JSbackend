'use strict';


const superagent = require('superagent');
const npoMocks = require('./lib/mock-npo');
const serverControl = require('./lib/server-control');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const Promise = require('bluebird');
// const User = require('../model/user');
// const Npo =require('../model/npo');
const server = require('../server');
const chai = require('chai');
const http = require('chai-http');

const baseURL = `http://localhost:${process.env.PORT}`;

require('../server.js');
mongoose.Promise = Promise;

const exampleUser = {
  username: 'chris',
  password: '1234',
  email: 'c@c.com',
};

chai.use(http);

let token = [];

describe('=================================================\n  npo - server - test\n  =================================================\n',
function() {
  before(serverControl.startServer);
  after(serverControl.killServer);

  let userObj = [];

  describe('/wrong endpoint', function() {
    it('should respond with a 404 on bad request', done => {
      chai.request(server)
      .post('/')
      .send({})
      .end((err, res) => {
        console.log(res.status);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('POST || signup method', function() {

    describe('/signup endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/api/signup')
        .send(exampleUser)
        .end((err, res) => {
          console.log(res.status, res.body);
          token.push(res.body);
          userObj.push(res.request._data);

          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });
});

describe('=================================================\n  testing npo-router\n  =================================================\n',
function(){

  before(serverControl.startServer);
  after(serverControl.killServer);

  describe('testing POST /api/npo', function(){
    let results = [];

    it('should respond with a 200 on good request', function(done){
      console.log('token\n', token[0]);
      chai.request(server)
      .post(`${baseURL}/api/npo`)
      .send({username:'chris', email:'c@c.com', phone:'123-4567'})
      .set({
        'Authorization': `Bearer ${token[0]}`,
        'Content-Type': 'application/json',
      })
      .end(res => {
        console.log(res.status, res.body);

        expect(res).to.have.status(200);
      })
      .catch(err => {
        console.log('the error im lookin at', err);
      });
      //
      done();
    });

    describe('GET: /api/signin', function() {
      describe('with a valid body', function() {

        it('should return a token', done => {
          // superagent.get(`${baseURL}/api/signin`)
          // .auth('chris', '1234')
          // .end((err, res) => {
          //   if (err) return done(err);
          //   console.log('\ntoken:', res.text);
          //   console.log(res.status);
          //   expect(res.status).to.equal(200);
          // });
          done();
        });
      });
    });

    it('should respond with a 401 if a field is missing', done => {
      superagent.post(`${baseURL}/api/npo`)
      .send({npoMocks})
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
      superagent.post(`${baseURL}/api/npo`)
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

  describe('testing GET /api/npolist', function(){
    beforeEach(npoMocks.bind(this));

    let results = [];

    it('should respond with a 200 status code on good request', (done) => {
      superagent.get(`${baseURL}/api/npolist`)
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
