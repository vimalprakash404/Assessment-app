const express = require("express")
const  router =  express.Router();


// importing  routers
const  auth = require("./authentication")
const assessment = require("./assessment")



// add routing 
router.use("/auth" ,auth)
router.use("/assessment" , assessment) ;


module.exports =  router ;