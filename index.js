const express = require('express')
const app = express()
const models = require('./models')

const bodyParser = require('body-parser')

app.use(bodyParser.json())

// post -> book name, author, price, quantity

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} is called at ${new Date().toLocaleString()}`)
    next()
})

app.post('/', (req, res, next) => {
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
        console.log(err)
        res.json({
            success: false,
            message: 'Error occurred'
        })
    });
})

app.get('/', (req, res, next) => {
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

app.get('/:id', (req, res, next) => {
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

app.put('/:id', (req, res, next) => {
    const index = Number(req.params.id) - 1
    books[index].price = req.body.price
    books[index].quantity = req.body.quantity
    res.json({
        success: true,
        changedData: books[index]
    })
})

app.delete('/:id', (req, res, next) => {
    const index = Number(req.params.id) - 1
    books.splice(index, 1)
    res.json({
        success: true
    })
})


app.listen('8000', () => {
    console.log('server started')
})

