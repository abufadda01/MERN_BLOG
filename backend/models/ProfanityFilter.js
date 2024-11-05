const mongoose = require("mongoose")


const profanityFilterSchema = new mongoose.Schema({
    bannedWords : [String]
})

const ProfanityFilter = mongoose.model("profanityFilters" , profanityFilterSchema)

module.exports = ProfanityFilter