// 'use strict';
//
// const expect = require('chai').expect;
// const superagent = require('superagent');
// const User = require('../model/user');
// const userMocks = require('./lib/mock-user');
// const serverControl = require('./lib/server-control');
//
// const baseURL = `http://localhost:${process.env.PORT}`;
//
// describe('=================================================\n  testing auth-router\n  =================================================\n',
// function(){
//   before(serverControl.startServer);
//   after(serverControl.killServer);
//   afterEach((done) => {
//     User.remove({})
//     .then(() => done())
//     .catch((err) => {
//       console.log(err);
//       done();
//     });
//   });
//
//   describe('testing POST /api/signup', function(){
//     it('should return a user', function(done){
//       superagent.post(`${baseURL}/api/signup`)
//       .send({
//         username: 'boatsboats',
//         password: '1234',
//         email: 'boats@boatsboats.com',
//       })
//       .then(res => {
//         expect(res.status).to.equal(200);
//         expect(Boolean(res.text)).to.equal(true);
//         done();
//       })
//       .catch(done);
//     });
//     it('a missing field should respond with 400 status', done => {
//       superagent.post(`${baseURL}/api/signup`)
//       .send({username: 'blah', password: 'yum'})
//       .then(done)
//       .catch(err => {
//         expect(err.status).to.equal(400);
//         done();
//       })
//       .catch(done);
//     });
//
//     it('bad endpoint should respond with 404 status', done => {
//       superagent.post(`${baseURL}/api/sign`)
//       .send({})
//       .then(done)
//       .catch(err => {
//         expect(err.status).to.equal(404);
//         done();
//       })
//       .catch(done);
//     });
//     it('should return a 400 error for bad signup', function(done){
//       superagent.post(`${baseURL}/api/signup`)
//       .send({
//         email: 'boats@boatsboats.com',
//         password: '1234',
//       })
//       .then(done)
//       .catch(err => {
//         expect(err.status).to.equal(400);
//         done();
//       });
//       it('should respond with 409 status', done => {
//         superagent.post(`${baseURL}/api/signup`)
//         .send({
//           email: 'boats@boatsboats.com',
//           password: '1234',
//           phone: 2534487489,
//         })
//         .then(done)
//         .catch(err => {
//           expect(err.status).to.equal(409);
//           done();
//         })
//         .catch(done);
//       });
//     });
//   });
//   describe('testing GET /api/signin', function(){
//     beforeEach(userMocks.bind(this));
//
//     it('should respond with a token', (done) => {
//       superagent.get(`${baseURL}/api/signin`)
//       .auth(this.tempUser.username, 'password')
//       .then(res => {
//         expect(res.status).to.equal(200);
//         expect(Boolean(res.text)).to.equal(true);
//         done();
//       })
//       .catch(done);
//     });
//     it('should respond with a 404 error', (done) => {
//       superagent.get(`${baseURL}/api/badlogin`)
//       .auth(this.tempUser.username, '1234')
//       .then(done)
//       .catch(err => {
//         expect(err.status).to.equal(404);
//         done();
//       })
//       .catch(done);
//     });
//   });
// });
