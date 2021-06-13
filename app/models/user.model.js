let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: new Date
  }
})
let User = module.exports = mongoose.model('user', userSchema)
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit)
}