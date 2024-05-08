const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    user:{
        type : Schema.Types.ObjectId ,
        ref : "user"
    },
    time: {
        type: Date,
        required: true
    },
    device: {
        type: String,
        required: true
    },
    ip: {
        type: String
    },
    city: { type: String , default : "Nil" },
    region: { type: String , default : "Nil"},
    country: { type: String , default : "Nil"},
    os: { type: String , default : "Nil"} ,
    browser : {type : String , default : "Nil"} ,
    status : {type : Number}

    // status - 1 - success 
    // status - 2 - user not found
    // status - 3 - invalid password
})


const loginLog = new mongoose.model("LoginLog", schema);
module.exports = loginLog;