import axios from "axios";
import url from "./connections";
import getToken from "../service/adminGetToken";
import { useNavigate } from "react-router-dom";

async function isLoggedIn() {
    const navigate  =  useNavigate
    try {

        const response = await axios.post(url() + "/api/admin/verify", {}, {
            headers: {
                Authorization: getToken()
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
            // navigate("/admin");
            return false;
        }
        else {
            console.log("some error occurred" , error);
        }
    }
}
export default isLoggedIn;