const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'unshipped', 'canceled']
    },
    total: {
        type: Number,
        default: 0
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]

}, {
    timestamp: true
})


mongoose.model('Order', orderSchema)