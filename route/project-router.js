'use strict';

const bearerAuth = require('../lib/bearer-auth-midd');
const projectController = require('../controller/project-controller');

module.exports = function(router) {
  router.post('/npo/:id/project', bearerAuth, (req, res) => {

    projectController.createProject(req)
    .then(proj => res.json(proj))
    .catch(err => res.status(err));
  });
};
