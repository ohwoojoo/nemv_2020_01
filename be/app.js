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
console.log(cfg)

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
