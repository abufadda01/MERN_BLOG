const mongoose = require("mongoose")


const commentSchema = new mongoose.Schema({
    content : {
        type : String ,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users" ,
        required : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "posts" ,
        required : true
    }
} , {timestamps : true})



const Comment = mongoose.model("comments" , commentSchema)


module.exports = Comment