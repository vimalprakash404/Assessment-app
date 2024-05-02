const express = require("express")
const router = express.Router()

const {upload , createUsers} = require("../controllers/admin")

router.post('/upload', upload.single('csvFile') , createUsers)

module.exports = router ;