const mongoose  = require("mongoose");
const bcrypt = require("bcrypt"); 

const schema =  new mongoose.Schema({
    username  :  {
        type  : String ,
        require  : true 
    },
    password :{
        type : String ,
        require : true 
    }
    , status :  {
        type : Number , 
        default : 0 
    }
} , {timestamps : true})


// status - 0 - active  
// status - 1 - not active

schema.pre("save" , async function  (next){
    try {
         if(!this.isModified("password")){
            return next();
         }
         const hashedPassword =  await bcrypt.hash(this.password , 10) ;
         this.password  = hashedPassword ;
         next()
    }
    catch(errors){
         return next(errors)
    }
})

const adminModel  = mongoose.model("admin" ,  schema );




module.exports = adminModel ;  

