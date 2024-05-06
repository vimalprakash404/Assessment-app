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
    } ,
    status : {
        type : Number ,
        default :0 
    }
}, { timestamps: true }) ;





async function insertManyWithEncryptedPasswords(users) {
    try {
        const encryptedUsers = await Promise.all(users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { username: user.username, password: hashedPassword };
        }));
        return await userModel.insertMany(encryptedUsers);
    } catch (error) {
        throw error;
    }
}


const  userModel =  mongoose.model("user" , userSchema);
module.exports = { userModel , insertManyWithEncryptedPasswords} ; 