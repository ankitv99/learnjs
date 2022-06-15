const Joi = require('joi')
const models = require('../../models')

const addUserBook = async (req, res, next) => {
    const t = await models.sequelize.transaction();
    try {

        const foundBook = await models.Books.findOne({
            where: { id: req.body.bookId },
            transaction: t
        })
        console.log(foundBook.quantity)
        if (foundBook.quantity < req.body.quantity) {
            return res.json({
                success: false,
                message: 'Required Book quantity is more than available'
            })
        }
        if (!foundBook) {
            return res.json({
                success: false,
                message: 'Book not found'
            })

        }
        const foundUser = await models.User.findOne({
            where: { id: req.body.userId },
            transaction: t
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
        await foundBook.save({transaction: t})
        await models.userBook.create({
            bookId: foundBook.id,
            userId: foundUser.id,
            quantity: req.body.quantity

        }, { transaction: t })
        await t.commit()
        res.json({
            success: true

        })

    } catch (error) {
        await t.rollback()
        next(error)
    }

}

const getUserBooks = async (req, res, next) => {
    try {
        const data = await models.userBook.findAll({
            include: [
                {
                    model: models.Books
                },
                {
                    model: models.User
                }
            ]
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
}

module.exports = { addUserBook, getUserBooks } 



// account = 1000
// withdraw = 300
// transaction (checkpoint A)

// account = 1000 - 300 = 700
// wrong -> rollback
// cash = 300
// correct -> commit
// checkpoint B (commit)
