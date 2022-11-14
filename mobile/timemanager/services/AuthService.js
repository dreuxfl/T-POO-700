import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const BaseUrl = "https://57e5-163-5-23-136.eu.ngrok.io/api";
// const BaseUrl = "http://192.168.43.108:4000/api"

export default class AuthService {

    static BaseUrl = BaseUrl;
    static login(username, password) {
        console.log(`${BaseUrl}/login?username=${username}&password=${password}`)
        return axios({
            method: 'post',
            url: `${BaseUrl}/login?username=${username}&password=${password}`,
            withCredentials: true,
        })
    }

    static async setToken(token) {
        await SecureStore.setItemAsync('access_token', token);
    }
    static async refreshAccessToken() {
        return axios({
            method: 'post',
            url: `${BaseUrl}/login/refresh`,
            withCredentials: true,
        }).then(response => {
            this.setToken(response.data.access_token);
        })
    }
}
