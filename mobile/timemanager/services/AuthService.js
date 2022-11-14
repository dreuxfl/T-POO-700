import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export default class AuthService {
    static login(username, password){
        return axios({
            method: 'post',
            url: `https://8e76-163-5-23-136.eu.ngrok.io/api/login?username=${username}&password=${password}`,
            withCredentials: true,
        })
    }
    static getToken(){
        return SecureStore.getItemAsync('access_token');
    }
    static setToken(token){
        SecureStore.setItemAsync('access_token', token);
    }
    static async refreshAccessToken(){
        return axios({
            method: 'post',
            url: `https://8e76-163-5-23-136.eu.ngrok.io/api/login/refresh`,
            withCredentials: true,
        }).then(response => {
            console.log(response.data.access_token)
            this.setToken(response.data.access_token);
        })
    }
}
