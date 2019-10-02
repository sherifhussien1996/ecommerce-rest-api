const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validator: (value) => {
            if(!validator.isEmail(value)){
                throw new Error({error: 'Invalid email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    is_active: {
        type: Boolean,
        default : true
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
    next()
})

userSchema.methods.generateAuthToken = function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({
        _id: user._id,
        role: user.role
    }, process.env.JWT_KEY, {expiresIn: "1d"})

    return token 
}

module.exports = mongoose.model('User', userSchema)