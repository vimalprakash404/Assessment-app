const fs = require("fs");
const csv = require("csv-parser");
const { Readable } = require("stream");
const multer = require('multer');
const { Parser } = require("json2csv");
const { userModel, insertManyWithEncryptedPasswords } = require("../models/users");
const assessmentModel = require("../models/assessment");
const assessmentDetailsModel = require("../models/assessmentDetail");
const {passwordsModel , insertManyPasswords, findAllPasswords} = require("../models/passwords")
const { signUp } = require("./authentication ")
const { createDetails } = require("../controllers/assessment")
const bcrypt = require('bcrypt');
const createPDF = require("./pdfCreator")

const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")

function generateRandomAlphanumericPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

const createAdminValidator = [
    body("username").notEmpty().isString(),
    body("password").notEmpty().isString()
]
const adminModel = require("../models/admin")


async function create(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status("401").json({ message: "validation error ", errors, success: false })
        }

        const { username, password } = req.body;
        console.log("password", req.body)
        const exitingAdminUser = await adminModel.findOne({ username });
        console.log("user ex" + exitingAdminUser);
        if (exitingAdminUser) {
            return res.status(400).json({ message: "user  already exist ", success: false })
        }
        const newAdmin = adminModel({ username, password });
        console.log({ username, password })
        await newAdmin.save();

        return res.status(200).json({ message: "admin create successful", success: true })
    }
    catch (error) {
        console.error("server while creating the admin Error : " + error)
        return res.status(500).json({ success: false, message: "server error while creating admin Error: " + error })
    }
}

 


async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await adminModel.findOne({ username });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(200).json({ message: "Invalid password or username", success: false })
            }
            const key = process.env.KEY;
            user.password = undefined;
            const token = jwt.sign({ user }, key, { expiresIn: "24h" });
            return  res.status(401).json({success : true , message : "login success " , token})
        }
        else {
            return res.status(401).json({ message: "User not found", success: false })
        }
    }
    catch (error) {
        const response = { "message ": "error  while  login admin  ", error }
        console.error(response);
        return res.status(500).json(response)
    }
}




async function bulkUserGenerator(req) {
    try {
        const results = [];
        const fileBuffer = req.file.buffer;
        const readableStream = Readable.from([fileBuffer]); // Creating a readable stream from buffer
        const usersData = [];
        const enPasswords =[];
        const assessment = await assessmentModel.find({});
        return new Promise((resolve, reject) => {
            readableStream
                .pipe(csv())
                .on('data', async (row) => {
                    row["password"] = generateRandomAlphanumericPassword();
                    usersData.push({ username: row["ROLL"], password: row["password"] })
                    results.push(row);
                })
                .on('end', async () => {
                    const fields = Object.keys(results[0]); 
                    const json2csvParser = new Parser({ fields });
                    const csvData = json2csvParser.parse(results); 
                    insertManyWithEncryptedPasswords(usersData)
                        .then(users => {
                            var assessmentDetailData = [];
                            users.forEach(element => {
                                assessmentDetailData.push({ user: element._id, assessment: assessment[0]._id, url: results.find(student => student.ROLL === element.username).url })
                                enPasswords.push({user : element._id , password : results.find(student => student.ROLL === element.username).password})
                            });
                            console.log("insert details :"+JSON.stringify(enPasswords));
                            insertManyPasswords(enPasswords)
                            assessmentDetailsModel.insertMany(assessmentDetailData);
                        })

                    resolve({ message: 'CSV file uploaded and processed successfully.', code: 200, data: results });
                })
                .on('error', (err) => {
                    reject(err); // Reject the promise if an error occurs
                });
        });
    } catch (error) {
        console.error(error);
        return { success: false, message: "error while uploading the file ", code: 500 };
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    // storage: storage,
    fileFilter: function (req, file, cb) {
        // Check file type
        if (!file.originalname.match(/\.(csv)$/)) {
            return cb(new Error('Only CSV files are allowed!'));
        }
        cb(null, true);
    }
});



async function createUsers(req, res) {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const response = await bulkUserGenerator(req, res);
    var user = []
    if (response.code === 200) {
        response.data.forEach((i) => {
            user.push({ roll: i["ROLL"], url: "example.com", un: i["ROLL"] + "@sample.com", pw: i["password"] })
        })
    }
    const pdfBuffer = createPDF(user);
    const stream = new Readable();
    stream.push(pdfBuffer);
    stream.push(null); // Signal the end of the stream
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length,
        'Content-Disposition': 'inline; filename="output.pdf"'
    });
    const message = "PDF generated successfully!";
    stream.pipe(res);
} 



async function getAllPassword(req, res) {
    const data =  await findAllPasswords();
    return res.status(200).json({message : "response" , data })
}

module.exports = { createUsers, upload, create, createAdminValidator, login , getAllPassword }