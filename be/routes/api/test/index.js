var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
  // console.log(req.headers)
  res.send({msg: 'hello', a: 'OK'})
});

router.get('/hello', function(req, res, next) {
  res.send({msg: 'hello', a: 111})
});

/* GET home page. */
router.all('*', function(req, res, next) {
  next(createError(404, '404 Not Found'));
});

module.exports = router;