const express = require("express")
const  router =  express.Router();


// importing  routers
const  auth = require("./authentication")
const assessment = require("./assessment")
const admin  = require("./admin")


// add routing 
router.use("/auth" ,auth)
router.use("/assessment" , assessment) ;
router.use("/admin" , admin)


module.exports =  router ;