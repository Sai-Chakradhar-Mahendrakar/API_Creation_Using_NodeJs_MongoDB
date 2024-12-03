const mongoose = require('mongoose')

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

module.exports = mongoose.model('User', userSchema);