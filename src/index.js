const express = require('express')
const http = require('http')
const port = process.env.PORT || 3000
const path = require('path')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const User = require('./models/user')

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates')

app.use(express.json())
app.use(express.static(publicDirectory))
// app.use(cookieParser)

app.set('view engine', 'ejs')
app.set('views', viewsDirectory)

const server = http.createServer(app)

app.get('/login', (req,res) => {

    res.render('views/login')

})


app.get('/register', (req,res) => {

    res.render('views/register')

})

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})