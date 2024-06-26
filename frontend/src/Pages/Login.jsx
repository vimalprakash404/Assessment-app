// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import getToken from '../service/getToken';
import "./css/login.css";
import "./css/message.css";
import { MdDangerous } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import url from '../Connections/connections';
import isLoggedIn from '../Connections/isLoggedIn';

const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    function isAuthenticated() {
        const caller = async () => {
            const response = await isLoggedIn();
            const authentic = response.data.isAuthenticated;
            const token = getToken();
            console.log("token ", token);
            if (token !== null) {
                if (authentic) {
                    navigate("/instruction")
                }
            }
        }
        caller();
    }
    isAuthenticated();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', {
                username: username,
                password: password
            });
            console.log('Login successful:', response.data);

            sessionStorage.setItem("token", response.data["token"])
            // Handle successful login response here
            setErrorMessage(false);
            navigate("/instruction", { replace: true, });
        } catch (error) {
            console.error('Login failed:', error);
            if (!error.response) {
                // Network error
                console.error('Network error:', error.message);
                // Handle network error here
                setErrorMessage("please connect internet")
            } else {
                // Server responded with a status code outside of 2xx range
                console.error('HTTP error:', error.response.status);
                // Handle other HTTP errors here
                const responseData = error.response.data;
                setErrorMessage(responseData.message);
                sessionStorage.removeItem("token");
            }
            // Handle login error here

        }
    };

    return (
        <div>

            <div className="card">
                <form onSubmit={handleLogin}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src={logo} style={{ height: 100 }} />

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
    );
};

export default Login;
