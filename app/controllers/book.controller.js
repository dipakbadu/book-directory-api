const Book = require('../modles/book.model')
const errorResponse = require('../response/error.response')
const successResponse = require('../response/success.response')

module.exports = {
  addBook: (req, res) => {
    let book = new Book()
    book.images = []
    book.bookname = req.body.bookname
    book.description = req.body.description
    book.author_name = req.body.author_name

    if (req.files) {
      const files = req.files;
      for (let file of files) {
        book.images.push(file.filename);
      }
    }
    book.save(function (err, data) {
      if (err) {
        res.json({
          message: err
        })
      } else {
        res.status(201).json({
          message: successResponse.SUCCESSFUL_CREATION,
          bookInfo: {
            id: data._id,
            bookname: data.bookname,
            description: data.description,
            author_name: data.author_name
          }
        })
      }
    })
  },

  getBooks: (req, res) => {
    Book.find().exec(function (err, data) {
      if (data) {
        res.json({
          data
        })
      } else {
        res.json({
          message: err
        })
      }
    })
  },

  getBook: (req, res) => {
    let id = req.params.id
    Book.findById(id).exec(function (err, data) {
      if (data) {
        res.json({
          data
        })
      } else {
        res.json({
          message: err
        })
      }
    })
  },

  updateBook: (req, res) => {
    bookId = req.params.id
    let images = []
    if (req.files) {
      const files = req.files;
      for (let file of files) {
        images.push(file.filename);
      }
    }

    Book.findById(bookId, function (err, book) {
      if (err) {
        res.json({
          message: err
        })
      } else {
        let updatedImages = images.concat(book.images)
        if (images) updatedImages.concat(images);
        book.bookname = req.body.bookname || book.bookname
        book.description = req.body.description || book.description
        book.author_name = req.body.author_name || book.author_name
        book.images = updatedImages
        book.save(function (err, data) {
          if (err)
            res.send(err)
          res.json({
            data: data,
            message: successResponse.SUCCESSFUL_UPDATE
          })
        })
      }
    })
  },

  deleteBook: (req, res) => {
    const bookId = req.params.id
    Book.remove({ _id: bookId }, function (err, data) {
      if (err) {
        res.send(err)
      } else {
        res.json({
          message: successResponse.SUCCESSFUL_DELETION
        })
      }
    })
  }
}