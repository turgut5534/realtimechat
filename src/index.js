const express = require('express')
const http = require('http')
const port = process.env.PORT || 3000
const path = require('path')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const socketio = require('socket.io')
require('dotenv').config();
const auth = require('./middlewares/auth')

const User = require('./models/user')

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates')

app.use(express.json())
app.use(express.static(publicDirectory))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', viewsDirectory)

const server = http.createServer(app)
const io = socketio(server)

app.get('/login', (req,res) => {

    res.render('views/login')

})

app.post('/login', async(req,res) => {

    try {

        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).json({status:false, message: 'Please fill the fields'})
        }

        const user = await User.findOne( {where: { email:email } })

        if(!user) {
            return res.status(400).json({status:false, message: 'Incorrect email or password'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password.toString())

        if(!passwordMatch) {
            return res.status(400).json({status:false, message: 'Incorrect email or password'})
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '6h' })

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Logged in successfully', user: user })

    } catch(e){
        console.log(e)
    }

})

app.get('/register', (req,res) => {

    res.render('views/register')

})

app.post('/register', async(req,res) => {

    try {

        const { name, email, password, repassword } = req.body

        if(!name || !email || !password || !repassword) {
            return res.status(400).json({status: false, message: "Please fill all fields"})
        }

        if ( password != repassword) {
            return res.status(400).json({status: false, message: "Password does not match"})
        }

        const user = await User.findOne({ where: { email: email } })

        if(user) {
            return res.status(400).json({status: false, message: "A user with this email already exists"})
        }

        await User.create({
            name: name,
            email: email,
            password: await bcrypt.hash(password, 10)
        })
        
        return res.status(201).json({status: true, message: "You have been registered successfully!"})

    } catch(e) {
        console.log(e)
    }

})

app.get('/logout', (req, res) => {

    res.cookie('token', '', { expires: new Date(0) })
  
    res.redirect('/login')
  })

app.get('/me', auth, (req,res) => {
    
    res.send(req.user)
})

app.get('/chat', auth, (req,res) => {

    res.render('views/chat')

})

io.on('connection', (socket) => {

    console.log('A new socket has connected')

    socket.on('sendMessage', (message, callback) => {

        io.emit('message', message)
        callback()

    })

    socket.on('disconnect', () => {
        console.log('A user has left')
    })

})

server.listen(port, () => {
    console.log(`Server is up on ${port}`)
})