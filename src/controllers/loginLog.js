const loginLog =require( "../models/loginLog");

async function  insertLoginLog(req , status ){
    const time  =  Date.now();
    const userAgent = req.useragent;
    const ip = req.ip;

    const device = userAgent.isDesktop ? 'Desktop' : userAgent.isMobile ? 'Mobile' : 'Tablet';
    const os = userAgent.os.toString();
    const browser = userAgent.browser;
    const city = req.details.city;
    const region = req.details.region;
    const country =req.details.country;
    const loginLogObjet =await loginLog({time, device,ip,city,region, country, os, browser ,status});
    await loginLogObjet.save();

}

module.exports = {insertLoginLog}