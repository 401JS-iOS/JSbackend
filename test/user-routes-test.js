'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const User = require('../model/user');
const mockDev = new User({username: 'jimmy', email: 'jimmy@jimmy.com', password: 'secret', isDev: true});

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(5000);
    done();
  });
  after(done => {
    app.close();
    done();
  });
  describe('an unregistered route', function() {
    it('should return a 404 status code', done => {
      chai.request(server)
      .post('/api/badRoute')
      .end((err, res) => {
        if(err) console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET routes', function() {
    before(done => {
      chai.request(server)
      .post('/signup')
      .send(mockDev)
      .end((err) => {
        if(err) console.error(err);
        done();
      });
      after(done => {
        chai.request(server)
        .delete('/signup')
        .end(err => {
          if(err) console.error(err);
          done();
        });
      });
    });
    describe('a request to /api/signin', function() {
      describe('a properly formatted request', function() {
        it('should return a 200 status code if matching credentials entered', done => {
          chai.request(server)
          .get('/signin')
          .auth('jimmy', 'secret')
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            done();
          });
        });
      });
      describe('an improperly formatted request', function() {
        it('should return a 400 status code if wrong credentials entered', done => {
          chai.request(server)
          .get('/signin')
          .auth('jimmy', 'wrong')
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(400);
            done();
          });
        });
      });
    });
  });

  describe('POST routes', function() {
    before(done => {
      chai.request(server)
      .post('/signup')
      .send(mockDev)
      .end((err) => {
        if(err) console.error(err);
        done();
      });
      after(done => {
        chai.request(server)
        .delete('/signup')
        .end(err => {
          if(err) console.error(err);
          done();
        });
      });
    });
    describe('a request to /api/signup', function() {
      describe('a properly formatted request', function() {
        it('should return a 200 status code if given a valid body', done => {
          chai.request(server)
          .post('/signup')
          .send(mockDev)
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            done();
          });
        });
      });
      describe('an improperly formatted request', function() {
        it('should return a 400 status code if given an invalid body or no body', done => {
          chai.request(server)
          .post('/signup')
          .send({})
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(400);
            done();
          });
        });
      });
    });
  });
});
