const Category = require('mongoose').model('ProductCategory')


const create = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: 'Category name can not be empty'
        });
    }

    const category = new Category({
        name: req.body.name
    });

    try {
        await category.save()
        return res.status(201)
            .json({
                message: category
            })
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message || 'Some error occurred while creating the Category'
            })
    }
}


const findAll = async (req, res) => {
    try{
        const categories = await Category.find()
        return res.status(200)
            .json({
                message: categories
            })
    }catch(err){
        return res.status(500)
            .json({
                message: err.message || 'Some error occurred while retrieving the categories'
            })
    }

}

const findOne = async (req, res) => {
    try{
        const category = await Category.findById(req.params.categoryId)
        if(!category){
            return res.status(404)
                .json({
                    message: 'Category not found with id ' + req.params.categoryId
                })
        }

        res.status(200)
            .json({
                message: category
            })
    }catch(err){
        if (err.kind === 'ObjectId') {
            return res.status(404).json({
                message: 'Category not found with id ' + req.params.categoryId
            });
        }
        return res.status(500).json({
            message : 'Error retrieving category with id ' + req.params.categoryId
        });
    }
}

const deleteOne = async (req, res) => {
    try{
        const category = await Category.findByIdAndRemove(req.params.categoryId)
        if (!category) {
            return res.status(404).json({
                message: 'Category not found with id ' + req.params.categoryId
            });
        }
        return res.json({
            message: 'Category deleted successfully!'
        });
    }catch(err){
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        return res.status(500).json({
            message: "Could not delete category with id " + req.params.categoryId
        });
    }
}

const updateOne = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            message: 'req.body is empty'
        });
    }
    try{
        const category = await Category.findByIdAndUpdate(req.params.categoryId, {
                name: req.body.name
            }, {
                new: true
            })

        if (!category) {
            return res.status(404).json({
                message: "category not found with id " + req.params.categoryId
            });
        }
        return res.status(200)
            .json({
                message: category
            });
    } catch(err){
           if (err.kind === 'ObjectId') {
               return res.status(404).json({
                   message: "Category not found with id " + req.params.categoryId
               });
           }
           return res.status(500).json({
               message: "Error updating category with id " + req.params.categoryId
           });
       }
}




module.exports = {
    findAll,
    create,
    findOne,
    updateOne,
    deleteOne
}
