const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Successfully connected to the database`)
    })
    .catch((err) => {
        console.error('Could not connect to the database', err)
        process.exit();
    })