import axios from "axios";
import url from "./connections";
import getToken from "../service/getToken";
import { useNavigate } from "react-router-dom";

async function isLoggedIn() {
    const navigate  =  useNavigate
    try {

        const response = await axios.post(url() + "/api/auth/verify", {}, {
            headers: {
                Authorization: getToken()
            }
        })
        console.log("verify log " , response);
        return response ;

    }
    catch (error) {
        console.error(error);
        if (!error.response){
            console.log("cannot connect to server");
        }
        else if(error.response.status === 401 ){
            navigate("/");
        }
        else {
            console.log("some error occurred" , error);
        }
    }
}
export default isLoggedIn;