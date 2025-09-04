const express = require('express');
const router = express.Router();
const debug = require('debug')('nadia:route:admin') // eslint-disable-line no-unused-vars
const _ = require('lodash');
const reservations = require('../lib/reservations');

/* GET admin listing. */
router.get('/admin', function(req, res, next) { // eslint-disable-line no-unused-vars
  reservations.fetch()
    .then(reservations => {
      res.render('admin', {
        title: 'Booking Requests - Nadia\'s Garden',
        reservations,
        header: _.keys(reservations[0])
      });
    })
});

module.exports = router;
