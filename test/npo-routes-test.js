// 'use strict';
//
// const server = require('../server');
// const chai = require('chai');
// const http = require('chai-http');
// const expect = chai.expect;
// const User = require('../model/user');
// const NPO = require('../model/npo');
// const mockUser = new User({username: 'jimmy', email: 'jimmy@jimmy.com', password: 'secret', isDev: false});
// const mockNpo = new NPO({userID: mockUser._id, username: mockUser.username});
//
// chai.use(http);
//
// describe('dev routes', function() {
//   let app;
//   before(done => {
//     app = server.listen(5000);
//     done();
//   });
//   after(done => {
//     app.close();
//     done();
//   });
//   describe('an unregistered route', function() {
//     it('should return a 404 status code', done => {
//       chai.request(server)
//       .post('/api/badRoute')
//       .end((err, res) => {
//         if(err) console.error(err);
//         expect(res.status).to.equal(404);
//         done();
//       });
//     });
//   });
//   describe('GET routes', function() {
//     before(done => {
//       chai.request(server)
//       .post('/api/npo')
//       .send(mockNpo)
//       .end((err) => {
//         if(err) console.error(err);
//         done();
//       });
//     });
//     after(done => {
//       chai.request(server)
//       .delete(`/api/npo/${mockNpo.userID}`)
//       .end(err => {
//         if(err) console.error(err);
//         done();
//       });
//     });
//     describe('a request to /api/npolist', function() {
//       describe('a properly formatted request', function() {
//         it('should return a 200 status code', done => {
//           chai.request(server)
//           .get('/api/npolist')
//           .send()
//           .end((err, res) => {
//             if(err) console.error(err);
//             expect(res.status).to.equal(200);
//             done();
//           });
//         });
//       });
//       describe('a improperly formatted request', function() {
//         it('should return a 400 status code', done => {
//           chai.request(server)
//           .get('/api/npolist')
//           .send()
//           .end((err, res) => {
//             if(err) console.error(err);
//             expect(res.status).to.equal(400);
//             done();
//           });
//         });
//       });
//     });
//     describe('a request to /api/npo/:id', function() {
//       describe('a properly formatted request', function() {
//         it('should return a 200 status code', done => {
//           chai.request(server)
//           .get(`/api/npo/${mockNpo.userID}`)
//           .send()
//           .end((err, res) => {
//             if(err) console.error(err);
//             expect(res.status).to.equal(200);
//             done();
//           });
//         });
//       });
//       describe('an improperly formatted request', function() {
//         it('should return a 404 status code given an invalid id', done => {
//           chai.request(server)
//           .get('/api/npo/badID')
//           .send()
//           .end((err, res) => {
//             if(err) console.error(err);
//             expect(res.status).to.equal(404);
//             done();
//           });
//         });
//       });
//     });
//   });
// });
//
// describe('POST routes', function() {
//   before(done => {
//     chai.request(server)
//     .post('/api/npo')
//     .send(mockNpo)
//     .end((err) => {
//       if(err) console.error(err);
//       done();
//     });
//   });
//   after(done => {
//     chai.request(server)
//     .delete(`/api/npo/${mockNpo.userID}`)
//     .end(err => {
//       if(err) console.error(err);
//       done();
//     });
//   });
//   describe('a request to /api/npo', function() {
//     describe('a properly formatted request', function() {
//       it('should return a 200 status code', done => {
//         chai.request(server)
//         .post('/api/npo')
//         .send(mockNpo)
//         .end((err, res) => {
//           if(err) console.error(err);
//           expect(res.status).to.equal(200);
//           done();
//         });
//       });
//     });
//     describe('an improperly formatted request', function() {
//       it('should return a 400 status code given an invalid body or no body', done => {
//         chai.request(server)
//         .post('/api/npo')
//         .send()
//         .end((err, res) => {
//           if(err) console.error(err);
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//   });
// });
//
// describe('DELETE routes', function() {
//   before(done => {
//     chai.request(server)
//     .post('/api/npo')
//     .send(mockNpo)
//     .end(err => {
//       if(err) console.error(err);
//       done();
//     });
//   });
//   after(done => {
//     chai.request(server)
//     .delete(`/api/npo/${mockNpo.userID}`)
//     .end(err => {
//       if(err) console.error(err);
//       done();
//     });
//   });
//   describe('a request to /api/npo/:id', function() {
//     describe('a properly formatted request', function() {
//       it('should return a 204 status code', done => {
//         chai.request(server)
//         .delete(`/api/npo/${mockNpo.userID}`)
//         .end((err, res) => {
//           if(err) console.log(err);
//           expect(res.status).to.equal(204);
//           done();
//         });
//       });
//     });
//     describe('an improperly formatted request', function() {
//       it('should return a 404 status code given an invalid id', done => {
//         chai.request(server)
//         .delete(`/api/npo/${mockNpo.userID}`)
//         .end((err, res) => {
//           if(err) console.log(err);
//           expect(res.status).to.equal(404);
//           done();
//         });
//       });
//     });
//   });
// });
