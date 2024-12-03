const express = require('express')
const mongoose = require('mongoose')
const ExpressError = require('./utils/ExpressError');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json())

// Connecting to Database
const connectionURL = "mongodb://localhost:27017/usersdb"

mongoose.connect(connectionURL)
const connection = mongoose.connection

connection.on('open', (err)=>{
    if(err){
        console.log('Error in Connecting the database')
    }
    console.log('Connected to database')
})

// CRUD Operations

app.use('/users', require('./controllers/UserControllers'))

app.get('/', (req, res)=>{
    res.status(200).send({message: 'Connected to demo User application'})
})

app.all('*', (req, res, next)=>{
    next(new ExpressError(`Cannot find ${req.originalUrl} on this server!`, 404));
})

app.use(errorHandler)

app.listen(3000, (req, res)=>{
    console.log('Server is Started')
})

