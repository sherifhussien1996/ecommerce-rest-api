const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const data = jwt.verify(token, process.env.JWT_KEY)

        const user = await User.findOne({_id: data._id})

        if (!user) {
            return res.status(401).json({
                'message': 'UNAUTHORIZED'
            })
        }
        
        req.user = user
        next()

    } catch (err) {
        return res.status(401).json({
            'message': 'UNAUTHORIZED'
        })
    }

}
module.exports = auth