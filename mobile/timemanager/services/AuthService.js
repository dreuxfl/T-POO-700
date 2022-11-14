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

    static async getToken(){
        new Promise(async (resolve, reject) => {
            try{
                return SecureStore.getItemAsync('access_token');
            } catch(e) {
                reject(e);
            }
        });
    }
    static async setToken(token){
        await SecureStore.setItemAsync('access_token', JSON.stringify(token));
    }
    static async refreshAccessToken(){
        return axios({
            method: 'post',
            url: `https://57e5-163-5-23-136.eu.ngrok.io/api/login/refresh`,
            withCredentials: true,
        }).then(response => {
            console.log(response.data.access_token)
            this.setToken(response.data.access_token);
        })
    }
}
