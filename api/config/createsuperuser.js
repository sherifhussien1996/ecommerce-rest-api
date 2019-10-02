const User = require('mongoose').model('User')


const createSuperUser = async () => {
    const name = process.env.SUPER_USER_NAME
    const email = process.env.SUPER_USER_EMAIL
    const password = process.env.SUPER_USER_PASSWORD
    

    let user = await User.findOne({
        email: email
    })

    if(!user){
        user = new User({
            name: name,
            email: email,
            password: password,
            role: 'admin'
        })

        user.save()
    }
}

createSuperUser()