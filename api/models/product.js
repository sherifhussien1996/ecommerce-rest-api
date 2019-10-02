const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    price: {
        type: Number,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    }],
    images: [{
        type: String
    }]
}, {
    timestamps: true
})


mongoose.model('Product', productSchema)