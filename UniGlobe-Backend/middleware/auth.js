const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
    let token = req.header('x-auth-token')
    if(!token) return res.status(401).json('No token provided')
    try{
        const decoded_token = jwt.verify(token, 'uniglobe')
        req.user = decoded_token
        next()
    } catch(err) {
        res.status(400).json('Token is invalid')
    }
}

module.exports = auth