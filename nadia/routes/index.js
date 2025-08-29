const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) { // eslint-disable-line no-unused-vars
  res.render('index', { title: 'Nadia\'s Garden' });
});

router.delete('/', function(req, res, next) { // eslint-disable-line no-unused-vars
  res.end(500);
});

module.exports = router;
