// 'use strict';
//
// const expect = require('chai').expect;
// const request = require('superagent');
// const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const Dev = require('../model/dev');
//
// // const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test-dev';
//
//
// require('../server.js');
// mongoose.Promise = Promise;
//
// const url = `http://localhost:${process.env.PORT}`;
// const exampleDev = {
//   username: 'exampleuser',
//
// }
//
// const exampleUser = {
//   username: 'exampleuser',
//   password: '1234',
//   email: 'exampleuser@test.com',
// };
//
//
// const server = require('../server');
// // const Dev = require('../models/user');
// const chai = require('chai');
// const http = require('chai-http');
// // const expect = chai.expect;
//
// chai.use(http);
//
// describe('server - test', function() {
//   let userObj = [];
//
//
//   describe('/wrong endpoint', function() {
//     it('should respond with a 404 on bad request', done => {
//       chai.request(server)
//       .post('/')
//       .send({})
//       .end((err, res) => {
//         console.log(res.status);
//         expect(res.status).to.equal(404);
//         done();
//       });
//     });
//   });
//
//   describe('POST || signup method', function() {
//     after(done => {
//       Dev.findOne({username: 'chris'})
//       .then(user => {
//         Dev.findByIdAndRemove(user._id)
//        .then(() => done());
//       });
//     });
//
//     describe('/signup endpoint', function() {
//       it('should respond with a 200 on proper request', done => {
//         chai.request(server)
//         .post('/api/signup')
//         .send({username:'chris', email:'c@c.com', password:'1234'})
//         .end((err, res) => {
//           console.log(res.status, res.body);
//
//           userObj.push(res.request._data);
//           expect(res.status).to.equal(200);
//           done();
//         });
//       });
//     });
//   });
// });
//
// describe('Auth Routes', function() {
//   describe('POST: /api/signup', function() {
//     describe('with a valid body', function() {
//       after( done => {
//         Dev.remove({})
//         .then(() => done())
//         .catch(done);
//       });
//
//       it('should return a token', done => {
//         console.log('exampleDev ', exampleDev);
//         request.post(`${url}/api/signup `)
//         .send(exampleDev)
//         .end((err, res) => {
//           // console.log('request', request.post, 'req');
//           // console.log('res', res);
//           if (err) return done(err);
//           console.log('\ntoken:', res.text, '\n');
//           expect(res.status).to.equal(200);
//           expect(res.text).to.be.a('string');
//           done();
//         });
//       });
//     });
//   });
//
//   describe('GET: /api/signin', function() {
//     describe('with a valid body', function() {
//       before( done => {
//         let user = new Dev(exampleDev);
//         user.generatePasswordHash(exampleDev.password)
//         .then( user => user.save())
//         .then( user => {
//           this.tempDev = user;
//           done();
//         })
//         .catch(done);
//       });
//
//       after( done => {
//         Dev.remove({})
//         .then( () => done())
//         .catch(done);
//       });
//
//       it('should return a token', done => {
//         request.get(`${url}/api/signin`)
//         .auth('exampleuser', '1234')
//         .end((err, res) => {
//           if (err) return done(err);
//           // console.log('\nuser:', this.tempDev);
//           // console.log('\ntoken:', res.text);
//
//           console.log(res.status);
//           expect(res.status).to.equal(200);
//           done();
//         });
//       });
//     });
//   });
//
//   // describe('DELETE user', function() {
//   //   it('should return a 200 if successful', done => {
//   //     request.delete(`${url}/api/signin`)
//   //   })
//   // })
// });
//
//
// // 'use strict';
// //
// // const server = require('../server');
// // const chai = require('chai');
// // const http = require('chai-http');
// // const expect = chai.expect;
// // const User = require('../model/user');
// // const Dev = require('../model/dev');
// // const mockUser = new User({username: 'jimmy', email: 'jimmy@jimmy.com', password: 'secret', isDev: true});
// // const mockDev = new Dev({userID: mockUser._id, username: mockUser.username});
// //
// // chai.use(http);
// //
// // describe('dev routes', function() {
// //   let app;
// //   before(done => {
// //     app = server.listen(5000);
// //     done();
// //   });
// //   after(done => {
// //     app.close();
// //     done();
// //   });
// //   describe('an unregistered route', function() {
// //     it('should return a 404 status code', done => {
// //       chai.request(server)
// //       .post('/api/badRoute')
// //       .end((err, res) => {
// //         if(err) console.error(err);
// //         expect(res.status).to.equal(404);
// //         done();
// //       });
// //     });
// //   });
// //   describe('GET routes', function() {
// //     before(done => {
// //       chai.request(server)
// //       .post('/api/dev')
// //       .send(mockDev)
// //       .end((err) => {
// //         if(err) console.error(err);
// //         done();
// //       });
// //     });
// //     after(done => {
// //       chai.request(server)
// //       .delete(`/api/dev/${mockDev.userID}`)
// //       .end(err => {
// //         if(err) console.error(err);
// //         done();
// //       });
// //     });
// //     describe('a request to /api/devlist', function() {
// //       describe('a properly formatted request', function() {
// //         it('should return a 200 status code', done => {
// //           chai.request(server)
// //           .get('/api/devlist')
// //           .send()
// //           .end((err, res) => {
// //             if(err) console.error(err);
// //             expect(res.status).to.equal(200);
// //             done();
// //           });
// //         });
// //       });
// //       describe('a improperly formatted request', function() {
// //         it('should return a 400 status code', done => {
// //           chai.request(server)
// //           .get('/api/devlist')
// //           .send()
// //           .end((err, res) => {
// //             if(err) console.error(err);
// //             expect(res.status).to.equal(400);
// //             done();
// //           });
// //         });
// //       });
// //     });
// //     describe('a request to /api/dev/:id', function() {
// //       describe('a properly formatted request', function() {
// //         it('should return a 200 status code', done => {
// //           chai.request(server)
// //           .get(`/api/dev/${mockDev.userID}`)
// //           .send()
// //           .end((err, res) => {
// //             if(err) console.error(err);
// //             expect(res.status).to.equal(200);
// //             done();
// //           });
// //         });
// //       });
// //       describe('an improperly formatted request', function() {
// //         it('should return a 404 status code given an invalid id', done => {
// //           chai.request(server)
// //           .get('/api/dev/badID')
// //           .send()
// //           .end((err, res) => {
// //             if(err) console.error(err);
// //             expect(res.status).to.equal(404);
// //             done();
// //           });
// //         });
// //       });
// //     });
// //   });
// // });
// //
// // describe('POST routes', function() {
// //   before(done => {
// //     chai.request(server)
// //     .post('/api/dev')
// //     .send(mockDev)
// //     .end((err) => {
// //       if(err) console.error(err);
// //       done();
// //     });
// //   });
// //   after(done => {
// //     chai.request(server)
// //     .delete(`/api/dev/${mockDev.userID}`)
// //     .end(err => {
// //       if(err) console.error(err);
// //       done();
// //     });
// //   });
// //   describe('a request to /api/dev', function() {
// //     describe('a properly formatted request', function() {
// //       it('should return a 200 status code', done => {
// //         chai.request(server)
// //         .post('/api/dev')
// //         .send(mockDev)
// //         .end((err, res) => {
// //           if(err) console.error(err);
// //           expect(res.status).to.equal(200);
// //           done();
// //         });
// //       });
// //     });
// //     describe('an improperly formatted request', function() {
// //       it('should return a 400 status code given an invalid body or no body', done => {
// //         chai.request(server)
// //         .post('/api/dev')
// //         .send()
// //         .end((err, res) => {
// //           if(err) console.error(err);
// //           expect(res.status).to.equal(400);
// //           done();
// //         });
// //       });
// //     });
// //   });
// // });
// //
// // describe('DELETE routes', function() {
// //   before(done => {
// //     chai.request(server)
// //     .post('/api/dev')
// //     .send(mockDev)
// //     .end(err => {
// //       if(err) console.error(err);
// //       done();
// //     });
// //   });
// //   after(done => {
// //     chai.request(server)
// //     .delete(`/api/dev/${mockDev.userID}`)
// //     .end(err => {
// //       if(err) console.error(err);
// //       done();
// //     });
// //   });
// //   describe('a request to /api/dev/:id', function() {
// //     describe('a properly formatted request', function() {
// //       it('should return a 204 status code', done => {
// //         chai.request(server)
// //         .delete(`/api/dev/${mockDev.userID}`)
// //         .end((err, res) => {
// //           if(err) console.log(err);
// //           expect(res.status).to.equal(204);
// //           done();
// //         });
// //       });
// //     });
// //     describe('an improperly formatted request', function() {
// //       it('should return a 404 status code given an invalid id', done => {
// //         chai.request(server)
// //         .delete(`/api/dev/${mockDev.userID}`)
// //         .end((err, res) => {
// //           if(err) console.log(err);
// //           expect(res.status).to.equal(404);
// //           done();
// //         });
// //       });
// //     });
// //   });
// // });
