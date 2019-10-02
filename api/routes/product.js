const productController = require('../controllers/product')
const auth = require('../middlewares/auth')
const permission = require('../middlewares/permission')
const upload = require('../config/multer')

const router = require('express').Router()

router.use((req, res, next) => {
    console.log('Product Category Router...')
    next()
})

router.route('/')
    .get(productController.findAll)
    .post(auth, permission, productController.create)

router.route('/filter')
    .get(productController.filterByCategory)

router.route('/:productId')
    .get(auth, permission, productController.findOne)
    .put(auth, permission, productController.updateOne)
    .delete(auth, permission, productController.deleteOne)

router.route('/:productId/upload')
    .post(auth, permission, upload.single('productImage'), productController.uploadImage)


module.exports = router