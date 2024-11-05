const Post = require("../models/Post")
const Joi = require("joi")
const createError = require("../utils/createError")
const mongoose = require("mongoose")



const createPost = async (req , res , next) => {

    const createPostSchema = Joi.object({
        title : Joi.string().min(5).optional() ,
        description : Joi.string().min(5).required()
    })

    const {value , error} = createPostSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid new post credentials" , 400))
    }

    const {title , description} = value

    try {
        
        console.log(req.file)

        const isPostExist = await Post.findOne({title})

        if(title && isPostExist){ 
            return next(createError("post already exist" , 400))
        }
        
        const newPost = new Post({
            description ,
            image : req.file
        })

        await newPost.save()

        res.status(201).json(newPost)

    } catch (error) {
        next(error)
    }

}




const getAllPosts = async (req , res , next) => {

    const getPostsQuerySchema = Joi.object({
        page : Joi.number().default(1).optional() ,
    })

    const {value , error} = getPostsQuerySchema.validate(req.query , {abortEarly : false})

    if(error){
        return next(createError("Invalid posts query" , 400))
    }

    const {page} = value

    try {
        
        const limit = 10
        const skip = (page - 1) * limit

        const posts = await Post.find().skip(skip).limit(limit)
        
        const totalPosts = await Post.countDocuments() 

        res.status(200).json({
            posts,
            page ,
            totalPosts ,
            totalPages : Math.ceil(totalPosts / limit)  ,
        })

    } catch (error) {
        next(error)
    }

}




const getPost = async (req , res , next) => {

    const {postId} = req.params

    if(!mongoose.isValidObjectId(postId)){
        return next(createError("Invalid post id format" , 400))
    }
    
    try {
        
        const post = await Post.findById(postId)

        if(!post){
            return next(createError("post not exist" , 404))
        }

        res.status(200).json(post)

    } catch (error) {
        next(error)
    }

}




const updatePost = async (req , res , next) => {

    const {postId} = req.params

    if(!mongoose.isValidObjectId(postId)){
        return next(createError("Invalid post id format" , 400))
    }
    
    const updatePostSchema = Joi.object({
        title : Joi.string().min(5).required() ,
        description : Joi.string().min(5).required()
    })

    const {value , error} = updatePostSchema.validate(req.body , {abortEarly : false})

    if(error){
        return next(createError("Invalid new post credentials" , 400))
    }

    const {title , description} = value

    try {
        
        const updatedPost = await Post.findByIdAndUpdate(postId , {
            title ,
            description
        } , {
            new: true, 
            runValidators: true
        })
        
        res.status(200).json(updatedPost);

    } catch (error) {
        next(error)
    }

}




const deletePost = async (req , res , next) => {

    const {postId} = req.params

    if(!mongoose.isValidObjectId(postId)){
        return next(createError("Invalid post id format" , 400))
    }
    
    try {
        
        const post = await Post.findById(postId)

        if(!post){
            return next(createError("post not exist" , 404))
        }

        await Post.findByIdAndDelete(postId)

        res.status(200).json({msg : "post deleted successfully"})
    }
     catch (error) {
        next(error)    
    }

}





module.exports = {createPost , getAllPosts , updatePost , getPost , deletePost} 