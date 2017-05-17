'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const serverControl = require('./lib/server-control');
const superagent = require('superagent');
const mockUser = require('./lib/mock-user');
const mockDev = require('./lib/mock-dev');
const User = require('../model/user');
const Dev = require('../model/dev');


chai.use(http);

describe('dev routes', function() {
  before(done => serverControl.startServer(done));
  after(done => serverControl.killServer(done));
  afterEach(done => {
    User.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('an unregistered route', function() {
    it('should return a 404 status code', done => {
      chai.request(server)
      .post('/api/badRoute')
      .end((err, res) => {
        // if(err) console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('GET routes', function() {
    before(done => {
      chai.request(server)
      .post('/api/dev')
      .send(mockDev)
      .end((err) => {
        // if(err) console.error(err);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete(`/api/dev/${mockDev.userID}`)
      .end(err => {
        // if(err) console.error(err);
        done();
      });
    });
    describe('a request to /api/devlist', function() {
      describe('a properly formatted request', function() {
        before(mockUser.bind(this));

        it('should return a 200 status code', done => {
          superagent.get(`/api/devlist`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        // it('should return a 200 status code', done => {
        //   chai.request(server)
        //   .get('/api/devlist')
        //   .send()
        //   .end((err, res) => {
        //     // if(err) console.error(err);
        //     expect(res.status).to.equal(200);
        //     done();
          });
        });
      });
      describe('a improperly formatted request', function() {
        before(mockUser.bind(this));

        it('should return a 400 status code', done => {
          superagent.get(`/api/devlist`)
          .set('Authorization', `Bearer ${this.tempToken}`)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
        // it('should return a 400 status code', done => {
        //   chai.request(server)
        //   .get('/api/devlist')
        //   .send(mockDev.userID)
        //   .end((err, res) => {
        //     // if(err) console.error(err);
        //     expect(res.status).to.equal(400);
        //     done();
          });
        });
      });
    });
    describe('a request to /api/dev/:id', function() {
      describe('a properly formatted request', function() {
        before(mockUser.bind(this));

        it('should return a 200 status code', done => {
          superagent.get(`/api/dev/${this.tempUser._id}`)
          .set('Authorization', `Bearer ${this.tempToken}`)
          .end((err, res) => {
            // if(err) console.error(err);
            console.log(res.body);
            expect(res.status).to.equal(200);
            expect(res.body.username).to.equal(this.tempUser.username);
            expect(Boolean(res.body._id)).to.equal(true);
            done();
          });
        });
      });
      describe('an improperly formatted request', function() {
        before(mockUser.bind(this));

        it('should return a 404 status code', done => {
          superagent.get(`/api/dev/${this.tempUser.badID}`)
          .set('Authorization', `Bearer ${this.tempToken}`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
        // it('should return a 404 status code given an invalid id', done => {
        //   chai.request(server)
        //   .get('/api/dev/badID')
        //   .send()
        //   .end((err, res) => {
        //     // if(err) console.error(err);
        //     expect(res.status).to.equal(404);
        //     done();
          });
        });
      });
    });
  });
});

// describe('POST routes', function() {
//   before(done => serverControl.startServer(done));
//   after(done => serverControl.killServer(done));
//   afterEach(done => {
//     User.remove({})
//     .then(() => done())
//     .catch(done);
//   });
//
//   describe('a request to /api/dev', function() {
//     describe('a properly formatted request', function() {
//       it('should return a 200 status code', done => {
//         chai.request(server)
//         .post('/api/dev')
//         .send(mockDev)
//         .end((err, res) => {
//           // if(err) console.error(err);
//           expect(res.status).to.equal(200);
//           done();
//         });
//       });
//     });
//     describe('an improperly formatted request', function() {
//       it('should return a 400 status code given an invalid body or no body', done => {
//         chai.request(server)
//         .post('/api/dev')
//         .send()
//         .end((err, res) => {
//           // if(err) console.error(err);
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//   });
// });
//
// describe('DELETE routes', function() {
//   before(done => serverControl.startServer(done));
//   after(done => serverControl.killServer(done));
//   afterEach(done => {
//     User.remove({})
//     .then(() => done())
//     .catch(done);
//   });
//
//   describe('a request to /api/dev/:id', function() {
//     describe('a properly formatted request', function() {
//       it('should return a 204 status code', done => {
//         chai.request(server)
//         .delete(`/api/dev/${mockDev.userID}`)
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
//         .delete(`/api/dev/${mockDev.userID}`)
//         .end((err, res) => {
//           if(err) console.log(err);
//           expect(res.status).to.equal(404);
//           done();
//         });
//       });
//     });
//   });
// });
