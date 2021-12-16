const mongoose = require('mongoose');

// create a new schema for recording user sign up information
const userSchema = new mongoose.Schema({
    // user login information
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
});
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;