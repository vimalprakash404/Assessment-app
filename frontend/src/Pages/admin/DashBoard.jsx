import "./css/dashboard.css"
import { FiUser } from "react-icons/fi";
import { LuUserCheck, LuUserX } from "react-icons/lu";
import { FaFileExport } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { IoOpenSharp } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import url from "../../Connections/connections";
import { Modal, Button } from 'react-bootstrap';

import { saveAs } from 'file-saver';
import { createPDF } from '../../service/pdfCreator';
import adminGetToken from "../../service/adminGetToken";
import isLoggedIn from "../../Connections/isAdminLoggedIn";
import { useNavigate } from "react-router-dom";
function DashBoard() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const [candidates, setCandidates] = useState(-1)
    const [candidatesLogged, setCandidatesLogged] = useState(-1);
    const [candidatesNotLogged, setCandidatesNotLogged] = useState(-1);
    const [candidatesTable, setCandidatesTable] = useState([]);

    useEffect(()=>{
        function isAuthenticated() {
            const caller = async () => {
                try {

                    const response = await axios.post(url() + "/api/admin/verify", {}, {
                        headers: {
                            Authorization: adminGetToken()
                        }
                    })
                    console.log("admin " , response);
                    return response ;
            
                }
                catch (error) {
                   
                    if (!error.response){
                        console.log("cannot connect to server");
                    }
                    else if(error.response.status === 401 ){
                        navigate("/admin");
                    }
                    else {
                        console.log("some error occurred" , error);
                    }
                }
            }
            caller();
        }
        isAuthenticated();
    }, [])
    
    useEffect(() => {
        (async () => {


            try {
                const dataResponse = await axios.post(url() + "/api/admin/count" , {} , {headers : {Authorization : adminGetToken()}});
                console.log("Response : " + JSON.stringify(dataResponse.data.totalUsers))
                setCandidates(dataResponse.data.totalUsers);
                setCandidatesLogged(dataResponse.data.loggedInUsers);
                setCandidatesNotLogged(dataResponse.data.notLoggedInUsers);
            }
            catch (error) {
                console.error("error while fetching count data from severe ")
            }

            try {
                const response = await axios.post(url() + "/api/admin/get" , {} , {headers : {Authorization : adminGetToken()}});
                console.log("users Response " + JSON.stringify(response.data.data))
                console.log(response.data.data);
                setCandidatesTable(response.data.data)

            }
            catch (error) {
                console.error("error while getting user details from sever", error)
            }
        })();



    }, [])



