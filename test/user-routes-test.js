'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const User = require('../model/user');
const mockDevUser = new User({username: 'jimmy', email: 'jimmy@jimmy.com', password: 'secret', isDev: true});
const mockNPOUser = new User({username: 'molly', email: 'molly@molly.com', password: 'moresecret', isNPO: true});

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

  describe('GET method', function() {
    before(done => {
      chai.request(server)
      .post('/api/signup')
      .send(mockDevUser)
      .end((err) => {
        if(err) console.error(err);
        done();
      });
      after(done => {
        chai.request(server)
        .delete('/api/signup')
        .end(err => {
          if(err) console.error(err);
          done();
        });
      });
    });
    describe('a properly formatted request', function() {
      it('should return a 200 status code if given a valid body', done => {
        chai.request(server)
        .get('/api/login')
        .auth('jimmy', 'secret')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });
});
