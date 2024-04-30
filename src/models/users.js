const mongoose  = require("mongoose") ;
const bcrypt  =  require("bcrypt")



const userSchema   =new mongoose.Schema( { 
    username :  {
        type  :  String  , 
        required  :  true 
    } , 
    password  :  {
        type  :  String , 
        required : true ,
    }
}, { timestamps: true }) ;



userSchema.pre("save" , async function (next){
    try {
        if(!this.isDirectModified("password")){
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10 );
        this.password = hashedPassword;
        next();
     }
    catch (error){
        return  next(error);
    }
})


const  userModel =  mongoose.model("User" , userSchema);
module.exports = userModel ; 