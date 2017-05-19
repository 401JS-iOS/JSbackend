'use strict';

const bearerAuth = require('../lib/bearer-auth-midd');
const reviewController = require('../controller/review-controller');
const createError = require('http-errors');

module.exports = function(router) {
  router.post('/npo/:id/project/:id/review', bearerAuth, (req, res) => {

    reviewController.createReview(req)
    .then(review => res.json(review))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/project/:id/reviewlist', (req, res) => {
    reviewController.fetchAllReviews()
    .then(review => res.json(review))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/npo/:id/project/:id/review/:id', (req, res) => {

    reviewController.fetchReview(req.params.id)
    .then(review => {
      if(review.userID.toString() !== req.user._id.toString()) {
        return createError(401, 'Invalid User ID');
      }
      res.json(review);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.put('/npo/:id/project/:id/review/:id', bearerAuth, (req, res) => {
    reviewController.updateReview(req, res, req.params.id)
    .then(review => res.json(review))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/npo/:id/project/:id/review/:id', bearerAuth, (req, res) => {
    reviewController.deleteReview(req, res, req.params.id);
  });

  return router;
};
