'use strict';

const server = require('../../server');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/devolunteer';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const serverControl = module.exports = {};

serverControl.startServer = function(done) {
  if(!server.isOn){
    server.listen(process.env.PORT, () => {
      server.isOn = true;
      console.log(`Listening on PORT ${PORT}`);
      done();
    });
    return;
  }
  done();
};

serverControl.killServer = function(done) {
  if(server.isOn) {
    server.close(() => {
      server.isOn = false;
      console.log('The server is now down.');
      done();
    });
    return;
  }
  done();
};
