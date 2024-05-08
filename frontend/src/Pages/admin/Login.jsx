import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDangerous } from "react-icons/md";
import url from "../../Connections/connections";
import isLoggedIn from "../../Connections/isAdminLoggedIn";
import adminGetToken from "../../service/adminGetToken";
function Login() {
    const  [username , setUsername] = useState();
    const [password , setPassword] = useState();
    const [errorMessage , setErrorMessage] = useState(false)
    const navigate = useNavigate();


    function isAuthenticated() {
        const caller = async () => {
            const response = await isLoggedIn();
            const authentic = response.data.isAuthenticated;
            const token = adminGetToken();
            console.log("token ", token);
            if (token !== null) {
                if (authentic) {
                    navigate("/dashboard")
                }
            }
        }
        caller();
    }
    isAuthenticated();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            
            const  response  = await axios.post(url()+ "/api/admin/login" , {username ,password}) ;
            console.log(response.data);
            localStorage.setItem("super" , response.data.token );
            navigate("/dashboard")
        }
        catch(error){
            console.error("error get data  from server")
        }
    }

    return (
        <div>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {/* <img src={logo} style={{ height: 100 }} /> */}
                        <h3>Admin Login</h3>
                    </div>
                    <p className="or"></p>
                    {
                        errorMessage ? (<div className="error-msg">

                            <MdDangerous />  {errorMessage}
                        </div>) : (<></>)
                    }


                    <div className="email-login">
                        <label for="email"> <b>Username</b></label>
                        <input type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} required />
                        <label for="psw"><b>Password</b></label>
                        <input type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button className="cta-btn">Log In</button>
                    {/* <a class="forget-pass" href="#">Forgot password?</a> */}
                </form>
            </div>



        </div>
    )
}


export default Login; 