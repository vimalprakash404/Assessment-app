const express = require("express")
const router = express.Router()
const  { verifyAdmin } = require("../middlewares/authentication")
const {getUserLogIn} = require("../controllers/loginLog")
const {upload , createUsers , verify,login , count , create, createAdminValidator ,getAllUser , exportUserData , getUserById} = require("../controllers/admin")

router.post('/upload', upload.single('csvFile') , createUsers);
router.post("/login" , createAdminValidator , login);
router.post("/create" , createAdminValidator , create ) ;
router.post("/get" ,verifyAdmin , getAllUser);
router.post("/export" ,verifyAdmin, exportUserData);
router.post("/count" ,verifyAdmin, count ); 
router.post("/user/details" ,verifyAdmin, getUserById);
router.post("/login/log" ,verifyAdmin, getUserLogIn);
router.post("/verify" , verifyAdmin , verify)
module.exports = router ;