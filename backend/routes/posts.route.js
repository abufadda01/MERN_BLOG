const express = require("express")
const multer = require("multer")
const storage = require("../utils/fileUpload")

const { 
    createPost , 
    getAllPosts , 
    updatePost, 
    getPost, 
    deletePost
 } = require("../controllers/posts.controller")
const auth = require("../middlewares/auth")


const upload = multer({storage})

const postsRoute = express.Router()


postsRoute.post("/create" , auth , upload.single("image") , createPost)

postsRoute.get("/" , auth , getAllPosts)

postsRoute.get("/:postId" , auth , getPost)

postsRoute.put("/:postId" , auth , updatePost)

postsRoute.delete("/:postId" , auth , deletePost)


module.exports = postsRoute