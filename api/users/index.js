const { addUser } = require('./users')
const { getUser } = require('./users')
const { updateUser } = require('./users')
const { deleteUser } = require('./users')

const router = require('express').Router()


router.post('/', addUser)
router.get('/', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router