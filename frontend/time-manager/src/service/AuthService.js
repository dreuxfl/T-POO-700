import axios from "axios";

export default class AuthService {
    static login(username, password){
        return axios({
            method: 'post',
            url: `http://localhost:4000/api/login?username=${username}&password=${password}`,
            // withCredentials: true,
            
        })
    }
    static getToken(){
        return localStorage.getItem('access_token');
    }
    static refreshAccessToken(){
        axios({
            method: 'post',
            url: `http://localhost:4000/api/login/refresh`,
            // withCredentials: true,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${this.getToken()}`,
            },
        }).then(response => {
            return response.access_token;
        }).catch(()=> {
            return false
        });
    }
}