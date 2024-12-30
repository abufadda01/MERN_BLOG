const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : false ,
        trim : true
    },
    description : {
        type : String ,
        required : true ,
        trim : true
    },
    image : {
        type : Object
    },
    author : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users" ,
        required : true
    },
    nextEarningDate : {
        type : Date ,
        default : () => new Date(new Date().getFullYear() , new Date().getMonth() + 1 , 1) // default value to be the first day of the next month
    },
    thisMonthEarnings : {
        type : Number ,
        default : 0
    },
    totalEarnings : {
        type : Number ,
        default : 0
    },
    category : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "categories" ,
        required : true ,
    },
    viewsCount : {
        type : Number ,
        default : 0
    },
    likes : [{type : mongoose.Schema.Types.ObjectId , ref : "users"}] ,
    dislikes : [{type : mongoose.Schema.Types.ObjectId , ref : "users"}] ,
    viewers : [{type : mongoose.Schema.Types.ObjectId , ref : "users"}] ,
    comments : [{type : mongoose.Schema.Types.ObjectId , ref : "comments"}] ,
    isBlocked : {type : Boolean , default : false}
} , {timestamps : true})



const Post = mongoose.model("posts" , postSchema)


module.exports = Post