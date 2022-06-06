const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())


// respond with "hello world" when a GET request is made to the homepage
app.use((req, res, next) => {
    console.log('This api is called at ', new Date().toLocaleString())
    next()
})

app.get('/', (req, res, next) => {
    res.json({
        data: 'hello world'
    })
})

app.use((req, res, next) => {
    console.log('This middleware will be called for /test only')
    next()
})


app.get('/test', (req, res, next) => {
    res.send('hello world with test')
})

app.listen('8000', () => {
    console.log('server started')
})

