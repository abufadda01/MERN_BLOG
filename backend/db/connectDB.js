const mongoose = require("mongoose")


const connectDB = async () => {  
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("BLOG DATABASE CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log(`FAILED IN CONNECTION TO THE DATABASE`)
        process.exit(1)   
    }
}


module.exports = connectDB