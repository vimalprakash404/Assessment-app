const mongoose = require("mongoose")


const schema =  new mongoose.Schema({
    name : {
        type : String , 
        required  :  true 
    },
    startDateAndTime: {
        type  : Date ,
    },
    endDateAndTime : { 
        type : Date 
    },
    status : {
        type : Number ,
        default : 1
    }

} ,  { timestamps: true })



const  assessmentModel = mongoose.model("assessment" , schema) ;
module.exports  = assessmentModel ;
