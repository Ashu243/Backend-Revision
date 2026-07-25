const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/taskAPI")
        console.log('mongodb connected successfully')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB