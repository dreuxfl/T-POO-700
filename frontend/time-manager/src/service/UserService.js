import axios from "axios";

export default class UserService {

    static postUser(email, username, password) {
        return axios({
            method: 'post',
            url: `http://localhost:4000/api/users/`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                // 'Authorization' : `Bearer ${token}`,
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

    static putUser(email, username, password, userId) {
        return axios({
            method: 'put',
            url: `http://localhost:4000/api/users/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                // 'Authorization' : `Bearer ${token}`,
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

    static getUser(userId) {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/users/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                // 'Authorization' : `Bearer ${token}`,
            }
        });
    }

    static deleteUser(userId) {
        return axios({
            method: 'delete',
            url: `http://localhost:4000/api/users/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                // 'Authorization' : `Bearer ${token}`,
            }
        });
    }

    static getUsers() {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/users/`
        });
    }
}

