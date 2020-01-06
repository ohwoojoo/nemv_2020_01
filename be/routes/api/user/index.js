var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const us = [
  {
    name: 'A',
    age: 14
  },
  {
    name: 'B',
    age: 24
  }
]

router.get('/', function(req, res, next) {
  console.log(req.query)
  console.log(req.body)
  res.send({ users: us })
});

router.post('/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  res.send({ success: true, msg: 'post OK' })
});

router.put('/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  res.send({ success: true, msg: 'put OK' })
});

router.delete('/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  res.send({ success: true, msg: 'delete OK' })
})

/* GET home page. */
router.all('*', function(req, res, next) {
  next(createError(404, '404 Not Found'));
});

module.exports = router;