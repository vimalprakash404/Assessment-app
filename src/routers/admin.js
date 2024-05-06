const express = require("express")
const router = express.Router()

const {upload , createUsers , login , createAdminValidator} = require("../controllers/admin")

router.post('/upload', upload.single('csvFile') , createUsers);
router.post("/login" , createAdminValidator , login);

module.exports = router ;