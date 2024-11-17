const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true
    },
    profilePic : {
        type : Object ,
        default : null
    },
    email : {
        type : String ,
        required : false
    },
    password : {
        type : String ,
        required : false
    },
    googleId : {
        type : String ,
        required : false
    },
    authMethod : {
        type : String ,
        required : true ,
        enum : ["google" , "local" , "facebook" , "github"] ,
        default : "local"
    },
    passwordResetToken : {
        type : String ,
        default : null
    },
    accountVerificationToken : {
        type : String ,
        default : null
    },
    accountVerificationExpires : {
        type : Date ,
        default : null
    },
    passwordResetExpires : {
        type : Date ,
        default : null
    },
    posts : [{type : mongoose.Schema.Types.ObjectId , ref : "posts"}] ,
    totalEarnings : {type : Number , default : 0} ,
    nextEarningDate : {
        type : Date ,
        default : () => new Date(new Date().getFullYear() , new Date().getMonth() + 1 , 1) // default value to be the first day of the next month
    },
    plan : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "plans"
    },
    isEmailVerified : {
        type : Boolean ,
        default : false
    },
    payments : [{type : mongoose.Schema.Types.ObjectId , ref : "payments"}] ,
    hasSelectedPlan : {type : Boolean , default : false} ,
    lastLogin : {type : Date , default : Date.now} ,
    followers : [{type : mongoose.Schema.Types.ObjectId , ref : "users"}] ,
    following : [{type : mongoose.Schema.Types.ObjectId , ref : "users"}] ,
} , { timestamps : true})



userSchema.pre("save" , async function(next){

    if(!this.isModified("password")){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password , salt)
    this.password = hashedPassword
})



const User = mongoose.model("users" , userSchema)


module.exports = User