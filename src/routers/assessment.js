const express  =  require("express")
const router = express.Router();
const {verifyToken} =  require("../middlewares/authentication")


const {createAssessment , createAssessmentDetails , startAssessment} = require("../controllers/assessment");
router.post("/create" , verifyToken,createAssessment);
router.post("/create/details" ,verifyToken, createAssessmentDetails ) ;
router.post("/start", verifyToken , startAssessment) ; 

module.exports =  router ;
