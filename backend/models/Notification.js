const mongoose = require("mongoose")


const notificationSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users" ,
        required : true
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "posts" ,
    } ,
    message : {
        type : String ,
        required : true
    },
    isRead : {
        type : Boolean ,
        default : false
    }
} , {timestamps : true})



const Notification = mongoose.model("notifications" , notificationSchema)


module.exports = Notification