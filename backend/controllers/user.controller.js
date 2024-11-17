const User = require("../models/User")
const createError = require("../utils/createError")
const passport = require("passport")
const jwt = require("jsonwebtoken")



const register = async (req , res , next) => {

    const {email , username , password} = req.body

    try {
        
        const isUserExist = await User.findOne({username , email})

        if(isUserExist){
            return next(createError("User already exist" , 400))
        }

        const newUser = new User({
            email ,
            username ,
            password
        })
        
        await newUser.save()

        newUser.password = undefined

        res.status(201).json(newUser)

    } catch (error) {
        next(error)
    }

}




const login = async (req , res , next) => {

    try {
        
        passport.authenticate("local" , (err , user , info) => {

            if(err){
                return next(err)
            }

            if(!user){
                return res.status(400).json({message : info.message})
            }

            const token = jwt.sign({userId : user?._id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRE})

            res.cookie("token" , token , {
                httpOnly : true ,
                secure : false ,
                sameSite : "strict" ,
                maxAge : 24 * 60 * 60 * 1000
            })

            user.password = undefined

            res.status(200).json(user)

        })(req , res , next)

    } catch (error) {
        next(error)
    }

}





module.exports = {register , login}