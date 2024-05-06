const mongoose =  require("mongoose")
const Schema = mongoose.Schema 

const schema =  new mongoose.Schema({
    user  : {
        type :  Schema.Types.ObjectId ,
        ref : "user" 
    } ,
    assessment :{
        type : Schema.Types.ObjectId , 
        ref  : "assessment"
    } , 
    url : {
        type  : String ,
        //  require :  true 
    } ,
    disable : { 
        type :  Boolean ,
        default : false 
    }
})

const assessmentDetailsModel = mongoose.model("assessment-details" , schema) ;

module.exports = assessmentDetailsModel ; 