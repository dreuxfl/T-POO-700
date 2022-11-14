import axios from "axios";
import AuthService from "./AuthService";
import * as SecureStore from "expo-secure-store";

export default class UserService {
    static postUser(email, username, password) {
        return axios({
            method: 'post',
            url: `${AuthService.BaseUrl}/api/users/`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: JSON.stringify({"user":
                {
                    "email": email,
                    "username": username,
                    "password": password
                }
            })
        });
    }

    static async putUser(userId, email, username, password) {
        await AuthService.refreshAccessToken();
        return axios({
            method: 'put',
            url: `${AuthService.BaseUrl}/users/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            },
            data: JSON.stringify({"user":
                {
                    "email": email,
                    "username": username,
                    "password": password
                }
            })
        });
    }

    static async getUser(userId) {
        await AuthService.refreshAccessToken();
        return axios({
            method: 'get',
            url: `${AuthService.BaseUrl}/users/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            }
        });
    }

    static async getProfile() {
        return axios({
            method: 'get',
            url: `${AuthService.BaseUrl}/profile/`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            }
        });
    }
}
