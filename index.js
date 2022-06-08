const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const apiHandler = require('./api')

app.use(bodyParser.json())


app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} is called at ${new Date().toLocaleString()}`)
    next()
})

app.use('/books', apiHandler)

app.use((error, req, res, next) => {
    console.log(error)
    res.json({
        success: false,
        error
    })
})


app.listen('8000', () => {
    console.log('server started')
})

