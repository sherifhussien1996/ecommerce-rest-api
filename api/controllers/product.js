const Product = require('mongoose').model('Product')


const create = async (req, res) => {

    if (!req.body.name || !req.body.price || !req.body.categories) {
        return res.status(400).json({
            message: 'Product should have name, price, and categories'
        });
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        categories: req.body.categories
    });

    try {
        await product.save()
        return res.status(201)
            .json({
                message: product
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || 'Some error occurred while creating the Product'
            })
    }
}


const findAll = async (req, res) => {

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 10
    const category = req.query.category

    if (page <= 0) {
        return res.status(400).json({
            message: 'invalid page number, should start with 1'
        })
    }
    const query = {}
    query.skip = pageSize * (page - 1)
    query.limit = pageSize

    const filter = {}
    if(category){
        console.log(category)
    }


    try {
        const products = await Product.find(filter, {}, query).populate('categories')

        return res.status(200)
            .json({
                message: products
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || 'Some error occurred while retrieving the products'
            })
    }

}

const findOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('categories')
        if (!product) {
            return res.status(404)
                .json({
                    message: 'Product not found with id ' + req.params.productId
                })
        }

        res.status(200)
            .json({
                message: product
            })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: 'Product not found with id ' + req.params.productId
            });
        }
        return res.status(500).json({
            message: 'Error retrieving product with id ' + req.params.productId
        });
    }
}

const deleteOne = async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.productId)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found with id ' + req.params.productId
            });
        }
        return res.json({
            message: 'Product deleted successfully!'
        });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).json({
            message: "Could not delete product with id " + req.params.productId
        });
    }
}

const updateOne = async (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.categories) {
        return res.status(400).json({
            message: 'req.body is missing name, price, or categories'
        });
    }
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, {
            name: req.body.name,
            price: req.body.price,
            categories: req.body.categories
        }, {
            new: true
        }).populate('categories')

        if (!product) {
            return res.status(404).json({
                message: "product not found with id " + req.params.productId
            });
        }
        return res.status(200)
            .json({
                message: product
            });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Product not found with id " + req.params.productId
            });
        }
        return res.status(500).json({
            message: "Error updating product with id " + req.params.productId
        });
    }
}

const uploadImage = async (req, res) => {
    try {
        let product = await Product.findById(req.params.productId)

        if (!product) {
            return res.status(404).json({
                message: "product not found with id " + req.params.productId
            });
        }

        product = await Product.findByIdAndUpdate(req.params.productId, {
            images: product.images.concat(req.file.path)
        }, {
            new: true
        }).populate('categories')

        return res.status(200)
            .json({
                message: product
            });
    }catch(error){
        return res.status(500)
            .json(error)
    }
}

const filterByCategory = async (req, res) => {
    const category = req.body.category
    if(!category){
        res.status(400)
            .json({
                message: 'category not specified'
            })
    }

    try{
        const product = await Product.find({
            categories: category
        })

        return res.status(200)
            .json({
                message: product
            });
    }catch(err){
         return res.status(500)
             .json(err)
    }
    


}


module.exports = {
    findAll,
    create,
    findOne,
    updateOne,
    deleteOne,
    uploadImage,
    filterByCategory
}
