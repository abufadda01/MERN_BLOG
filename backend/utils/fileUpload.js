const cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary")
require("dotenv").config()


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECRET ,
})



const storage = new CloudinaryStorage({
    cloudinary ,
    allowedFormats : ["jpg" , "png" , "jpeg"] ,
    params : {
        folder : "MERN_BLOG_IMAGES" ,
        format : "jpg" ,
        transformation : [{width : 500 , height : 500 , crop : "limit"}]
    }   
})


module.exports = storage
