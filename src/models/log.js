const mongoose = require("mongoose")
const Schema =  mongoose.Schema

const schema =  new mongoose.Schema({
    action :{ 
        type : String
    } ,
    user : {
        type :  Schema.Types.ObjectId,  
        ref : "user"
    }
} , {timestamps :  true })


const logModel = new mongoose.model("log", schema) ;  

module.exports = logModel;