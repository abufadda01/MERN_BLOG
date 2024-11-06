

const notFound = async (req , res , next) => {
    res.status(404).json({msg : "Route not found on the server"})
}


module.exports = notFound 