const mongoose = require('mongoose')

const orderModel = new mongoose.Schema({
    date: Date,
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    address: String
})

const Order = mongoose.model('Order', orderModel)

module.exports = Order