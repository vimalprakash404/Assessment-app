const mongoose = require("mongoose")

const schema = new mongoose.Schema({
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
    city: { type: String },
    region: { type: String },
    country: { type: String },
    os: { type: String } ,
    browser : {type : String} 
})


const loginLog = new mongoose.model("LoginLog", schema);
module.exports = loginLog;