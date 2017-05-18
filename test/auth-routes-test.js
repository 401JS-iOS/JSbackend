'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user');
const server = require('../server');
const chai = require('chai');
const http = require('chai-http');

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test-dev';


require('../server.js');
mongoose.Promise = Promise;

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  username: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com',
};

chai.use(http);

let token = [];
describe('server - test', function() {
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
    after(done => {
      User.findOne({username: 'chris'})
      .then(user => {
        User.findByIdAndRemove(user._id)
       .then(() => done());
      });
    });

    describe('/signup endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/api/signup')
        .send({username:'chris', email:'c@c.com', password:'1234'})
        .end((err, res) => {
          console.log(res.status, res.body);

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
      after( done => {
        User.remove({})
        .then(() => done())
        .catch(done);
      });

      it('should return a token', done => {
        console.log('exampleUser ', exampleUser);
        request.post(`${url}/api/signup `)
        .send(exampleUser)
        .end((err, res) => {
          // console.log('request', request.post, 'req');
          // console.log('res', res);
          if (err) return done(err);
          console.log('\ntoken:', res.text, '\n');
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
    });
  });

  describe('GET: /api/signin', function() {
    describe('with a valid body', function() {
      before( done => {
        let user = new User(exampleUser);
        user.generatePasswordHash(exampleUser.password)
        .then( user => user.save())
        .then( user => {
          this.tempUser = user;
          done();
        })
        .catch(done);
      });

      after( done => {
        User.remove({})
        .then( () => done())
        .catch(done);
      });

      it('should return a token', done => {
        request.get(`${url}/api/signin`)
        .auth('exampleuser', '1234')
        .end((err, res) => {
          if (err) return done(err);
          // console.log('\nuser:', this.tempUser);
          // console.log('\ntoken:', res.text);
          token.push(res.text);
          console.log(res.status);
          expect(res.status).to.equal(200);
          done();
        });
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
