const express = require("express")
const cors = require("cors")
const postsRoute = require("./routes/posts.route")
const connectDB = require("./db/connectDB")
const errorHandler = require("./middlewares/errorHandler")
const notFound = require("./middlewares/notFound")
require("dotenv").config()


const app = express()
 

app.use(express.json())
app.use(cors({
    origin : [process.env.REACT_URL] ,
    credentials : true
}))


app.use("/api/v1/posts" , postsRoute)


app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT

const start = async () => {
    try {
        app.listen(PORT , () => console.log(`blog server started on port ${PORT}`))
        await connectDB()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()