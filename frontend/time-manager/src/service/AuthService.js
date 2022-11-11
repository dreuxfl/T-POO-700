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
        console.log(localStorage.getItem('access_token'))
        return localStorage.getItem('access_token');
    }
    static setToken(token){
        localStorage.setItem('access_token', token);
        console.log(token)
    }
    static async refreshAccessToken(){
        return axios({
            method: 'post',
            url: `http://localhost:4000/api/login/refresh`,
            withCredentials: true,
        }).then(response => {
            console.log(response.data.access_token)
            this.setToken(response.data.access_token);
        })
    }
}
