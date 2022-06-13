const router = require('express').Router()
const booksHandler = require('./books')
const userHandler = require('./users')

router.use('/books', booksHandler)
router.use('/users', userHandler)

module.exports = router