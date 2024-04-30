import React, { useState } from "react";
import "./css/card.css" ;
import axios from "axios" ;
import getToken from "../service/getToken";
import "./css/message.css"; 
import { BsInfoCircleFill } from "react-icons/bs";

function Instruction() {
    const [canStartExam, setCanStartExam] = useState(false);
    const [examUrl , setExamUrl] = useState("")
    async function getAssessment(){
        try  { 
            const assessment = "662f6dd2b1684fd5758b9726" ;
            const response =  await axios.post("http://localhost:3000/api/assessment/start" , {assessment  } ,{headers : {Authorization : getToken() }})
            console.log(response.data)
            setCanStartExam(response.data.canStartExam)
            setExamUrl(response.data.assessmentDetails.url)
        }
        catch(error) {
            if(!error.response){
                console.log("net error")
            }
            else{
                console.error("Instruction page getAssessment Error" , error) ;
            const  response = error.response.data ;
            setCanStartExam(false);
            }
        }
    }
    getAssessment();
    return (
        <>
            <div className="cookie-card" style={{ margin: "auto" }}>
                <span className="title">📝 Instructions</span>
                <p className="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, magnam sunt? Quaerat neque quasi accusantium amet facilis adipisci distinctio, dicta necessitatibus minima officiis cupiditate enim veritatis temporibus ipsum voluptas ex?
                    Ut placeat, delectus asperiores illum culpa distinctio quae doloremque voluptatum mollitia tempora quis impedit magni repellat magnam. Quisquam minus ipsa, enim nemo, vel aspernatur rem numquam, qui eius hic est.
                    Quasi similique dolor error. Quisquam dignissimos odit obcaecati provident aut debitis corrupti officiis nam a, hic iusto cupiditate! Id repellat eaque odio itaque maxime nemo non officia eum doloremque ratione?
                    Repellat quaerat iure mollitia praesentium commodi assumenda quos, voluptate laboriosam fugiat aut omnis eligendi optio maiores pariatur sunt libero corporis quas iste minima harum dolore aliquam sed at quidem! Voluptate.
                    Quaerat ipsam rerum nesciunt facere dolorem, enim fugiat, iure assumenda id nihil sint repellendus libero adipisci est doloribus quos? Beatae vero quas deserunt pariatur id quisquam odio reprehenderit velit. Libero!
                    Inventore amet quae mollitia, rem temporibus eveniet est, reprehenderit eos molestiae tempore ad. Distinctio quia, qui provident commodi et inventore mollitia similique, maiores laboriosam blanditiis voluptates nostrum voluptate laborum enim?
                    Deserunt praesentium ipsa nemo quisquam officia enim saepe eveniet, inventore veniam accusantium repellat ipsum soluta, sunt maxime amet delectus ratione eligendi dicta temporibus voluptate. Cupiditate natus blanditiis odit explicabo sequi.
                    Id sint, tempore dolor labore consequuntur magnam illum itaque sit architecto libero unde, doloremque necessitatibus voluptatibus? Amet sint quos, unde delectus maxime, hic nobis vel voluptas fugiat vitae ex non.
                    Sequi mollitia maiores enim corporis nostrum? Cum illo, assumenda dignissimos totam id laudantium officiis repellat error, harum doloribus labore vitae fugiat beatae excepturi dolorum aliquam sed repudiandae animi veniam natus?
                    Nobis nemo provident quasi neque minima suscipit! Vitae expedita, repellat voluptatibus fuga minus impedit. Unde perspiciatis, voluptates maxime, earum quibusdam reprehenderit aliquid possimus, enim aperiam rerum consequuntur provident debitis sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus asperiores repellat, animi quas pariatur, consequuntur at ipsam quasi hic natus fuga nostrum, et facilis unde beatae corporis maiores tempora quae? . Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, quibusdam voluptatem soluta tempore fugiat obcaecati est fuga, nesciunt dignissimos at molestiae, quae ratione ut? Aut facere error id voluptatibus quasi?
                    Iusto temporibus incidunt accusantium similique repellendus recusandae. Perferendis, reiciendis est commodi ullam itaque asperiores aspernatur sint fugiat quos minus. Eius aliquam debitis repellendus sit magni vero, totam recusandae ducimus. Consectetur.
                    Incidunt quidem, corrupti ullam consectetur, officia officiis, consequuntur dolore mollitia velit in eius maxime saepe. Aliquam voluptatum harum iste sit nostrum dolor enim, inventore itaque, expedita velit nisi dicta odit!
                    Consequatur itaque doloribus necessitatibus quibusdam molestias perferendis quaerat distinctio repellat! Facere corporis saepe corrupti esse nihil iste, error ipsum ex tempora voluptatem natus, dolor deleniti nesciunt sequi quae sunt tenetur.
                    Reiciendis, illum? Repellat, obcaecati optio! Molestiae sunt similique officia ea repellendus id magni repellat, esse quas fugiat facere nemo quam non dolorum, deserunt distinctio, harum modi veritatis eius vitae saepe?
                    Aspernatur libero veritatis illum aliquid nobis accusantium minus suscipit inventore quibusdam, qui dolorum facilis odio asperiores nisi necessitatibus voluptates eos ratione quidem. Ex unde neque maiores nisi exercitationem nobis quidem!
                    Consectetur dolore soluta provident odio quisquam veniam quia unde qui numquam fugiat. Id illo ex deserunt doloremque pariatur magni est ullam voluptatum hic. Adipisci aliquid consequuntur ut velit? Distinctio, perspiciatis!
                    Aliquam, officia? Nobis vitae minus dolorem dolor sit animi rem reprehenderit, sint facere omnis laudantium iure consequatur autem neque expedita consectetur, sapiente facilis? Explicabo voluptates, maxime ipsa possimus cumque ex?
                    Soluta commodi rem distinctio cupiditate voluptate laudantium quis repellat, deleniti, in amet eligendi modi dignissimos. Sed, laudantium neque? Ut, dolorem ipsum nulla possimus ex eius repudiandae ab illo sunt delectus.
                    Vero, sint quas. Ipsa facere magni, cumque eius ex dolorum harum veritatis fuga magnam minus! Eos nostrum facere maiores cumque, praesentium quos aperiam repudiandae natus nesciunt temporibus deserunt enim ipsa!<a href="#">Read more about data</a>. </p>
                <div >
                    {/* <button className="pref">
                        Manage your preferences
                    </button> */}
                    {
                        canStartExam ? (<a className="accept"  href={examUrl}>
                            Start Exam
                        </a>) : (<div className="info-msg"><BsInfoCircleFill /> Exam is not live</div>)
                    }

                </div>
            </div>
        </>
    )
}


export default Instruction;