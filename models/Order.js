const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    idUser: {
        type: String, 
        required: [true, 'idUser is required!'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Name employee is required!'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required!'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required!'],
        trim: true
    },
    note: {
        type: String,
        default: ""
    },
    paymentType: {
        paymentTypeDetail: {
            type: String,
            required: [true, 'required!'],
            trim: true
        },
        numberBank:{
            type: String,
            default: ""
        }
    },
    products: [
        {
            idProduct: {
                type: String,
                required: [true, 'idProduct is required!'],
                trim: true
            },
            amount: {
                type: Number,
                required: [true, 'amount product is required!']
            },
            color: {
                type: String,
                required: [true, 'color product is required!'],
                trim: true
            },
            price: {
                type: Number,
                required: [true, 'price product is required!']
            }
        }
    ],
    discountCode: {
        type: String,
        default: ""
    },
    totalPrice: {
        type: Number,
        required: [true, 'total price order is required!']
    },
    status: {
        type: String,
        default: '01'
    },
    paymentStatus: {
        type: String,
        default: '01'
    }
})

module.exports = mongoose.model('Order',OrderSchema);