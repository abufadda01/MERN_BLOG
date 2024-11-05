const mongoose = require("mongoose")


const earningSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users" ,
        required : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "posts" ,
        required : true
    },
    amount : {
        type : Number ,
        required : true
    },
    calculateOn : {
        type : Date ,
        default : Date.now
    }
} , {timestamps : true})



const Earning = mongoose.model("earnings" , earningSchema)


module.exports = Earning