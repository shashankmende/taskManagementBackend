
const mongoose = require('mongoose')

const connectDb = async()=>{
    try {
        
        const uri = process.env.MONGO_URI
        mongoose.connect(uri)
        console.log("Connection to database is successful")



    } catch (error) {
        process.exit(1)
        console.log("Failed to connect to database")
    }
}

module.exports = connectDb