const loginLog =require( "../models/loginLog");

async function  insertLoginLog(req , status ){
    const time  =  Date.now();
    const userAgent = req.useragent;
    const ip = req.ip;

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
    
    const loginLogObjet =await loginLog({time, device,ip,city,region, country, os, browser ,status});
    await loginLogObjet.save();

}

module.exports = {insertLoginLog}