import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const BaseUrl = "http://10.136.78.205:4000/api";

export default class AuthService {
    static BaseUrl = BaseUrl;
    static login(username, password) {
        return axios({
            method: 'post',
            url: `${BaseUrl}/login?username=${username}&password=${password}`,
            withCredentials: true,
        })
    }

    static async setToken(token) {
        await SecureStore.setItemAsync('access_token', token);
    }
    
    static async refreshAccessToken(){
        return axios({
            method: 'post',
            url: `${BaseUrl}/login/refresh`,
            withCredentials: true,
        }).then(response => {
            this.setToken(response.data.access_token);
        })
    }
}
