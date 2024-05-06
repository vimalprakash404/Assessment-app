const jwt = require('jsonwebtoken')
const adminModel = require("../models/admin")

function verifyToken (req, res , next){
    const token =  req.header("Authorization") ;
    if(!token) {
        return res.status(401).json({success : false , message  :  "No token provided"})
    }
    try {
        const key = process.env.KEY; 
        const decode = jwt.verify(token , key) ;
        req.user  = decode.user ;
        next(); 
    }catch(error){
        console.error("Error verifying token:" , error) ;
        return res.status(401).json({success: false , message :  "Invalid Token "})
    }
}

async function verifyAdmin( req , res , next ){
    const token  =  req.header("Authorization");
    if(!token) {
        return res.status(401).json({success : false , message : "NO token provided" , code  :  401 })
    }
    try { 
        const key = process.key.env.KEY ;
        const decode  = jwt.verify(token, key );
        req.user = decode.user;
        const adminExist = await adminModel.findOne({id : decode.user._id})
        if (!adminExist){
            return res.status(401).json({success: false , message : "Invalid user data in token "});
        }  
        next();
    }
    catch(error) {
        console.error("Error while validating the token " , error );
        return  res.status(401).json({message : "Invalid token while validating the token " , error})
    }
 }



module.exports ={verifyToken , verifyAdmin}