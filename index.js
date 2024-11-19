const express = require('express')
const mongoose = require('mongoose')

const app = express();

// Middleware
app.use(express.json())

// Database Schema creation of collections
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    dob:{
        type: Date
    }
})

// Creating collection
const User = new mongoose.model('User', userSchema);

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

// Creating the Users
app.post('/createUsers', async (req,res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(500).send(err)
    }
})

// Fetch the Users
app.get('/users', async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).send(users)
    } catch(err){
        res.status(500).send({ error: err.message })
    }
})

// Update the user
app.patch('/updateUsers/:id', async(req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdated = ['name', 'email', 'dob'];
    const isValidOperations = updates.every(
        (update) => allowedUpdated.includes(update)
    )

    if(!isValidOperations){
        res.status(400).send({error: 'Invalid Operations'})
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body
        )
        if(!updatedUser){
            res.status(404).send({error: 'User not Found'})
        }
        res.status(200).send(updatedUser)
    } catch(err){
        res.status(500).send({error: err.message})
    }
})

// Delete the User
app.delete('/delete/:id', async (req, res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(
            req.params.id
        )
        if(!deletedUser){
            res.status(404).send({error: 'User not Found'})
        }
        res.status(200).send({ 
            message: 'User deleted successfully', 
            user: deletedUser 
        });
    } catch(err){
        res.status(500).send({error: err.message})
    }
})

app.listen(3000, (req, res)=>{
    console.log('Server is Started')
})

