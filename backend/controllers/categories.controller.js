const Post = require("../models/Post")
const Category = require("../models/Category")
const Joi = require("joi")
const createError = require("../utils/createError")
const mongoose = require("mongoose")



const createCategory = async (req , res , next) => {

    try {
        
        const {categoryName , description} = req.body

        if(!categoryName){
            return next(createError("Category name is required" , 400))
        }

        const isCategoryExist = await Category.findOne({categoryName})

        if(isCategoryExist){
            return next(createError("Category already exist" , 400))
        }

        const newCategory = new Category({
            categoryName ,
            author : req.user._id
        })

        await newCategory.save()

        res.status(201).json(newCategory)


    } catch (error) {
        next(error)
    }

}




const getAllCategories = async (req , res , next) => {

    try {
        
       const categories = await Category.find()

       res.status(200).json(categories)

    } catch (error) {
        next(error)
    }

}




const getSingleCategory = async (req , res , next) => {

    try {
        
       const {categoryId} = req.params

       if(!categoryId){
            return next(createError("Category id not provided" , 400))
       }

       const category = await Category.findById(categoryId)

       if(!category){
            return next(createError("Category not exist" , 404))
       }

       res.status(200).json(category)

    } catch (error) {
        next(error)
    }

}




const deleteCategory = async (req , res , next) => {

    try {
        
       const {categoryId} = req.params

       if(!categoryId){
            return next(createError("Category id not provided" , 400))
       }

       await Category.findByIdAndDelete(categoryId)

       res.status(200).json({msg : "category deleted successfully"})

    } catch (error) {
        next(error)
    }

}




const updateCategory = async (req , res , next) => {

    try {
        
       const {categoryId} = req.params

       const {categoryName , description} = req.body

       if(!categoryId){
            return next(createError("Category id not provided" , 400))
       }

       if(!categoryName && !description){
            return next(createError("Category credentials not provided" , 400))
       }

       const category = await Category.findById(categoryId)

       if(!category){
            return next(createError("Category not exist" , 404))
       }

       const updatedCategory = await Category.findByIdAndUpdate(categoryId , {
        categoryName ,
        description
       } , {new : true})

       res.status(200).json(updatedCategory)

    } catch (error) {
        next(error)
    }

}







module.exports = {createCategory , getAllCategories , getSingleCategory , deleteCategory , updateCategory}