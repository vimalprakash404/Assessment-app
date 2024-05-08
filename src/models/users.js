const mongoose  = require("mongoose") ;
const bcrypt  =  require("bcrypt")



const userSchema   =new mongoose.Schema( { 
    username :  {
        type  :  String  , 
        required  :  true ,
        unique: true,
        index: true
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
        // Verify if any of the usernames already exist in the database
        const existingUsernames = await userModel.find({ username: { $in: users.map(user => user.username) } }).select('username');
        const existingUsernamesSet = new Set(existingUsernames.map(user => user.username));

        const usersToInsert = users.filter(user => !existingUsernamesSet.has(user.username));
        console.log("no user" , usersToInsert)
        
        // Encrypt passwords for new users only
        const encryptedUsers = await Promise.all(usersToInsert.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { username: user.username, password: hashedPassword };
        }));

        // Insert only the new users
        return await userModel.insertMany(encryptedUsers);
    } catch (error) {
        throw error;
    }
}


const  userModel =  mongoose.model("user" , userSchema);
module.exports = { userModel , insertManyWithEncryptedPasswords} ; 