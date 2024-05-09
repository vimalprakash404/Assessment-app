const { userModel } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { insertLoginLog } = require("./loginLog")
const { body, validationResult } = require("express-validator")

require("dotenv").config({})


async function login(username, password, req) {
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            await insertLoginLog(req, 2, undefined);
            return { success: false, message: "Invalid user Credentials ", code: 401 }
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            await insertLoginLog(req, 3, undefined);
            return { success: false, message: " Invalid user Credentials", code: 400 };
        }
        const key = process.env.KEY;
        user.status = 1;
        await user.save();
        user.password = undefined;
        const token = jwt.sign({ user }, key, { expiresIn: "24h" });
        await insertLoginLog(req, 1, user._id);
        return { success: true, message: "you Logged In", token, code: 200 }
    }
    catch (error) {
        return { status: 500, message: "server  error while login users" + error, success: false, code: 500 }
    }
}


async function signUp(username, password) {
    try {
        const user = await userModel.findOne({ username });
        if (user) {
            return { success: false, code: 401, message: "user already exists " }
        }
        const newUser = new userModel({ username, password });
        await newUser.save();
        return { success: true, message: "User register successfully ", code: 200 };
    }
    catch (error) {
        console.error('Error during signup : ', error);
        return { success: false, message: "Internal server  error ", code: 400 }
    }
}




// controller  for create candidate


async function createCandidate(req, res) {
    try {
     
        const { username, password } = req.body
        var createUser = await signUp(username, password);
        const code = createUser["code"];
        createUser["code"] = undefined;
        return res.status(code).json(createUser);
    }
    catch (error) {
        return res.status(500).json({ code: 500, success: false, message: "server error while creating candidate" + error })
    }
}

function domainUsernameToUsernameConverter(email) {
    const codeRegex = /^(\d+)@example\.com$/;
    console.log("process" , process.env.DOMAIN)
    // Extract the code
    const match = email.match(codeRegex);

    if (match) {
        const code = match[1];
        return code ;
    } else {
        return false;
    }
}

// validator for login 



const loginValidator = [
    body("username").isString().notEmpty(),
    body("password").notEmpty().notEmpty()
]

async function candidateLogin(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ success: false, errors: errors.array() });
    }
    try {
        var { username, password } = req.body;
        username = domainUsernameToUsernameConverter(username) ;
        if (!username){
            return res.status(402).json({ success: false, message : "invalid user credentials"});
        }
        // console.log("username" , domainUsernameToUsernameConverter(username));
        var createUser = await login(username, password, req);
        const code = createUser["code"];
        createUser["code"] = undefined;
        return res.status(code).json(createUser);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "server error while login candidate" + error })
    }
}


async function verify(req, res) {
    return res.status(200).json({ isAuthenticated: true })
}

module.exports = { verify, createCandidate, candidateLogin, loginValidator, signUp };