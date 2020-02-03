const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const userSchema = new mongoose.Schema({
  name: { type: String, default: ''},
  age: { type: Number, default: 1 },
  id: { type: String, default: '', unique: true, index: true },
  pwd: { type: String, default: ''},
  retry: { type: Number, default: 0 },  // 저장된 비밀번호 - 입력한 비밀번호 일치할 때까지 시도한 횟수
  lv: { type: Number, default: 2 }, // 레벨 (관리자: 0, 가입 후 승격: 1, 가입 시: 2, 비회원: 3)
  inCnt: { type: Number, default: 0 } // 로그인을 한 횟수
})

const User = mongoose.model('User', userSchema)
User.collection.dropIndexes({ name: 1 })

User.findOne({ id: cfg.admin.id })
  .then((r) => {
    // console.log(r)
    if (!r) return User.create({ id: cfg.admin.id, pwd: cfg.admin.pwd, name: cfg.admin.name, lv: 0 })
    // if (r.lv === undefined) return User.updateOne({ _id: r._id }, { $set: { lv: 0, inCnt: 0 } })  // 임시 (관리자 계정 레벨: 0)
    return Promise.resolve(null)
  })
  .then((r) => {
    if (r) console.log(`admin: ${r.id} created!`)
  })
  .catch((e) => {
    console.error(e.message)
  })

module.exports = User