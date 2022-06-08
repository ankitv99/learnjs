const router = require('express').Router()
const Joi = require('joi')
const models = require('../models')


router.post('/', (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(200).required(),
        price: Joi.number().integer().min(1).required(),
        quantity: Joi.number().integer().min(1).required()
    })
    const details = schema.validate(req.body)
    if(!details.error){
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
})

router.get('/', (req, res, next) => {
    models.Books.findAll().then((result) => {
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
})

router.get('/:id', (req, res, next) => {
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
})

router.put('/:id', (req, res, next) => {
    const index = Number(req.params.id) - 1
    books[index].price = req.body.price
    books[index].quantity = req.body.quantity
    res.json({
        success: true,
        changedData: books[index]
    })
})

router.delete('/:id', (req, res, next) => {
    const index = Number(req.params.id) - 1
    books.splice(index, 1)
    res.json({
        success: true
    })
})


module.exports = router