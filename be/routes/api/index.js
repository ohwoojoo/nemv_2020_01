var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken');
const cfg = require('../../../config')

// router.get('/hello', function(req, res, next) {
//   res.send({msg: 'hello', a: 1})
// });

// router.get('/user', function(req, res, next) {
//   res.send({msg: 'user', a: 2})
// });

router.use('/sign', require('./sign'))
router.use('/manage', require('./manage'))

// 토큰을 푸는 과정
const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 })
    if ((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰입니다.'))
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 3 })
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

// 미들웨어
router.all('*', function(req, res, next) {
  // console.log(req.headers)
  // console.log(req.path)
  // if(req.path === '/asdf') return res.send({ status: 'OK' })
  // next();

  // 토큰 검사 -> 나중에 따로 파일 만들어서 빼야 해
  const token = req.headers.authorization
  // if (!token) return next
  verifyToken(token)
    .then(v => {
      // console.log(v)
      req.user = v
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message })) 
});

router.use('/page', require('./page'))
router.all('*', function(req, res, next) {
  if (req.user.lv > 2) return res.send({ success: false, msg: '권한이 없습니다.' })
})

router.use('/test', require('./test'))
router.all('*', function(req, res, next) {
  if (req.user.lv > 0) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})

router.use('/user', require('./user'))

/* GET home page. */
router.all('*', function(req, res, next) {
  next(createError(404, '404 Not Found'));
});

module.exports = router;