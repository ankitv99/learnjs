const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

let books = [
    {
        "id": 1,
        "name": "Maths",
        "author": "RD sharma",
        "price": 300,
        "quantity": 5
    },
    {
        "id": 2,
        "name": "Physics",
        "author": "HC verma",
        "price": 300,
        "quantity": 5
    },
    {
        "id": 3,
        "name": "Maths",
        "author": "RD sharma",
        "price": 300,
        "quantity": 5
    },
    {
        "id": 4,
        "name": "Physics",
        "author": "HC verma",
        "price": 300,
        "quantity": 5
    },
    {
        "id": 5,
        "name": "Maths",
        "author": "RD sharma",
        "price": 300,
        "quantity": 5
    },
    {
        "id": 6,
        "name": "Physics",
        "author": "HC verma",
        "price": 300,
        "quantity": 5
    }
]

// post -> book name, author, price, quantity

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} is called at ${new Date().toLocaleString()}`)
    next()
})

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

app.get('/:id', (req, res, next) => {
    const book = books.find(eachBook => eachBook.id == req.params.id)
    res.json({
        data: book
    })
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

