const express = require("express")
const router = express.Router()

const {upload , createUsers , login  , create, createAdminValidator ,getAllPassword} = require("../controllers/admin")

router.post('/upload', upload.single('csvFile') , createUsers);
router.post("/login" , createAdminValidator , login);
router.post("/create" , createAdminValidator , create ) ;
router.post("/get" , getAllPassword);
module.exports = router ;