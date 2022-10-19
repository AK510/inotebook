 const mongoose = require('mongoose');

 const mongoURI = "mongodb://localhost:27017/iNotebook"

 //after connected print connected to mongo!
 const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo!");
    })
 }
 
 
 module.exports = connectToMongo;