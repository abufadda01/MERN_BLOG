const express = require("express")

const auth = require("../middlewares/auth")
const { createCategory, getAllCategories, getSingleCategory, deleteCategory, updateCategory } = require("../controllers/categories.controller")



const categoryRoute = express.Router()


categoryRoute.post("/" , auth , createCategory)

categoryRoute.get("/" , auth , getAllCategories)

categoryRoute.get("/:categoryId" , auth , getSingleCategory)

categoryRoute.delete("/:categoryId" , auth , deleteCategory)

categoryRoute.patch("/:categoryId" , auth , updateCategory)



module.exports = categoryRoute
