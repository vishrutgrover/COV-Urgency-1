const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Item = require('../models/itemModel')
const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price
    })
    await item.save()
    res.json('Item added successfully')
})

router.get('/', async (req, res) => {
    const items = await Item.find()
    res.json(items)
})

module.exports = router