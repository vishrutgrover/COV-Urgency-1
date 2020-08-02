const User = require('../models/userModel')
const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.json('Wrong email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) return res.json('Wrong email or password')

    const token = jwt.sign({ id: user._id, email: user.email }, 'uniglobe')
    res.header('x-auth-token', token).json(token)
})

router.post('/signup', async (req, res) => {
    let user = await User.findOne({email: req.body.email})
    if (user) return res.json('Email already in use')

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: password,
        orders: [],
        cart: [],
    })

    await user.save()
    const token = jwt.sign({ id: user._id, email: user.email}, 'uniglobe')
    res.header('x-auth-token', token).json(token)
})

module.exports = router