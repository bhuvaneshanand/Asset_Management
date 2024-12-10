import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/assetapp/auth";
class AuthService{

    registerUser(userObj){
        console.log("service register")
        return axios({
            method: 'post',
            url: BASE_URL + '/signup',
            data: userObj,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    loginUser(userObj){
        console.log("service login")
        return axios({
            method: 'post',
            url: BASE_URL + '/login',
            data: userObj,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

export default new AuthService();