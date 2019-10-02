const orderController = require('../controllers/order')
const auth = require('../middlewares/auth')
const permission = require('../middlewares/permission')

const router = require('express').Router()

router.use((req, res, next) => {
    console.log('Order Router...')
    next()
})

router.route('/')
    .get(auth, orderController.findAll)
    .post(auth, orderController.create)

router.route('/:orderId')
    .get(auth, orderController.findOne)
    .delete(auth, orderController.deleteOne)

router.route('/:orderId/add')
    .put(auth, orderController.addProduct)

router.route('/:orderId/remove')
    .put(auth, orderController.removeProduct)

module.exports = router