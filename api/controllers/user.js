const User = require('mongoose').model('User')
const Order = require('mongoose').model('Order')
const bcrypt = require('bcryptjs')


const login = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(400).json({
            'error': 'Invalid login credentials'
        })
    }

    if (!user.is_active) {
        return res.status(400).json({
            'error': 'Invalid login credentials'
        })
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch) {
        res.status(400).json({
            'error': 'Invalid login credentials'
        })
    }

    const token = user.generateAuthToken()
    return res.status(200).json({
        user,
        token
    })
}


const createUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        await user.save()
        const token = user.generateAuthToken()

        return res.status(201).json({
            user,
            token
        })
    } catch (err) {
        return res.status(400).json(err)
    }
}


const createAdmin = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    if(!name || !email || !password){
        return res.status(400)
            .json({
                'message': 'Bad Request'
            })
    }

    const admin = new User({
        name,
        email,
        password,
        role: 'admin'
    })

    try{
        await admin.save()
        return res.status(201)
            .json({
                'message': admin
            })
    }catch(err){
        return res.status(400)
            .json({
                'message': 'Bad Request'
            })
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await User.find({
            role: 'user'
        });

        return res.status(200)
            .json({
                'message': users
            })

    }catch(err){
        return res.status(400)
            .json({
                'message': 'Bad Request'
            })
    }
}


const activateUser = async (req, res) => {
    try {
        const user = await User.findById(req.body._id)
        user.is_active = true
        await user.save()

        return res.status(200)
            .json({
                'message': user
            })
    } catch (err) {
        return res.status(400)
            .json({
                'message': 'unable to activate user'
            })
    }
}


const deactivateUser = async (req, res) => {
    try{
        const user = await User.findById(req.body._id)
        user.is_active = false
        await user.save()

        return res.status(200)
            .json({
                'message': user
            })
    } catch(err){
        return res.status(400)
            .json({
                'message': 'unable to deactivate user'
            })
    }
}

const findUserOrders = async (req, res) => {
    try {
        const order = await Order.find({
            user: req.params.userId
        }).populate('user', 'products')
        if (!order || order.length == 0) {
            return res.status(404)
                .json({
                    message: 'Order not found for user id ' + req.params.userId
                })
        }
        res.status(200)
            .json({
                message: order
            })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: 'Order not found for user id ' + req.params.userId
            });
        }
        return res.status(500).json({
            message: 'Error retrieving order for user id ' + req.params.userId
        });
    }
}


const changeOrderStatus = async (req, res) => {
    if (!req.body.status) {
        return res.status(400).json({
            message: 'status is not specified'
        });
    }
    try {
        const order = await Order.findOneAndUpdate({
            _id: req.params.orderId,
            user: req.params.userId
        }, {
            status: req.body.status
        }, {
            new: true
        })

        if (!order) {
            return res.status(404).json({
                message: "order not found with id " + req.params.orderId
            });
        }
        return res.status(200)
            .json({
                message: order
            });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).json({
            message: "Error updating order with id " + req.params.orderId
        });
    }
}

// just for dev
const deleteUsers = async (req, res) => {
    await User.deleteMany({})
    
    return res.status(200).json({
        'message': 'all users are deleted'
    })
}

module.exports = {
    login,
    createUser,
    createAdmin,
    getUsers,
    activateUser,
    deactivateUser,
    findUserOrders,
    changeOrderStatus,

    deleteUsers
}
