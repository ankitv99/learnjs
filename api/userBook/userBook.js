const Joi = require('joi')
const models = require('../../models')

const addUserBook = async (req, res, next) => {

    try {

        const foundBook = await models.Books.findOne({
            where: { id: req.body.bookId }

        })
        console.log(foundBook.quantity)
        if (foundBook.quantity < req.body.quantity) {
            return res.json({
                success: false,
                message: 'Book quantity is more than available'
            })
        }
        if (!foundBook) {
            return res.json({
                success: false,
                message: 'Book not found'
            })

        }
        const foundUser = await models.User.findOne({
            where: { id: req.body.userId }
        })
        if (!foundUser) {
           return res.json({
                success: false,
                message: 'User not found'
            })

        }
        foundBook.set({
            quantity: foundBook.quantity - req.body.quantity
        })
        await foundBook.save()
        await models.userBook.create({
            bookId: foundBook.id,
            userId: foundUser.id,
            quantity: req.body.quantity

        })
        res.json({
            success: true

        })

    } catch (error) {
        next(error)
    }

}

module.exports = { addUserBook } 
