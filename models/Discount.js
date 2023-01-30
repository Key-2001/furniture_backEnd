const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    idDiscount: {
        type: String,
        required: [true, 'idDiscount must required!'],
        unique: [true, 'idDiscount must unique!']
    },
    valueDiscount: {
        type: String,
        required: [true, 'value discount must required!']
    },
    amountUse: {
        type: Number,
        required: [true, 'amount use must required']
    },
    email: {
        type: String
    }
})

module.exports = mongoose.model('Discount',DiscountSchema);