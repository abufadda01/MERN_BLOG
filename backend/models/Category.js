const mongoose = require("mongoose")


const categorySchema = new mongoose.Schema({
    categoryName : {
        type : String ,
        required : true
    },
    description : {
        type : String
    },
    posts : [{type : mongoose.Schema.Types.ObjectId , ref : "posts"}] ,
    author : {type : mongoose.Schema.Types.ObjectId , ref : "users"}
} , {timestamps : true})


const Category = mongoose.model("categories" , categorySchema)


module.exports = Category