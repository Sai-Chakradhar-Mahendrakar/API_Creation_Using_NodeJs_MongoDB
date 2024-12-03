const express = require('express')
const router = express.Router()
const User = require('../model/User'); // For Schema
const validateUser = require('../middleware/validateUser');
const catchAsync = require('../utils/catchAsync');

router.use(express.json())

// Creating the Users
router.post('/createUsers', validateUser, catchAsync(async (req,res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(500).send(err)
    }
}))

// Fetch the Users
router.get('/users', async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).send(users)
    } catch(err){
        res.status(500).send({ error: err.message })
    }
})


// Update the user
router.patch('/updateUsers/:id', async(req, res)=>{
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
router.delete('/delete/:id', async (req, res)=>{
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


module.exports = router