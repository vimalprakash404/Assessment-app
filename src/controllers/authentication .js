const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { insertLoginLog } = require("./loginLog")
const {body, validationResult} =  require("express-validator")




async function login(username, password, req) {
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
             await insertLoginLog(req, 2);
            return { success: false, message: "Invalid user Credentials ", code: 401 }
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
             await insertLoginLog(req, 3);
            return { success: false, message: " Invalid user Credentials", code: 400 };
        }
        const key = process.env.KEY;
        user.password = undefined;
        const token = jwt.sign({ user }, key, { expiresIn: "24h" });
         await insertLoginLog(req, 1);
        return { success: true, message: "you Logged In", token, code: 200 }
    }
    catch (error) {
        return { status: 500, message: "server  error while login users" + error, success: false }
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


// validator for login 
 
const loginValidator=[
    body("username").isString().notEmpty() ,
    body("password").notEmpty().notEmpty()
]

async function candidateLogin(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(402).json({success: false , errors : errors.array()});
    }
    try {
        const { username, password } = req.body
        var createUser = await login(username, password, req);
        const code = createUser["code"];
        createUser["code"] = undefined;
        return res.status(code).json(createUser);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "server error while login candidate" + error })
    }
}


async function verify(req , res){
    return res.status(200).json({isAuthenticated : true})
}

module.exports = { verify , createCandidate, candidateLogin ,loginValidator };