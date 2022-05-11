const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: [true, 'phone number must provided'],
        trim: true,
        maxlength: [10,'phone number can not be more than 10 characters']
    },
    name: {
        type: String,
        required: [true, 'name must provided'],
        trim: true,
        maxlength: [30, 'name can not be more than 30 characters']
    },
    email: {
        type: String,
        required: [true,'email must provided'],
        trim: true,
        maxlength: [30,'email can not be more than 30 characters']
    },
    address:{
        type: String,
        trim: true,
        maxlength:[50,'address can not be more than 50 characters'],
        default: ''
    },
    bank:{
        type:String,
        trim: true,
        default:''
    },
    creditCardNumber:{
        type: String,
        trim:true,
        default:''
    }
})

module.exports = mongoose.model('User',UserSchema)