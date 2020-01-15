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

app.use(cors())
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

module.exports = app;

const mongoose = require('mongoose')
// const User = çrequire('./models/users')
mongoose.connect('mongodb://localhost:27017/nemv', {
   useNewUrlParser: true,
   useUnifiedTopology: true
  }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')
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
// User.updateOne( { _id: '5e1430988216cf0f41eaa24d'}, { $set: { age: 1 } })
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
