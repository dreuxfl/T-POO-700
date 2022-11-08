import axios from "axios";

export default class UserService {

    static login(username, password){
        return axios({
            method: 'post',
            url: `http://localhost:4000/api/login?username=${username}&password=${password}`
        })
    }
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

    static putUser(token, email, username, userId) {
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
                }
            })
        });
    }

    static getUser(token, userId) {
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

