const router = require('express').Router()
const booksHandler = require('./books')
const userHandler = require('./users')
const userBookHandler= require('./userBook')

router.use('/books', booksHandler)
router.use('/users', userHandler)
router.use('/userBook', userBookHandler)

module.exports = router