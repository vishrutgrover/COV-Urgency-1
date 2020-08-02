const mongoose = require('mongoose')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')
const itemRoute = require('./routes/itemRoute')
const cartRoute = require('./routes/cartRoute')
const auth = require('./middleware/auth')


process.on('uncaughtException', (err) => {
    console.error(err)
})
process.on('unhandledRejection', (err) => {
    console.error(err)
})

mongoose.connect('mongodb+srv://uniglobe:uniglobepassword@uniglobe.9alob.mongodb.net/UniGlobe?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => {
    console.error(err)
    process.exit(1)
})

const app = express()


app.use(cors())
app.use(helmet())
app.use(express.json())
app.use('/api/user', userRoute)
app.use('/api/order', auth, orderRoute)
app.use('/api/cart', auth, cartRoute)
app.use('/api/item', itemRoute)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))