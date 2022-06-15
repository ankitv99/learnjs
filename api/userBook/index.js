const { addUserBook, getUserBooks } = require('./userBook')


const router = require('express').Router()


router.post('/', addUserBook)
router.get('/', getUserBooks)


module.exports = router