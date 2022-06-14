const { addUserBook } = require('./userBook')


const router = require('express').Router()


router.post('/', addUserBook)


module.exports = router