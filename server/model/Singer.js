const mongoose = require("mongoose")
const { Schema, model } = mongoose 

const singerSchema = new Schema({
  // can write both ways
  name : {type : String},
  worth : Number,
})


module.exports = model("Singer", singerSchema)