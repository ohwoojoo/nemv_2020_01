var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var history = require('connect-history-api-fallback')
const cors = require('cors')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') app.use(cors())
app.use('/api', require('./routes/api'))
app.use(history())
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ msg: err.message })
});

const mongoose = require('mongoose')
const User = require('./models/users')

console.log(`${process.env.NODE_ENV} mode started!`)

const cfg = require('../config')
// console.log(cfg)

mongoose.connect(cfg.dbUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true
  }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')
  // User.deleteMany()
  // .then(r => console.log(r))
  // .catch(e => console.error(e))
})

// const userSchema = new mongoose.Schema({
//   name: { type: String, default: ''},
//   age: {type: Number, default: 1}
// })

// const User = mongoose.model('User', userSchema)


// // C
// User.create({ name: 'A' })
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

// // R
// User.find()
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

// // U
// User.updateOne( { _id: '5e1fe55b5e93700bb482822e'}, { $set: { age: 1 } })
// .then(r => {
//   console.log(r)
//   console.log('Updated')
//   return User.find()
// })
// .then(r => console.log(r))
// .catch(e => console.error(e))

// //D
// User.deleteOne({ name: 'A' })
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

module.exports = app;

var jwt = require('jsonwebtoken');
const key = '키 입니다.'
var token = jwt.sign({ id: 'aaa', email: 'aaa@abc.com' }, key);
// console.log(token)

// verify a token symmetric - synchronous
var decoded = jwt.verify(token, key) /* , (err) => {
  if(err) return console.log(err)
}); */
// console.log(decoded) // bar
// console.log(new Date(decoded.iat * 1000))


// // callback 함수 만드는 법
// const foo = (v, cb) => {
//   if (v > 1) return cb(new Error('abcd'))
//   setTimeout(() => {
//     cb(null, v + 1)
//   }, 3000)
// }
// foo(1, (err, r) => {
//   if (err) return console.error(err.message)
//   console.log(r)
// })


// console.log(jwt.sign({ id: 'abc' }), 'abcd')
// console.log('HELLO?')
// jwt.sign({ id: 'abc' }, 'key', (err, token) => {
//   console.log(token)
// })
// console.log('HELLO?')

// // callback
// User.findOne({}, (err, r) => {
//   if (err) return console.error(err)
//   console.log(r)
// })
// // promise
// User.findOne({})
//   .then(r => console.log(r))
//   .catch(err => console.error(err))

// // 콜백
// User.findOne({ name: 'aaa'}, (err, u) => {
//   if (err) return console.error(err.message)
//   // 'aaa'가 없으면
//   if (!u) {
//     console.log(u) // null
//     User.create({ name: 'aaa', age: 10 }, (err, cu) => {
//       if (err) return console.error(err.message)
//       console.log(cu) // { name: 'aaa', age: 10, _id: 5bd81974ad66cf3832db0838, __v: 0 }
//       jwt.sign({ name: cu.name, age: cu.age}, key, (err, token) => {
//         if (err) return console.error(err.message)
//         console.log(token) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//         jwt.verify(token, key, (err, v) => {
//           if (err) return console.error(err.message)
//           console.log(v) // { name: 'aaa', age: 10, iat: 1540888948 }
//         })
//       })
//     })
//   }
//   // 'aaa'가 있으면
//   else {
//     console.log(u) // { name: 'aaa', age: 10, _id: 5bd81974ad66cf3832db0838, __v: 0 }
//     const user = u
//     User.updateOne({ _id: u._id }, { $inc: { age: 1 }}, (err, ur) => {
//       if (err) return console.error(err.message)
//       console.log(ur) // { n: 1, nModified: 1, ... }
//       jwt.sign({ name: user.name, age: user.age + 1 }, key, (err, token) => {
//         if (err) return console.error(err.message)
//         console.log(token) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//         jwt.verify(token, key, (err, v) => {
//           if (err) return console.error(err.message)
//           console.log(v) // { name: 'aaa', age: 11, iat: 1540889007 }
//         })
//       })
//     })
//   }
// })

const signToken = (u, k) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ name: u.name, age: u.age }, k, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
const verifyToken = (t, k) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, k, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

// // 프라미스
// let user
// User.findOne({ name: 'aaa' })
//   .then((u) => {
//     if (!u) return User.create({ name: 'aaa', age: 10 })
//     return Promise.resolve(u)
//   })
//   .then((u) => {
//     user = u
//     return User.updateOne({ _id: u._id }, { $inc: { age: 1 }})
//   })
//   .then((r) => {
//     if (!r.nModified) throw new Error('수정된 사항 없음')
//     user.age++
//     return signToken(user, key)
//   })
//   .then((token) => {
//     return verifyToken(token, key)
//   })
//   .then(v => console.log(v))
//   .catch((err) => {
//     console.error(err.message)
//   })

// // 어씽크 테스트
// const asyncTest = async (i) => {
//   if (i > 10) throw new Error('10보다 큰건 싫어요')
//   return i + 2
// }

// asyncTest(1)
//   .then(r => console.log(`2 더해져서 ${r} 입니다.`))
//   .catch(e => console.error(`에러났네요: ${e.message}`))

// asyncTest(11)
//   .then(r => console.log(`2 더해져서 ${r} 입니다.`))
//   .catch(e => console.error(`에러났네요: ${e.message}`))

// // 어씽크
// const getToken = async (name) => {
//   let u = await User.findOne({ name }) // name: name을 축약하고 await로 기다려 줍니다.
//   if (!u) u = await User.create({ name , age: 10 }) // 만들어주고 u를 갱신 합니다.
//   if (u.age > 12) throw new Error(`${u.age} > 12`)
//   const ur = await User.updateOne({ _id: u._id }, { $inc: { age: 1 }}) // age를 증가시키고 ur(user result)에 결과값을 담아놓습니다.
//   if (!ur.nModified) throw new Error('수정 사항 없음') // 수정된 값이 없다면 에러와 함께 내보냅니다.
//   u = await User.findOne({ _id: u._id }) // age가 증가 된 것으로 갱신해줍니다.
//   const token = await signToken(u, key) // 받아 두었던 u로 토큰을 만듭니다.
//   const v = await verifyToken(token, key)
//   return v
// }
// getToken('aaa')
//   .then(v => console.log(v))
//   .catch(err => console.error(err.message))

// User.deleteMany({})
//   .then(r => console.log(r))
//   .catch(err => console.error(err))