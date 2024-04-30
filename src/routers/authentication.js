const express = require("express")
const router = express.Router() ;
const {createCandidate , candidateLogin} = require("../controllers/authentication ")
router.post("/create" , createCandidate);
router.post("/login" , candidateLogin );
module.exports = router 