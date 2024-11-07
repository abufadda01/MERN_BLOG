const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")


// configure the passport local storage
passport.use(
    new LocalStrategy({
        usernameField : "username" // username / email
    } , 
    async (username , password , done) => {
        try {
            const user = await User.findOne({username})
        } catch (error) {
            
        }
    })
)