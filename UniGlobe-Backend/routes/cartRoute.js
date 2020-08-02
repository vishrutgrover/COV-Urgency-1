const Order = require('../models/orderModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()

router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
    user.cart.push(req.body.itemId)
    await user.save()
    res.json('Cart updated successfully')
})

router.delete('/:id', async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
    index = user.cart.findIndex(item => item._id.toString() === req.params.id.toString())
    if (index === -1) return res.json('Item with given id not found')
    user.cart.splice(index, 1)
    await user.save()
    res.json('Cart item removed successfully')
})

router.get('/', async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).populate({
        path: 'cart'
    })
    res.json(user.cart)
})

module.exports = router