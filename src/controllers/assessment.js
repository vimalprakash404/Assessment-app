const assessmentModel = require("../models/assessment");
const assessmentDetailsModels = require("../models/assessmentDetail");

function create(data) {
    try {
        const { name, startDateAndTime, endDateAndTime } = data;
        const assessmentObject = new assessmentModel({ name, startDateAndTime, endDateAndTime });
        assessmentObject.save();
        return { success: true, code: 200, message: "successfully created assessment " }
    }
    catch (error) {
        return { success: false, code: 500, message: "server  error while creating the assessment " + error }
    }
}
function remove() {

}


function createDetails(data) {
    try {
        const { user, assessment, url } = data;
        const assessmentDetailsObject = new assessmentDetailsModels({ user, assessment, url });
        assessmentDetailsObject.save();
        return { success: true, code: 200, message: "successfully created assessment Details" }
    }
    catch (error) {
        return { success: false, code: 500, message: "server  error while creating the assessment Details " + error }
    }
}

function createAssessmentDetails(req, res) {
    const user = req.user._id;
    const { assessment, url } = req.body;
    var response = createDetails({ user, assessment, url });
    const code = response["code"]
    return res.status(code).json(response);
}
function createAssessment(req, res) {
    const { name, startDateAndTime, endDateAndTime } = req.body;
    var response = create({ name, startDateAndTime, endDateAndTime });
    const code = response["code"]
    return res.status(code).json(response);
}



async function startAssessment(req, res) {
    try {
        const { assessment } = req.body;
        const assessmentObject = await assessmentModel.findOne({ _id: assessment });
        if (!assessmentObject) {
            return res.status(404).json({ message: "assessment not found", success: true })
        }
        else {

            // getting user from  request to assessment Details   
            const user = req.user._id;
            const assessmentDetailsObject = await assessmentDetailsModels.findOne({ assessment, user })

            const dateNow = new Date()
            // check current time is between start and end time of assessment 
            console.log("Assessment "+JSON.stringify(assessmentDetailsObject))
            if ((assessmentObject.startDateAndTime.getTime() < dateNow.getTime() && assessmentObject.endDateAndTime.getTime() > dateNow.getTime()) && assessmentObject.status === 1) {
                return res.status(200).json({ message: "You Start your Exam", assessmentDetails: assessmentDetailsObject, canStartExam: true })
            }
            var assessmentDetail = assessmentDetailsObject;
            // removing the  url from while time is not between start and time of assessment  
            assessmentDetail["url"] = undefined;
            return res.status(200).json({ message: "assessments", success: true, assessmentDetail, canStartExam: false })
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server while starting assessment " + error })
    }
}
module.exports = { createAssessment, createAssessmentDetails, startAssessment }