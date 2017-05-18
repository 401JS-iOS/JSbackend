'use strict';

const expect = require('chai').expect;
// const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
// con  st User = require('../model/user');
const server = require('../server');
const chai = require('chai');
const http = require('chai-http');

require('../server.js');
mongoose.Promise = Promise;

// const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'chris',
  password: '1234',
  email: 'c@c.com',
};

chai.use(http);

let token = [];
module.exports = token;

describe('=================================================\n  server - test\n  =================================================\n',
function() {
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
    // after(done => {
    //   User.findOne({username: 'chris'})
    //   .then(user => {
    //     User.findByIdAndRemove(user._id)
    //    .then(() => done());
    //   });
    // });

    describe('/signup endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/api/signup')
        .send(exampleUser)
        // {username:'chris', email:'c@c.com', password:'1234'}
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

describe('Auth Routes', function() {
  describe('POST: /api/signup', function() {
    describe('with a valid body', function() {
      // after( done => {
      //   User.remove({})
      //   .then(() => done())
      //   .catch(done);
      // });

      // it('should return a token', done => {
      //   console.log('exampleUser ', exampleUser);
      //   request.post(`${url}/api/signup `)
      //   .send(exampleUser)
      //   .end((err, res) => {
      //     if (err) return done(err);
      //     console.log('\ntoken:', res.text, '\n');
      //     expect(res.status).to.equal(200);
      //     expect(res.text).to.be.a('string');
      //     done();
      //   });
      // });
    });
  });

      // before( done => {
      //   let user = new User(exampleUser);
      //   user.generatePasswordHash(exampleUser.password)
      //   .then( user => user.save())
      //   .then( user => {
      //     this.tempUser = user;
      //     done();
      //   })
      //   .catch(done);
      // });
      //
      // after( done => {
      //   User.remove({})
      //   .then( () => done())
      //   .catch(done);
      // });
  describe('GET: /api/signin', function() {
    describe('with a valid body', function() {

      it('should return a token', done => {
        // request.get(`${url}/api/signin`)
        // .auth('chris', '1234')
        // .end((err, res) => {
        //   if (err) return done(err);
        //   // console.log('\nuser:', this.tempUser);
        //   console.log('\ntoken:', res.text);
        //   token.push(res.text);
        //   console.log(res.status);
        //   expect(res.status).to.equal(200);
        // });
        done();
      });
    });
  });

  describe('POST Dev', function() {
    it('should return a 200 status on a proper post', done => {
      console.log(token[0]);
      // request.post(`${url}/api/dev`)
      // .send({'username': 'exampleuser', 'website': 'macrohard.com', 'state': 'Washington', 'phone': '555-4059', 'email': 'exampleuser@test.com'})
      // .set({
      //   'Authorization': `Bearer ${token[0]}`,
      //   'Content-Type': 'application/json',
      // })
      // // .auth('exampleuser', '1234')
      // .end((err, res) => {
      //   if(err) return done(err);
      //   console.log(res.status);
      //
      //   // expect(res.status).to.equal(200);
      //
      // });
      done();
    });
  });

  // describe('DELETE user', function() {
  //   it('should return a 200 if successful', done => {
  //     request.delete(`${url}/api/signin`)
  //   })
  // })
});

// const expect = require('chai').expect;
const superagent = require('superagent');
// const User = require('../model/user');
const devMocks = require('./lib/mock-dev');
const serverControl = require('./lib/server-control');
// const Dev = require('../model/dev.js');
// const userMocks = require('./lib/mock-user.js');
// const token = require('./auth-routes-test');

const baseURL = `http://localhost:${process.env.PORT}`;

// const userDuce = {
//     username: 'boatsboats',
//     password: '1234',
//     email: 'boats@boatsboats.com',
//   }

describe('=================================================\n  testing dev-router\n  =================================================\n',
function(){
  before(serverControl.startServer);
  after(serverControl.killServer);
  // after((done) => {
  //   User.remove({})
  //   .then(() => done())
  //   .catch((err) => {
  //     console.log(err);
  //     done();
  //   });
  // });

  describe('testing POST /api/dev', function(){
    let results = [];

    // before((done) => {
    //   superagent.post(`${baseURL}/api/signup`)
    //   .send({
    //     username: 'boatsboats',
    //     password: '1234',
    //     email: 'boats@boatsboats.com',
    //   })
    //   .then(res => {
    //     results.push(res.text);
    //     console.log('this should be the token: ', results[0]);
    //     // expect(res.status).to.equal(200);
    //     // expect(Boolean(res.text)).to.equal(true);
    //     done();
    //   })
    //   .catch(done);
    // });

    it('should respond with a 200 on good request', function(done){
      console.log('token', token[0]);
      superagent.post(`${baseURL}/api/dev`)
      .send({username:'chris', email:'c@c.com', phone:'123-4567'})
      .set({
        'Authorization': `Bearer ${token[0]}`,
        'Content-Type': 'application/json',
      })
      // .set('Content-Type', 'application/json')
      .then(res => {
        console.log('res', res.text);

      })
      .catch(err => {
        console.log('the error im lookin at', err);

      });
      done();
    });

    describe('GET: /api/signin', function() {
      describe('with a valid body', function() {

        it('should return a token', done => {
          superagent.get(`${baseURL}/api/signin`)
          .auth('chris', '1234')
          .end((err, res) => {
            if (err) return done(err);
            // console.log('\nuser:', this.tempUser);
            console.log('\ntoken:', res.text);
            // token.push(res.text);
            console.log(res.status);
            expect(res.status).to.equal(200);
          });
          done();
        });
      });
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
      // .auth(this.tempUser.username, '1234')
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
