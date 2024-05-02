const express = require("express")
const router = express.Router() ;
const {verifyToken} = require("../middlewares/authentication")
const {verify, createCandidate , candidateLogin ,loginValidator} = require("../controllers/authentication ")
router.post("/create" , createCandidate);
router.post("/verify",verifyToken ,verify )
router.post("/login" ,loginValidator, candidateLogin );
module.exports = router 