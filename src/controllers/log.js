const logModel = require("../models/log");


function createLog(action, user) {
    try {

        const logObject = new logModel(action, user);
        logObject.save();
        return { success: true }
    }
    catch (error) {
        console.log(`Error while  creating log ${log}`);
        return {success :  false  , error }
    }
}


module.exports = { createLog }