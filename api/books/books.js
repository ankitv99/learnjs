const Joi = require('joi')
const models = require('../../models')


const addBooks = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(200).required(),
        price: Joi.number().integer().min(1).required(),
        quantity: Joi.number().integer().min(1).required()
    })
    const details = schema.validate(req.body)
    if (!details.error) {
        const payload = {
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            quantity: req.body.quantity
        }
        models.Books.create(payload).then((result) => {
            res.json({
                success: true
            })
        }).catch((err) => {
            next(err)
        });
    } else {
        next(details.error)
    }
}

const getBooks = (req, res, next) => {
    models.Books.findAll().then
        ((result) => {
            res.json({
                result
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                success: false,
                message: 'Error occurred'
            })
        });
}

const getOneBook = (req, res, next) => {
    models.Books.findOne({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json({
            result
        })
    }).catch((err) => {
        console.log(err)
        res.json({
            success: false,
            message: 'Error occurred'
        })
    });
}

const updateBook = (req, res, next) => {
    const schema = Joi.object({

        price: Joi.number().integer().min(1).required(),
        quantity: Joi.number().integer().min(1).required()
    })
    const details = schema.validate(req.body)
    if (!details.error) {
        const payload = {
            price: req.body.price,
            quantity: req.body.quantity
        }

        models.Books.update(payload, {
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json({
                result
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                success: false,
                message: 'Error occurred'
            })
        });
    }
}

const deleteBook = (req, res, next) => {
    models.Books.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json({
            result
        })
    }).catch((err) => {
        console.log(err)
        res.json({
            success: false,
            message: 'Error occurred'
        })
    });
}

const copyBook = (req, res, next) => {
    models.Books.findOne({
        where: { id: req.params.id }
    }).then((foundBook) => {
        return models.Books.create({
            name: foundBook.name,
            author: foundBook.author,
            price: foundBook.price,
            quantity: foundBook.quantity
        })
    }).then(() => {
        res.json({
            success: true
        })
    }).catch(err => {
        next(err);
    })
}

module.exports = {
    addBooks,
    getBooks,
    getOneBook,
    updateBook,
    deleteBook,
    copyBook
}