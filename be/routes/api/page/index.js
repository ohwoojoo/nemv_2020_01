var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Page = require('../../../models/pages')

router.post('/', function(req, res, next) {  
  const { name } = req.body
  Page.findOne({ name })
    .then((r) => {
      if (!r) {
        if (req.user.lv) throw new Error(`${name} 페이지를 생성할 수 없습니다.`) // req.user.lv > 0
        return Page.create({ name })
      }
      if (r.lv < req.user.lv) throw new Error(`${name} 페이지를 이용할 수 없습니다.`)
      return Page.updateOne({ _id: r._id }, { $inc: { inCnt: 1 } })
    })
    .then(() => {
    //   return Page.find()
    // })
    // .then((rs) => {
    //   console.log(rs)
      res.send({ success: true, d: req.user })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, '(page>index) Page Not Found'));
});

module.exports = router;