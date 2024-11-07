const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")
const bcrypt = require("bcrypt")


// configure the passport local storage
passport.use(
    new LocalStrategy({
        usernameField : "username" // username / email
    } , 
    async (username , password , done) => {
        try {

            const user = await User.findOne({username})
            
            if(!user){
                return done(null , false , {message : "No user with that username"})
            }

            const isPasswordMatch = await bcrypt.compare(password , user.password)

            if(!isPasswordMatch){
                return done(null , false , {message : "Invalid login credentials"})
            }

            return done(null , user)

        } catch (error) {
            return done(error)
        }

    })
)



module.exports = passport


