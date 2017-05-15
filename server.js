'use strict';

const express = require('express');

const mongoose = require('mongoose');
const morgan = require('morgan');
const authRouter = require('./route/auth-router.js')(router);
const devRouter = require('./route/dev-router');
const npoRouter = require('./route/npo-router.js');
const errorMiddleware = require('./lib/error-midd.js');
const bodyParser = require('body-parser').json();

const app = express();

//local mongo db will be called 'devolunteer'
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/devolunteer';
//const router = express.Router();
mongoose.connect(MONGODB_URI);
mongoose.Promise = Promise;

app.use(morgan('dev'));
app.use(bodyParser);
app.use(authRouter);
app.use(devRouter);
app.use(npoRouter);
app.use(errorMiddleware);

module.exports = app;

if(require.main === module) {
  app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
};
