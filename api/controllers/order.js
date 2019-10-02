const Order = require('mongoose').model('Order')
const Product = require('mongoose').model('Product')


const create = async (req, res) => {

    const order = new Order({
        user: req.user._id
    })

    try {
        await order.save()
        return res.status(201)
            .json({
                message: order
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || 'Some error occurred while creating the Order'
            })
    }
}


const findAll = async (req, res) => { 
    try {
        const orders = await Order.find({
            user: req.user._id
        }).populate('user')
        
        return res.status(200).json({
                message: orders
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || 'Some error occurred while retrieving the orders'
            })
    }

}

const findOne = async (req, res) => {
    try {
        const order = await Order.find({
            _id: req.params.orderId,
            user: req.user._id
        }).populate('user')
        if (!order || order.length==0) {
            return res.status(404)
                .json({
                    message: 'Order not found with id ' + req.params.orderId
                })
        }

        res.status(200)
            .json({
                message: order
            })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: 'Order not found with id ' + req.params.orderId
            });
        }
        return res.status(500).json({
            message: 'Error retrieving order with id ' + req.params.orderId
        });
    }
}

const deleteOne = async (req, res) => {
    try {
        const order = await Order.findOneAndRemove({
            _id: req.params.orderId,
            user: req.user._id
        })
        if (!order) {
            return res.status(404).json({
                message: 'order not found with id ' + req.params.orderId
            });
        }
        return res.json({
            message: 'Order deleted successfully!'
        });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).json({
            message: "Could not delete order with id " + req.params.orderId
        });
    }
}



const addProduct = async (req, res) => {
    const productId = req.body.productId

    if(!productId){
        return res.status(400)
            .json({
                message: 'productId is missing in the body'
            })
    }

    try {
        let p = await Product.findById(productId)
        let order = await Order.findById(req.params.orderId)

        if (!order) {
            return res.status(404).json({
                message: "order not found with id " + req.params.orderId
            });
        }

        if (!order.products.includes(productId)){
            order = await Order.findByIdAndUpdate(req.params.orderId, {
                products: order.products.concat(productId),
                total: order.total+p.price
            }, {
                new: true
            }).populate('user')

            return res.status(200)
                .json({
                    message: order
                });
        }

        return res.status(400)
            .json({
                message: 'product already included!!'
            })

    } catch (error) {
        return res.status(500)
            .json(error)
    }


}


const removeProduct = async (req, res) => {
    const productId = req.body.productId

    if (!productId) {
        return res.status(400)
            .json({
                message: 'productId is missing in the body'
            })
    }

    try {
        let p = await Product.findById(productId)
        let order = await Order.findById(req.params.orderId)
        if (!order) {
            return res.status(404).json({
                message: "order not found with id " + req.params.orderId
            });
        }
        if (order.products.includes(productId)) {
            order = await Order.findByIdAndUpdate(req.params.orderId, {
                products: order.products.filter((value)=>{
                    return value != productId
                }),
                total: order.total - p.price
            }, {
                new: true
            }).populate('user')

            return res.status(200)
                .json({
                    message: order
                });
        }
        return res.status(400)
            .json({
                message: 'product not included'
            })

    } catch (error) {
        return res.status(500)
            .json(error)
    }


}


module.exports = {
    findAll,
    create,
    findOne,
    deleteOne,
    addProduct,
    removeProduct
}
