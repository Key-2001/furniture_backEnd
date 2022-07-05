const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true,'Name product must provided'],
        trim: true,
        unique: [true, 'Product is existed!']
    },
    price: {
        type: Number,
        required: [true,'Price product must provided'],
        trim: true,
    },
    images:[{
        filename: String,
        urlImg: Buffer,
        contentType:String
    }],
    colors:{
        type: Array,
        // required: [true,'Colors product must provided'],
        default: ['#000','#fff']
    },
    company:{
        type:String,
        required:[true,'Company product must provided'],
        trim: true
    },
    description:{
        type:String,
        required: [true,'Description product must provided'],
        trim: true
    },
    category:{
        type:String,
        required: [true,'Category product must provided'],
        trim: true
    },
    shipping:{
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('Product',ProductSchema)
