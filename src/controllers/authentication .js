const userModel =  require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

async function login(username ,password ) {
    try {
        const user =  await userModel.findOne({username});
        if(!user){
            return {success : false , message : "Invalid user Credentials " ,code : 401}
       }

       const passwordMatch =  await bcrypt.compare(password , user.password) ;
       if (!passwordMatch){
           return {success : false , message : " Invalid user Credentials" , code :400};
       }
       const key = process.env.KEY ; 
       user.password=undefined ;
       const token = jwt.sign({user},key ,{expiresIn : "24h"}); 
       return {success:true,message:"you Logged In",token,code:200} 
    }
    catch(error) { 
        return {status : 500 , message : "server  error while login users" +error, success  : false }
    }
}


async function  signUp(username  , password ){
    try {
        const user = await userModel.findOne({username});
        if (user) {
            return {success : false , code  : 401 , message  :  "user already exists "}
        }
        const newUser = new userModel({username , password});
        await newUser.save() ;
        return {success : true , message : "User register successfully " ,code : 200};
    }
    catch(error){
        console.error('Error during signup : ', error) ;
        return {success : false , message :  "Internal server  error " , code : 400}
    }
}




// controller  for create candidate


async function createCandidate(req , res){
    try {
        const {username ,password} =req.body
        var  createUser =await  signUp(username , password) ;
        const  code =  createUser["code"] ;
        createUser["code"] =  undefined ;
        return res.status(code).json(createUser);
    }
    catch(error) { 
        return res.status(500).json({success : false , message :"server error while creating candidate" + error})
    }
}


async function   candidateLogin(req, res) { 
    try {
        const {username ,password} =req.body
        var  createUser =await  login(username , password);
        const  code =  createUser["code"];
        createUser["code"] =  undefined ;
        return res.status(code).json(createUser);
    }
    catch(error) { 
        return res.status(500).json({success : false , message :"server error while login candidate" + error})
    }
}

module.exports = {createCandidate , candidateLogin };