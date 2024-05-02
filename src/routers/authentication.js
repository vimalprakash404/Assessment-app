const express = require("express")
const router = express.Router() ;
const {createCandidate , candidateLogin ,loginValidator} = require("../controllers/authentication ")
router.post("/create" , createCandidate);
router.post("/login" ,loginValidator, candidateLogin );
module.exports = router 