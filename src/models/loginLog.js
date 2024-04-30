const mongoose  = require("mongoose")

const schema  =  new mongoose.schema({
    time :{
        type : Date ,
        required : true 
    } , 
    device  :  {
        type  : String ,
        required : true 
    } , 
    ip : {
        type  : String
    },
    location : { type : String }
})


const loginLog  =  new mongoose.model("LoginLog" , schema);
module.exports = loginLog ;