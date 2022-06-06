const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

const books = []

// post -> book name, author, price, quantity

app.post('/', (req, res, next) => {
    const payload = {
        id: books.length + 1,
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        quantity: req.body.quantity
    }
    books.push(payload)
    res.json({
        success: true
    })
})

app.get('/', (req, res, next) => {
    res.json(books)
})


app.listen('8000', () => {
    console.log('server started')
})

