'use strict';

const Dev = require('../model/dev');
const Npo = require('../model/npo');
const User = require('../model/user');
const Review = require('../model/review');
const Project = require('../model/project');

const expect = require('chai').expect;

const exDev = {
  username: 'bobby',
  websites: ['macrohard.com'],
  state: 'Washington',
  phone: '555-4059',
  email: 'b@b.com',
  languages: ['js'],
};

const exUser = {
  username: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com',
};

const exNpo = {
  username: 'exampleuser',
  org: 'someorg',
};

const exProject = {
  service: 'web app',
  desc: 'single page web app',
};

const exReview = {
  stars: 4,
  desc: 'exellent',
};

describe('Dev model', () => {
  let newDev = new Dev(exDev);

  describe('Dev properties entered', function() {
    it('should make a new dev', done => {
      expect(newDev).to.exist;
      console.log('newdev' + newDev);
      done();
    });

    it('should have title property equal to value entered', done => {
      expect(newDev.username).to.equal('bobby');
      done();
    });

    it('should have languages property', done => {
      expect(newDev).to.have.property('languages');
      done();
    });

    it('should have websites property', done => {
      expect(newDev).to.have.property('websites');
      done();
    });
  });

  describe('Dev auto properties', function() {

    it('should add services', done => {

      expect(newDev).to.have.property('services');
      done();
    });

    it('should add projects', done => {

      expect(newDev).to.have.property('projects');
      done();
    });

    it('should add _id', done => {

      expect(newDev).to.have.property('_id');
      done();
    });
  });
});

describe('User model', function() {
  let newUser = new User(exUser);

  describe('user properties', function() {

    it('should make a new user object', done => {
      expect(newUser).to.exist;
      console.log('newUser' + newUser);
      done();
    });

    it('should have username', done => {
      expect(newUser).to.have.property('username');
      done();
    });

    it('should have id', done => {
      expect(newUser).to.have.property('_id');
      done();
    });

    it('should have email', done => {
      expect(newUser).to.have.property('email');
      done();
    });

    it('should have password', done => {
      expect(newUser).to.have.property('password');
      done();

    });

    it('should have isDev', done => {
      expect(newUser).to.have.property('isDev');
      done();
    });
  });
});

// userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
// npoID: {type: mongoose.Schema.Types.ObjectId, ref: 'npos'},
// service: {type: String},
// dev: {type: mongoose.Schema.Types.ObjectId, ref: 'devs'},
// reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}],
// desc: {type: String},
// projStatus: {type: String},
// dateStart: {type: Date},
// dateEnd: {type: Date},

describe('Project model', function() {
  let newProject = new Project(exProject);

  describe('project properties', function() {

    it('should make a new user object', done => {
      expect(newProject).to.exist;
      console.log('newProject' + newProject);
      done();
    });

    it('should have service', done => {
      expect(newProject).to.have.property('service');
      done();
    });

    it('should have description', done => {
      expect(newProject).to.have.property('desc');
      done();
    });

    it('should have reviews', done => {
      expect(newProject).to.have.property('reviews');
      done();
    });

    it('should have id', done => {
      expect(newProject).to.have.property('_id');
      done();
    });
  });
});

// userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users' },
// username: {type: String, ref: 'users'},
// org: {type: String, required: true, unique: true}, //organization name
// city: {type: String},
// state: {type: String},
// phone: {type: String},
// email: {type: String},
// profilePic: {type: String},
// websites: [{type: String}],
// projects

describe('Npo model', function() {
  let newNpo = new Npo(exNpo);

  describe('user properties', function() {

    it('should make a new user object', done => {
      expect(newNpo).to.exist;
      console.log('newNpo' + newNpo);
      done();
    });

    it('should have username', done => {
      expect(newNpo).to.have.property('username');
      done();
    });

    it('should have org', done => {
      expect(newNpo).to.have.property('org');
      done();
    });

    it('should have id', done => {
      expect(newNpo).to.have.property('_id');
      done();
    });

    it('should have projects', done => {
      expect(newNpo).to.have.property('projects');
      done();
    });

    it('should have websites', done => {
      expect(newNpo).to.have.property('websites');
      done();
    });
  });
});

// projectID: {type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
// devID: {type: mongoose.Schema.Types.ObjectId, ref: 'devs' },
// npoID: {type: mongoose.Schema.Types.ObjectId, ref: 'npos'},
// stars: {type: Number, min:0, max: 5},
// desc: {type: String},
// date: {type: Date, default: Date.now, required: true},

describe('Review model', function() {
  let newReview = new Review(exReview);

  describe('user properties', function() {

    it('should make a new user object', done => {
      expect(newReview).to.exist;
      console.log('newReview' + newReview);
      done();
    });
  });
});
