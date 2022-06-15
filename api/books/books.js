const Joi = require('joi')
const models = require('../../models')


const addBooks = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).max(200).required(),
            author: Joi.string().min(3).max(200).required(),
            price: Joi.number().integer().min(1).required(),
            quantity: Joi.number().integer().min(1).required()
        })
        await schema.validateAsync(req.body)
        const payload = {
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            quantity: req.body.quantity
        }
        await models.Books.create(payload)
        res.json({
            success: true
        })

    } catch (error) {
        next(error)

    }

}

const getBooks = async (req, res, next) => {
    try {
        const result = await models.Books.findAll()
        res.json({
            result
        })
    } catch (error) {
        next(error)
    }

}

const getOneBook = async (req, res, next) => {
    try {
        await models.Books.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({
            result
        })
    }
    catch (error) {
        next(error)
    }
}


const updateBook = async (req, res, next) => {
    try {
        const schema = Joi.object({

            price: Joi.number().integer().min(1).required(),
            quantity: Joi.number().integer().min(1).required()
        })
        await schema.validateAsync(req.body)
        const payload = {
            price: req.body.price,
            quantity: req.body.quantity
        }
        await models.Books.update(payload, {
            where: {
                id: req.params.id
            }
        })
        res.json({
            result
        })
    }
    catch (error) {
        next(error)
    }
}


const deleteBook = async (req, res, next) => {
    try {
        await models.Books.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            result
        })
    }
    catch (error) {
        next(error)
    }
}

const copyBook = async (req, res, next) => {
    try {
        const foundBook = await models.Books.findOne({
            where: { id: req.params.id }
        })
        await models.Books.create({
            name: foundBook.name,
            author: foundBook.author,
            price: foundBook.price,
            quantity: foundBook.quantity
        })
        res.json({
            success: true
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    addBooks,
    getBooks,
    getOneBook,
    updateBook,
    deleteBook,
    copyBook
}