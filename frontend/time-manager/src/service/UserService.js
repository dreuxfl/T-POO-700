import axios from "axios";
import AuthService from "./AuthService";

export default class UserService {

    
    static postUser(email, username, password) {
        return axios({
            method: 'post',
            url: `http://localhost:4000/api/users/`,
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

    static async putUser(token, userId, email, username, password) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'put',
            url: `http://localhost:4000/api/users/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${token}`,
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

    static async getUser(token, userId) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'get',
            url: `http://localhost:4000/api/users/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${token}`,
            }
        });
    }

    static getProfile(token) {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/profile/`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${token}`,
            }
        });
    }

    static deleteUser(token, userId) {
        return axios({
            method: 'delete',
            url: `http://localhost:4000/api/users/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${token}`,
            }
        });
    }

    static getUsers(token) {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/users/`,
            headers:{
                'Authorization' : `Bearer ${token}`,
            }
        });
    }
}

