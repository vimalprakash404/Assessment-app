const mongoose= require("mongoose");
const crypto = require('crypto');

const Schema = mongoose.Schema ;

const schema = new mongoose.Schema(
    {
        user : {
            type  : Schema.Types.ObjectId ,
            require : true 
        } ,
        password : {
            type  : String ,
            require  : true 
        }
    }
)



// function  encryption and  decryption 


function encrypt(text, key) {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Function to decrypt a string
function decrypt(encryptedText, key) {
    const decipher = crypto.createDecipher('aes-256-cbc', key);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

userSchema.pre("save" , async function (next){
    try {
        if(!this.isDirectModified("password")){
            return next();
        }
        const hashedPassword = encrypt(this.password, process.env.KEY);
        this.password = hashedPassword;
        next();
     }
    catch (error){
        return  next(error);
    }
})


async function findPasswordById(id, key) {
    try {
        const passwordRecord = await passwordsModel.findById(id);
        if (!passwordRecord) {
            throw new Error("Password not found");
        }
        const decryptedPassword = decrypt(passwordRecord.password, key);
        return decryptedPassword;
    } catch (error) {
        throw error;
    }
}

async function findAllPasswords(key) {
    try {
        const allPasswords = await passwordsModel.find({});
        const decryptedPasswords = allPasswords.map(passwordRecord => ({
            id: passwordRecord._id,
            password: decrypt(passwordRecord.password, key)
        }));
        return decryptedPasswords;
    } catch (error) {
        throw error;
    }
}


async function insertManyPasswords(passwordRecords, key) {
    try {
        const encryptedPasswordRecords = passwordRecords.map(passwordRecord => ({
            user: passwordRecord.user,
            password: encrypt(passwordRecord.password, key)
        }));
        const insertedRecords = await passwordsModel.insertMany(encryptedPasswordRecords);
        return insertedRecords;
    } catch (error) {
        throw error;
    }
}

const passwordsModel  = mongoose.model("Passwords", schema );



module.exports = {
    passwordsModel,
    findPasswordById,
    findAllPasswords,
    insertManyPasswords
};