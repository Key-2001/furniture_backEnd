const mongoose = require('mongoose');
const {isEmail} = require('validator')
const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'user name must provided'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'password must provided'],
        trim: true,
        minlength: [6, 'password need more than 6 characters']
    },
    email: {
        type: String,
        required: [true, 'email must provided'],
        trim: true,
        maxlength: [30, 'email can not be more than 30 characters'],
        validate: [isEmail,'Pls enter a valid email!']
    }
})

module.exports = mongoose.model('Admin',AdminSchema)