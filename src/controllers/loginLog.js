const loginLog =require( "../models/loginLog");
const  {passwordsModel } = require("../models/passwords");

async function  insertLoginLog(req , status , user){
    const time  = new Date();
    const userAgent = req.useragent;
    const ip = req.ip;
     // const user = req.user._id;
     // consol
    const device = userAgent.isDesktop ? 'Desktop' : userAgent.isMobile ? 'Mobile' : 'Tablet';
    const os = userAgent.os.toString();
    const browser = userAgent.browser; 
    var city = undefined ;
    var region = undefined ;
    var country  =  undefined ;
    if (req.details === null ) {
         city  = undefined ;
         region  = undefined ;
         country = undefined 
    }
    else {
         city = req.details.city;
         region = req.details.region;
         country =req.details.country;
    }
    
    const loginLogObjet =await loginLog({user,time, device,ip,city,region, country, os, browser ,status});
    await loginLogObjet.save();

}



async function getUserLogIn(req, res){
     try {
          const {id} = req.body;
          const passwordObject  = await passwordsModel.find({_id:id});
          console.log(passwordObject)
          const userId = passwordObject[0].user;
          const loginLogs = await loginLog.find({user:userId})
          return res.status(200).json({success : true ,  loginLogs })
     }
     catch(error){
          return res.status(500).json({message : "server error while getUser login details " +  error })
     }
}
module.exports = {insertLoginLog , getUserLogIn}