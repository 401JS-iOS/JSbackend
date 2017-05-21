'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const Review = require('../model/review');
const userMocks = require('./lib/mock-user');
const reviewMocks = require('./lib/mock-review');
const serverControl = require('./lib/server-control');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('=================================================\n  testing review-routes\n  =================================================\n',

function(){
  before(serverControl.startServer);
  after(serverControl.killServer);

  console.log(userMocks);

  describe('user controller', function() {
    describe('createUser', function() {
      it('should make a user', (done, err) => {
        if(err) console.error(err);

        done();
      });
    });
  });

  describe('npo controller', function() {
    describe('createNpo', function() {
      it('should make a npo', done => {

        done();
      });
    });
  });

  describe('project controller', function() {
    describe('createProject', function() {
      it('should make a project', done => {

        done();
      });
    });
  });

  describe('review controller', function() {
    describe('createReview', function() {
      it('should make a review', done => {

        done();
      });
    });
  });

  describe('testing POST /review', function() {
    it('should respond with a 200 on good request', function(done){

      done();
    });

    let results = [];

    it('should respond with a 401 if a field is missing', done => {
      superagent.post(`${baseURL}/api/npo/:id/project/:id/review`)
      .send({reviewMocks})
      .then(done)
      .catch(err => {
        console.log(err.status);
        results.push(err.message);
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should respond with Not Found if a field is missing', done => {

      expect(results[0]).to.equal('Unauthorized');
      results.pop();
      done();
    });

    it('should respond with a 404 given a bad endpoint', done => {
      superagent.post(`${baseURL}/api/review`)
      .auth(`${this.username}:${this.password}`)
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
      superagent.post(`${baseURL}/api/npo/:id/project/:id/review`)
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

  describe('testing GET /api/reviewlist', function(){
    beforeEach(reviewMocks.bind(this));
    let results = [];

    it('should respond with a 200 status code on good request', (done) => {
      superagent.get(`${baseURL}/api/reviewlist`)
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
  });

  describe('UPDATE review', function() {

    describe('/api/npo/:id/review/:id', function() {
      it('should return a 200 if successful', done => {
        superagent.put(`${baseURL}/api/review`);

        done();
      });

      it('should remove the record from the db', done => {

        done();
      });
    });
  });


  describe('DELETE review', function() {

    describe('/api/npo/:id/review/:id', function() {
      it('should return a 200 if successful', done => {
        Review.remove({})
        .then(() => done)
        .catch(done);

        done();
      });

      it('should remove the record from the db', done => {

        done();
      });
    });
  });
});
