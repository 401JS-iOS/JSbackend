//
// 'use strict';
//
// const expect = require('chai').expect;
// const superagent = require('superagent');
// const User = require('../model/user');
// const npoMocks = require('./lib/mock-npo');
// const serverControl = require('./lib/server-control');
//
// const baseURL = `http://localhost:${process.env.PORT}`;
//
// describe('=================================================\n  testing npo-routes\n  =================================================\n',
//
// function(){
//   before(serverControl.startServer);
//   after(serverControl.killServer);
//   afterEach((done) => {
//     User.remove({})
//     .then(() => done())
//     .catch((err) => {
//       console.log(err.message);
//       done();
//     });
//   });
//
//   describe('testing POST /api/npo', function(){
//     it('should respond with a 200 on good request', function(done){
//       // superagent.post(`${baseURL}/api/npo`)
//       // .send({npoMocks})
//       // .then(done)
//       // .catch(done);
//       done();
//     });
//
//     let results = [];
//
//     it('should respond with a 401 if a field is missing', done => {
//       superagent.post(`${baseURL}/api/npo`)
//       .send({npoMocks})
//       .then(done)
//       .catch(err => {
//         console.log('err.error', err.message);
//         results.push(err.message);
//         expect(err.status).to.equal(401);
//         done();
//       })
//       .catch(done);
//     });
//
//     it('should respond with Unauthorized if a field is missing', done => {
//
//       expect(results[0]).to.equal('Unauthorized');
//       results.pop();
//       done();
//     });
//
//     it('should respond with a 404 given a bad endpoint', done => {
//       superagent.post(`${baseURL}/api/badEndpoint`)
//       .send({})
//       .then(done)
//       .catch(err => {
//         expect(err.status).to.equal(404);
//         done();
//       })
//       .catch(done);
//     });
//
//     it('should return a 401 error for improper signup', function(done){
//       superagent.post(`${baseURL}/api/npo`)
//       .send({})
//       .then(done)
//       .catch(err => {
//         console.log('err.status', err.status);
//         results.push(err.message);
//         expect(err.status).to.equal(401);
//         done();
//       });
//     });
//
//     it('should return Unauthorized error for improper signup', function(done){
//
//       expect(results[0]).to.equal('Unauthorized');
//       results.pop();
//       done();
//     });
//   });
//
//   describe('testing GET /api/npolist', function(){
//     beforeEach(npoMocks.bind(this));
//     let results = [];
//
//     it('should respond with a 200 status code on good request', (done) => {
//       superagent.get(`${baseURL}/api/npolist`)
//       .auth(`${this.username}:${this.password}`)
//       .then(res => {
//         expect(res.status).to.equal(200);
//         done();
//       })
//       .catch(done);
//     });
//
//     it('should respond with a 404 status code on bad request', (done) => {
//       superagent.get(`${baseURL}/api/badlogin`)
//       // .auth(this.tempUser.username, '1234')
//       .then(done)
//       .catch(err => {
//         console.log('err.message', err.message);
//         results.push(err.message);
//
//         expect(err.status).to.equal(404);
//         done();
//       })
//       .catch(done);
//     });
//
//     it('should respond with Not Found status code on bad request', (done) => {
//       expect(results[0]).to.equal('Not Found');
//       results.pop();
//       done();
//     });
//   });
// });
