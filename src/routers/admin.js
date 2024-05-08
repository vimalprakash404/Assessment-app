const express = require("express")
const router = express.Router()
const {getUserLogIn} = require("../controllers/loginLog")
const {upload , createUsers , login , count , create, createAdminValidator ,getAllUser , exportUserData , getUserById} = require("../controllers/admin")

router.post('/upload', upload.single('csvFile') , createUsers);
router.post("/login" , createAdminValidator , login);
router.post("/create" , createAdminValidator , create ) ;
router.post("/get" , getAllUser);
router.post("/export" , exportUserData);
router.post("/count" , count ); 
router.post("/user/details" , getUserById);
router.post("/login/log" , getUserLogIn);
module.exports = router ;