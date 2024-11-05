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


const upload = multer({storage})

const postsRoute = express.Router()


postsRoute.post("/create" , upload.single("image") , createPost)

postsRoute.get("/" , getAllPosts)

postsRoute.get("/:postId" , getPost)

postsRoute.put("/:postId" , updatePost)

postsRoute.delete("/:postId" , deletePost)


module.exports = postsRoute