var express = require('express');
var createError = require('http-errors');
var router = express.Router();

// router.get('/hello', function(req, res, next) {
//   res.send({msg: 'hello', a: 1})
// });

// router.get('/user', function(req, res, next) {
//   res.send({msg: 'user', a: 2})
// });

router.use('/sign', require('./sign'))

// 미들웨어
router.all('*', function(req, res, next) {
  // console.log(req.headers)
  // console.log(req.path)
  // if(req.path === '/asdf') return res.send({ status: 'OK' })
  next();
});

// router.use('/test', require('./test'))
// router.use('/user', require('./user'))
// router.use('/check', require('./check'))

/* GET home page. */
router.all('*', function(req, res, next) {
  next(createError(404, '404 Not Found'));
});

module.exports = router;