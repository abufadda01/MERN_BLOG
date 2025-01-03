const express = require("express")
const { register, login, googleAuth, googleAuthCallback, getLoggedUser, logout } = require("../controllers/user.controller")
const auth = require("../middlewares/auth")



const userRoute = express.Router()


userRoute.post("/register" , register)

userRoute.post("/login" , login)

userRoute.get("/logout" , logout)

userRoute.get("/auth/google" , googleAuth)

userRoute.get("/auth/google/callback" , googleAuthCallback)

userRoute.get("/" , auth , getLoggedUser)




module.exports = userRoute