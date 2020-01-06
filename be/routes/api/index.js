var express = require('express');
var createError = require('http-errors');
var router = express.Router();

// router.get('/hello', function(req, res, next) {
//   res.send({msg: 'hello', a: 1})
// });

// router.get('/user', function(req, res, next) {
//   res.send({msg: 'user', a: 2})
// });

router.use('/test', require('./test'))
router.use('/user', require('./user'))

/* GET home page. */
router.all('*', function(req, res, next) {
  next(createError(404, '404 Not Found'));
});

module.exports = router;