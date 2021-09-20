const express = require("express")
const mongoose = require("mongoose")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")

const app = express()

// connecting to mongoDB
mongoose.connect("mongodb+srv://self:1234@cluster0.8dhrw.mongodb.net/music-mania?retryWrites=true&w=majority" )
mongoose.connection.once("open", () => console.log("DB Connected"))


app.use("/graphql", graphqlHTTP({
  schema,
  graphiql : true
}))

app.get("/", (req, res) =>{
  res.send("Hello World ")
})

app.listen(4000, () =>{
  console.log("Now Listening On Port 4000")
})