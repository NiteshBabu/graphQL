const mongoose = require("mongoose")


const songSchema = new mongoose.Schema({
  name : String,
  genre : String,
  singerId : String
})

module.exports = mongoose.model("Song", songSchema)