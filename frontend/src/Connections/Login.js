import axios from 'axios';
import url from "./connections";
import { response } from 'express';

async function LoginConnection(username, password, successCallBack, errorCallBack) {
    try {
        const path = "api/login"
        const response = await axios.post(url + path, {
            username, password
        });
        console.log("Login successfully ", response.data);
        successCallBack(response.data)
    }
    catch (error) {
        console.error("Login failed ", error)
        errorCallBack(response.data);
    }
}

export default LoginConnection;
