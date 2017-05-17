'use strict';

require('dotenv').load();

const express = require('express');
const cors = require('cors');
//const debug = require('debug')('cfgram:server');
const Promise = require('bluebird');
const errorHandler = require('./lib/error-midd');
const bodyParser = require('body-parser').json();
const mongoose = require('mongoose');

const app = module.exports = express();
const router = express.Router();
const authRoutes = require('./route/auth-router')(router);
const npoRoutes = require('./route/npo-router')(router);
const devRoutes = require('./route/dev-router')(router);
require('./route/project-router')(router);

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
// app.use('/api', projRoutes);

app.listen(PORT,() => console.log(`Listening on PORT ${PORT}`));
