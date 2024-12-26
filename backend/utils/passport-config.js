const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const JWTStrategy = require("passport-jwt").Strategy // strategy for jwt
const ExtractJwt = require("passport-jwt").ExtractJwt // extract for jwt

const GoogleStrategy = require("passport-google-oauth20")

const User = require("../models/User")
const bcrypt = require("bcrypt")

const dotenv = require("dotenv")

dotenv.config()



// configure the passport local storage
passport.use(
    new LocalStrategy({
        usernameField : "username" // username / email / ....
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




// GOOGLE OAUTH
passport.use(
    new GoogleStrategy({
        clientID : process.env.GOGGLE_CLIENT_ID ,
        clientSecret : process.env.GOGGLE_SECRET_ID ,
        callbackURL : "http://localhost:5500/api/v1/users/auth/google/callback"
    } , async (accessToken , refreshToken , profile , done) => {
        try {

            let user = await User.findOne({
                googleId : profile.id
            })

            const {id , displayName , name , _json : {picture}} = profile

            let email = ""

            if(Array.isArray(profile?.emails) && profile?.emails?.length > 0){
                email = profile.emails[0].value
            }

            if(!user){

                user = new User({
                    username : displayName ,
                    googleId : id ,
                    profilePic : picture ,
                    authMethod : "google" ,
                    email
                })

                await user.save()

            }

            done(null , user)

        } catch (error) {
            return done(error)
        }
    })

)




// JWT-Options
const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromExtractors([(req) => {
        let token = null
        if(req && req.cookies){
            token = req.cookies["token"]
            return token
        }
    }]),
    secretOrKey : process.env.JWT_SECRET
}




// JWT
passport.use(
    new JWTStrategy(jwtOptions , async (jwt_payload , done) => {
        try {

            const user = await User.findById(jwt_payload.userId)

            if(!user){
                return done(null , false)
            }

            return done(null , user)
        
        } catch (error) {
            return done(error)
        }
    })
)






module.exports = passport


