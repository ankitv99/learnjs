const { addBooks, getBooks, getOneBook, updateBook, deleteBook, copyBook } = require('./books')

const router = require('express').Router()



router.post('/', addBooks)
router.get('/', getBooks)
router.get('/:id', getOneBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)
router.post('/:id/copy', copyBook)


module.exports = router