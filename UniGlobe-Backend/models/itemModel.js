const mongoose = require('mongoose')

const itemModel = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
})

const Item = mongoose.model('Item', itemModel)

module.exports = Item