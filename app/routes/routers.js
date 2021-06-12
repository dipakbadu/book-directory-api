const express = require('express')
const router = express()
const passport = require('../config/passport')
const userController = require('../controllers/user.controller')
const bookController = require('../controllers/book.controller')
const multer = require('multer');

const multerStorage = require('../../multer')

let upload = multer({ storage: multerStorage.storage });

router.get('/user', userController.user)
router.post('/users', userController.addUser)
router.post('/login', userController.login)

router.post('/books',
  passport.authenticate('jwt', { session: false }),
  upload.array('images'),
  bookController.addBook
)
router.get('/books',
  passport.authenticate('jwt', { session: false }),
  bookController.getBooks
)
router.get('/books/:id',
  passport.authenticate('jwt', { session: false }),
  bookController.getBook
)
router.put('/books/:id',
  passport.authenticate('jwt', { session: false }),
  upload.array('images'),
  bookController.updateBook
)
router.delete('/books/:id',
  passport.authenticate('jwt', { session: false }),
  bookController.deleteBook
)


module.exports = router