import React, { useState } from "react";
import "./css/card.css";
import axios from "axios";
import getToken from "../service/getToken";
import "./css/message.css";
import { BsInfoCircleFill } from "react-icons/bs";
import url from "../Connections/connections";
import { useNavigate } from "react-router-dom";


function Instruction() {
    const [canStartExam, setCanStartExam] = useState(false);
    const [examUrl, setExamUrl] = useState("")
    const navigate = useNavigate();
    async function getAssessment() {
        try {
            const assessment = "662f6dd2b1684fd5758b9726";
            const response = await axios.post("/api/assessment/start", { assessment }, { headers: { Authorization: getToken() } })
            console.log(response.data)
            setCanStartExam(response.data.canStartExam)
            setExamUrl(response.data.assessmentDetails.url)
        }
        catch (error) {
            if (!error.response) {
                console.log("net error")
            }
            else if (error.response.status === 401) {
                navigate("/")
                localStorage.removeItem("token");
            }
            else {
                console.error("Instruction page getAssessment Error", error);
                const response = error.response.data;
                setCanStartExam(false);
            }
        }
    }
    getAssessment();
    return (

        <div className="cookie-wrapper">
            <div className="cookie-card" style={{ margin: "auto" }}>
                <span className="title">📝 Instructions</span>
                <p className="description"><ol>
                    <li><strong>Logging In:</strong>
                        <ul>
                            <li><b>Website:</b> Access the test by visiting exams.ictkerala.org.</li>
                            <li><b>Credentials:</b> You will be provided with a username and password prior to the test. Keep these credentials secure and do not share them with anyone.</li>
                            <li><b>Login Time:</b> Log in at least 15 minutes before the scheduled start time to address any technical issues and to familiarize yourself with the test interface.</li>
                        </ul>
                    </li>
                    <li><strong>During the Test</strong>
                        <ul>
                            <li><b>Test Duration:</b> The total duration of the test is 90 minutes.</li>
                            <li><b>Number of Questions:</b> You will need to answer 120 questions within this time.</li>
                            <li><b>Navigation:</b> Use the ‘Next’ and ‘Previous’ buttons to navigate between questions. You can also flag questions if you wish to review them later before submitting the test.</li>
                            <li> <b>No Negative Marking:</b> There are no penalties for incorrect answers, so it is advisable to attempt all questions.</li>
                        </ul>

                    </li>
                    <li>
                        <strong>Answering Questions:</strong>
                        <ul>
                            <li><b>Strategy:</b> Since there is no negative marking, answer every question. If unsure, make an educated guess after narrowing down the options.</li>
                            <li><b>Time Management:</b> Allocate your time wisely. With 120 questions in 90 minutes, you have less than a minute per question on average.</li>
                        </ul>
                    </li>
                    <li><strong>Ending the Test:</strong>
                        <ul>
                            <li>
                                <b>Review: </b>If time permits, review flagged questions and ensure that all questions have been answered.
                            </li>
                            <li>
                                <b>Submission:</b> Once you have completed the test, submit your answers. Ensure you click the ‘Submit’ button before the time expires. A confirmation prompt will appear; confirm to finalize your submission.
                            </li>

                        </ul>
                    </li>
                    <li><strong>Post-Test:</strong>
                        <ul>
                            <li>
                                <b>Confirmation:</b> Ensure that you receive a confirmation notification or screen that your test answers have been successfully submitted.
                            </li>
                            <li>
                                <b>Log Out:</b> After submitting the test, log out from the test portal.
                            </li>

                        </ul>
                    </li>
                    <li>
                        <strong>Technical Issues:</strong>
                        <ul>
                            <b>Immediate Assistance:</b> If you experience any technical issues during the test, contact the support team immediately. Contact details or a helpdesk link should be provided on the test portal.
                        </ul>
                    </li>
                    {/* <li><strong>Electronic Devices:</strong> Keep all electronic devices, including cell phones and smartwatches, turned off and stored away during the exam.</li>
                    <li><strong>Proctor Assistance:</strong> If you have any questions or need clarification during the exam, raise your hand and a proctor will assist you.</li>
                    <li><strong>Noise Level:</strong> Maintain silence during the exam to avoid disturbing others.</li>
                    <li><strong>Submission:</strong> Ensure you submit your completed exam booklet and any additional sheets provided at the end of the exam.</li>
                    <li><strong>Leaving the Room:</strong> You may leave the exam room once you have completed your exam and handed it in.</li>
                    <li><strong>Emergency Procedures:</strong> In the event of an emergency, follow the instructions provided by the exam proctor.</li>
                    <li><strong>Good Luck!</strong> We wish you the best of luck with your exam. Stay calm, focused, and do your best.</li> */}
                </ol>
                </p>
                <div >
                    {/* <button className="pref">
                        Manage your preferences
                    </button> */}
                    {
                        canStartExam ? (<a className="accept" href={examUrl}>
                            Join Exam
                        </a>) : (<div className="info-msg"><BsInfoCircleFill /> Exam is not live</div>)
                    }

                </div>
            </div>
        </div>
    )
}


export default Instruction;