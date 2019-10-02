const categoryController = require('../controllers/category')
const auth = require('../middlewares/auth')
const permission = require('../middlewares/permission')

const router = require('express').Router()

router.use((req, res, next) => {
    console.log('Product Category Router...')
    next()
})

router.route('/')
    .get(categoryController.findAll)
    .post(auth, permission, categoryController.create)

router.route('/:categoryId')
    .get(auth, permission, categoryController.findOne)
    .put(auth, permission, categoryController.updateOne)
    .delete(auth, permission, categoryController.deleteOne)


module.exports = router