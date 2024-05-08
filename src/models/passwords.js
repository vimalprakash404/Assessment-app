const mongoose= require("mongoose");
const crypto = require('crypto');
const assessmentDetailsModel = require("./assessmentDetail");
const {userModel}  = require("./users")

const Schema = mongoose.Schema ;

const schema = new mongoose.Schema(
    {
        user : {
            type  : Schema.Types.ObjectId ,
            require : true ,
            ref :"user"
        } ,
        password : {
            type  : String ,
            require  : true 
        }
    }
)



// function  encryption and  decryption 


// Function to encrypt a string
function encrypt(text, key, iv) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Function to decrypt a string
function decrypt(encryptedText, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Example usage
const secret="ugugugugugug"
let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
const staticIVHex = '0123456789abcdef0123456789abcdef';

// Convert the hexadecimal string to a Buffer
const iv = Buffer.from(staticIVHex, 'hex');

schema.pre("save" , async function (next){
    try {
        if(!this.isModified("password")){
            return next();
        }
        const hashedPassword = encrypt(this.password, key , iv);
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
        const decryptedPassword = decrypt(passwordRecord.password, key ,iv);
        return decryptedPassword;
    } catch (error) {
        throw error;
    }
}

// async function findAllPasswords() {
//     try {
//         const allPasswords = await passwordsModel.find({}).populate('user');
//         const decryptedPasswords = allPasswords.map(passwordRecord => ({
//             id: passwordRecord._id,
//             password: decrypt(passwordRecord.password, key , iv),
//             username :passwordRecord.user.username,
//             url : await assessmentDetailsModel.findOne({user :passwordRecord.user._id })["url"]
//         }));
//         return decryptedPasswords;
//     } catch (error) {
//         throw error;
//     }
// }


async function findAllPasswords() {
    try {
        const allPasswords = await passwordsModel.find({}).populate('user');
        const decryptedPasswords = await Promise.all(allPasswords.map(async (passwordRecord) => {
            const decryptedPassword = await decrypt(passwordRecord.password, key, iv);
            const assessmentDetails = await assessmentDetailsModel.findOne({ user: passwordRecord.user._id });
            return {
                id: passwordRecord._id,
                password: decryptedPassword,
                username: passwordRecord.user.username,
                url: assessmentDetails.url,
                isLogged : passwordRecord.user.status === 0  ? false : true
            };
        }));
        return decryptedPasswords;
    } catch (error) {
        throw error;
    }
}

async function findById(_id) {
    try {
        
        // const user =  await userModel.findOne({_id});
        // user(id)
        const allPasswords = await passwordsModel.find({_id}).populate('user');
        const decryptedPasswords = await Promise.all(allPasswords.map(async (passwordRecord) => {
            const decryptedPassword = await decrypt(passwordRecord.password, key, iv);
            const assessmentDetails = await assessmentDetailsModel.findOne({ user: passwordRecord.user._id });
            return {
                id: passwordRecord._id,
                password: decryptedPassword,
                username: passwordRecord.user.username,
                url: assessmentDetails.url,
                isLogged : passwordRecord.user.status === 0  ? false : true
            };
        }));
        return decryptedPasswords;
    } catch (error) {
        throw error;
    }
}


async function insertManyPasswords(passwordRecords) {
    try {
        const encryptedPasswordRecords = passwordRecords.map(passwordRecord => ({
            user: passwordRecord.user,
            password: encrypt(passwordRecord.password, key ,iv)
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
    insertManyPasswords ,
    findById
};