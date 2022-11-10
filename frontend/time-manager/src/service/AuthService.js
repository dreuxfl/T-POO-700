import axios from "axios";

export default class AuthService {
    static login(username, password){
        return axios({
            method: 'post',
            url: `http://localhost:4000/api/login?username=${username}&password=${password}`,
            withCredentials: true,
        })
    }
    static getToken(){
        return localStorage.getItem('access_token');
    }
    static refreshAccessToken(){
        axios({
            method: 'post',
            url: `http://localhost:4000/api/login/refresh`,
            withCredentials: true,
            headers:{
                'Authorization' : `Bearer ${this.getToken()}`,
                'Access-Control-Allow-Origin' : "http://localhost:8080/"
            },
        }).then(response => {
            return response.access_token;
        }).catch(()=> {
            return false
        });
    }
}
