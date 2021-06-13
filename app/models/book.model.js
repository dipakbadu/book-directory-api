let mongoose = require('mongoose')
let Schema = mongoose.Schema

let bookSchema = new Schema({
  bookname: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author_name: {
    type: String,
    required: true
  },
  images: {
    type: Array
  },
  created_at: {
    type: Date,
    default: new Date
  }
})
let Book = module.exports = mongoose.model('book', bookSchema)
module.exports.get = function (callback, limit) {
  Book.find(callback).limit(limit)
}