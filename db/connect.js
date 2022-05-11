const mongoose = require('mongoose')


const connectDB = (url) => {
    console.log('Connect is successful');
    return mongoose
        .connect(url)
}

module.exports = connectDB

    