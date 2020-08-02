const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    phoneNumber: String,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
})

const User = mongoose.model('User', userModel)

module.exports = User