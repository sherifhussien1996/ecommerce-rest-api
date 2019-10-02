const userController = require('../controllers/user')
const auth = require('../middlewares/auth')
const permission = require('../middlewares/permission')


const router = require('express').Router()

router.use((req, res, next) => {
    console.log('User Router...')
    next()
})

router.route('/login')
    .post(userController.login)

router.route('/register')
    .post(userController.createUser)


// Admin    
router.route('/')
    .get(auth, permission, userController.getUsers)

router.route('/admin')
    .post(auth, permission, userController.createAdmin)

router.route('/activate')
    .put(auth, permission, userController.activateUser)

router.route('/deactivate')
    .put(auth, permission, userController.deactivateUser)

router.route('/:userId/orders/')
    .get(auth, permission, userController.findUserOrders)

router.route('/:userId/orders/:orderId/status')
    .put(auth, permission, userController.changeOrderStatus)

// for dev only to be deleted
router.route('/delete')
    .get(auth, permission, userController.deleteUsers)

module.exports = router