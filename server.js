'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
//const debug = require('debug')('cfgram:server');
const Promise = require('bluebird');
const errorHandler = require('./lib/error-midd');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const authRoutes = require('./route/auth-router')(router);
const npoRoutes = require('./route/npo-router')(router);
const devRoutes = require('./route/dev-router')(router);
const projectRoutes = require('./route/project-router')(router);
const reviewRoutes = require('./route/review-router')(router);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/devolunteer';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(errorHandler);
app.use(cors());
app.use(bodyParser);

app.use('/api', authRoutes);
app.use('/api', npoRoutes);
app.use('/api', devRoutes);
app.use('/api', projectRoutes);
app.use('/api', reviewRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

server.isOn = true;
module.exports = server;
