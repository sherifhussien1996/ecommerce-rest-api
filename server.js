const express = require('express')
const app = express()
const cors = require('cors')


require('dotenv').config()

// config database
require('./api/config/db')
// load models
require('./api/models/user')
require('./api/models/category')
require('./api/models/product')
require('./api/models/order')
// create superuser(admin)
require('./api/config/createsuperuser')

const userRoute = require('./api/routes/user')
const categoryRoute = require('./api/routes/category')
const productRoute = require('./api/routes/product')
const orderRoute = require('./api/routes/order')

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/users', userRoute)
app.use('/api/product-category', categoryRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)



const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})