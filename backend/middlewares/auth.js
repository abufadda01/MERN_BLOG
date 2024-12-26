const jwt = require("jsonwebtoken")
const User = require("../models/User")
const createError = require("../utils/createError")



const auth = async (req , res , next) => {

    try {
        
        const token = req.cookies["token"]

        if(!token){
            return next(createError("Not Authorized" , 401))
        }

        jwt.verify(token , process.env.JWT_SECRET , async (err , decodedToken) => {

            if(err){
                return next(createError("Access Forbiden" , 403))
            }

            const user = await User.findById(decodedToken.userId).select("-password")

            if(!user){
                return next(createError("User not exist" , 404))
            }

            req.user = user
            
            next()

        })

    } catch (error) {
        next(error)
    }
}





module.exports = auth