// csv handle functions
    const convertToCSV = (array) => {
        var reorderedData = array.map(({ username, password, ...rest }) => ({ username, ...rest, password }));
        reorderedData = reorderedData.map(({ id, ...rest }) => rest);
        const header = Object.keys(reorderedData[0]).join(',');
        const rows = reorderedData.map(obj => Object.values(obj).join(','));
        return header + '\n' + rows.join('\n');
    };

    const downloadCSV = (data) => {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    async function handleExport() {
        try {
            const response = await axios.post(url() + "/api/admin/export" , {} , {headers : {Authorization : adminGetToken()}});
            console.log("export :" + JSON.stringify(response.data.data));
            const realData = response.data.data || [];

            downloadCSV(realData);
        }
        catch (error) {
            console.error("error  while get data for export data", error);
        }
    }


// handle pdf file
    function savePDF(data) {
        const pdfBuffer = createPDF(data);
        const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
        saveAs(blob, 'document.pdf');
    }

    async function handleAccessDownload() {
        try {
            const response = await axios.post(url() + "/api/admin/export"  ,{},{headers : {Authorization : adminGetToken()}});
            console.log("export :" + JSON.stringify(response.data.data));
            const realData = response.data.data || [];

            savePDF(realData);
        }
        catch (error) {
            console.error("error  while get data for export data", error);
        }
    }

    async function handleAccessSingleDownload(id) {
        try {

            console.log("id:" + id)
            const response = await axios.post(url() + "/api/admin/user/details", { userId: id } , {headers : {Authorization : adminGetToken()}});
            console.log("res :" + JSON.stringify(response.data.data));
            const realData = response.data.data || [];

            savePDF(realData);
        }
        catch (error) {
            console.error("error  while get data for export data", error);
        }
    }
    // handle login details 
    const [loginDetails,setLoginDetails] = useState()
    const [roll , setRoll] = useState()
    async function getUserLogDetails(id , roll){
      try {
        const response = await axios.post(url() +"/api/admin/login/log", {id : id} , {headers : {Authorization : adminGetToken()}});
        var getAllData = response.data.loginLogs;
        getAllData.forEach((element) =>{
            element.time = new Date(element.time).toLocaleString()
        })
        console.log("res : " + JSON.stringify(getAllData));
        setLoginDetails(getAllData);
        handleShow();
        setRoll(roll)
      }
      catch (error){
        console.error("server while fetching the login details form server" + error) 
      }
    }


    function logout(){
        localStorage.removeItem("super");
        navigate("/admin");
    }
    return (
        <div className="">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <b>Roll No</b>
                        </div>
                        <div className="col">
                            <b>{roll}</b>
                        </div>
                    </div>
                    <hr class="mt-1 mb-1" />
                    <table className="table  table-hover">
                        <thead className="table">
                            <tr>
                                <th scope="col">Time</th>
                                <th scope="col">Device </th>
                                <th scope="col"> IP </th>
                                <th scope="col"> OS</th>
                                <th scope="col"> Browser </th>
                            </tr>
                        </thead>
                        <tbody>


                            {loginDetails && loginDetails.map(element=>(
                                <tr>
                                <td scope="col" > {element.time}</td>
                                <td scope="col"> {element.device} </td>
                                <td scope="col" > {element.ip}</td>
                                <td scope="col" > {element.os}</td>
                                <td scope="col" > {element.browser}</td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <nav className="navbar navbar-light  justify-content-between text-light" >
                <div >
                    <a className="navbar-brand inline-block" href="#">
                        <img src={logo} width="50" height="50" className="align-top" alt="" />
                    </a>
                </div>

                <button className="btn btn-light mx-5" onClick={()=>{logout()}}>Logout</button>
            </nav>
            <div className="row justify-center-around">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <b>Candidates</b>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col"><h1 className=" text-primary">{candidates}</h1> </div>
                                <div className="col" ><h1 className=" text-primary">  <FiUser /></h1></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <b>Logged Candidates</b>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col"><h1 className=" text-primary">{candidatesLogged}</h1> </div>
                                <div className="col"><h1 className=" text-primary">  <LuUserCheck /></h1></div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <b>Not Logged In Candidate</b>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col"><h1 className=" text-primary">{candidatesNotLogged}</h1> </div>
                                <div className="col"><h1 className=" text-primary">  <LuUserX /></h1></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="card col-10">
                    <div className="card-header">
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <div >
                                <b>Registered  Candidates</b>
                            </div>
                            <div className="p-2">
                                <button type="button" className="btn btn-primary mx-1" onClick={() => { handleExport() }}> <FaFileExport /></button>
                                <button type="button" className="btn btn-primary" onClick={() => { handleAccessDownload() }}><FaFilePdf /></button>
                            </div>

                        </div>

                    </div>
                    <div className="card-body">
                        <table className="table  table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    
                                    <th scope="col"> Is Logged In</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidatesTable.map((item => (
                                    <tr>
                                        <th scope="row">{item.username}</th>
                                        
    
                                        <td>
                                            {item.isLogged === true ? <span className="badge bg-success">logged In</span> : <span className="badge bg-danger">Not logged In</span>}
                                        </td>
                                        <td><button type="button" className="btn btn-primary" onClick={() => { handleAccessSingleDownload(item.id ,item.username ) }}><FaFilePdf /></button>
                                            {item.isLogged === true ? <button type="button" className="btn btn-primary mx-1" onClick={()=>{getUserLogDetails(item.id)}}><IoOpenSharp /></button> : <></>} </td>
                                    </tr>
                                )))}

                            </tbody>
                        </table>


                    </div>

                </div>

            </div>


            
        </div>
    )
}

export default DashBoard; 