const Order = require('../models/orderModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
    const orders = user.cart
    user.cart = []

    for (let i=0; i<orders.length; i++){
        let order = new Order({
            date: Date.now(),
            item: orders[i],
            address: req.body.address
        })
        user.orders.push(order._id)
        await order.save()
    }
    await user.save()

    res.json('Orders added successfully')
})

router.get('/', async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).populate({
        path: 'orders',
        populate: {
            path: 'item',
            model: 'Item'
        }
    })

    res.json(user.orders)
})

module.exports = router