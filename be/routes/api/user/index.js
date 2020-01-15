var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users')

// const us = [
//   {
//     name: 'A',
//     age: 14
//   },
//   {
//     name: 'B',
//     age: 24
//   }
// ]

router.get('/', function(req, res, next) {
  // console.log(req.query)
  // console.log(req.body)
  // res.send({ users: us })
  User.find()
    .then(r => {
      res.send({ success: true, users: r })
    })
    .catch(e => {
      res.send({ success: false })
    })
});

router.post('/', (req, res, next) => {
  // console.log(req.query)
  // console.log(req.body)
  // res.send({ success: true, msg: 'post OK' })
  const { name, age } = req.body
  const u = new User({
    name: name,
    age: age
  })
  // // 같을 경우
  // const u = new User({ name, age })

  u.save()
    .then(r => {
      res.send({ sucess: true, msg: r })
    })
    .catch(e => {
      res.send({ sucess: false, msg: e.message })
    })
});

router.put('/', (req, res, next) => {
  // console.log(req.query)
  // console.log(req.body)
  // res.send({ success: true, msg: 'put OK' })
  const id = req.params.id
  const { name, age } = req.body
  User.updateOne({ _id: id }, { $set: { name, age } })
  .then(r => {
    res.send({ sucess: true, msg: r })
  })
  .catch(e => {
    res.send({ sucess: false, msg: e.message })
  })
});

router.delete('/', (req, res, next) => {
  // console.log(req.query)
  // console.log(req.body)
  // res.send({ success: true, msg: 'delete OK' })
  const id = req.params.id
  User.deleteOne({ _id: id })
    .then(r => {
      res.send({ sucess: true, msg: r })
    })
    .catch(e => {
      res.send({ sucess: false, msg: e.message })
    })
})

/* GET home page. */
router.all('*', function(req, res, next) {
  next(createError(404, '404 Not Found'));
});

module.exports = router;