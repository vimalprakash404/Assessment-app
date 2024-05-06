import "./css/dashboard.css"
import { FiUser } from "react-icons/fi";
import { LuUserCheck, LuUserX } from "react-icons/lu";
import { FaFileExport } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { IoOpenSharp } from "react-icons/io5";


function DashBoard() {
    return (
        <div className="">
            <nav className="navbar navbar-light  justify-content-between text-light" >
                <div >
                    <a className="navbar-brand inline-block" href="#">
                        <img src={logo} width="50" height="50" className="inline-block align-top" alt="" />
                    </a>
                </div>

                <button className="btn btn-light mx-5">Logout</button>
            </nav>
            <div className="row justify-center-around">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <b>Candidates</b>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col"><h1 className=" text-primary">100</h1> </div>
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
                                <div className="col"><h1 className=" text-primary">100</h1> </div>
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
                                <div className="col"><h1 className=" text-primary">100</h1> </div>
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
                                <button type="button" className="btn btn-primary mx-1"> <FaFileExport /></button>
                                <button type="button" className="btn btn-primary"><FaFilePdf /></button>
                            </div>

                        </div>

                    </div>
                    <div className="card-body">
                        <table className="table  table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Url</th>
                                    <th scope="col">Password</th>
                                    <th scope="col"> Is Logged In</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1897</th>
                                    <td>Mark</td>
                                    <td>*****</td>
                                    <td>
                                        <span className="badge bg-success">logged In</span>
                                    </td>
                                    <td><button type="button" className="btn btn-primary"><FaFilePdf /></button>
                                    <button type="button" className="btn btn-primary mx-1"><IoOpenSharp /></button></td>

                                </tr>
                                <tr>
                                    <th scope="row">1898</th>
                                    <td>Jacob</td>
                                    <td>*****</td>
                                    <td>
                                        <span className="badge bg-success">logged In</span>
                                    </td>
                                    <td><button type="button" className="btn btn-primary"><FaFilePdf /></button>
                                    <button type="button" className="btn btn-primary mx-1"><IoOpenSharp /></button></td>
                                </tr>
                                <tr>
                                    <th scope="row">1899</th>
                                    <td>Larry</td>
                                    <td>*****</td>
                                    <td>
                                        <span className="badge bg-danger">Not logged In</span>
                                    </td>
                                    <td><button type="button" className="btn btn-primary"><FaFilePdf /></button></td>
                                </tr>
                                <tr>
                                    <th scope="row">1900</th>
                                    <td>Larry</td>
                                    <td>*****</td>
                                    <td>
                                        <span className="badge bg-danger">Not logged In</span>
                                    </td>
                                    <td><button type="button" className="btn btn-primary mx-1"><FaFilePdf /></button>
                                       </td>
                                </tr>
                            </tbody>
                        </table>


                    </div>

                </div>

            </div>

        </div>
    )
}

export default DashBoard; 