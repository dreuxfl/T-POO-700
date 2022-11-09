import axios from "axios";
import AuthService from "./AuthService";

export default class ClockService {
    static postClock(userId, status, time) {
        axios({
            method: 'post',
            url: `http://localhost:4000/api/clocks/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${AuthService.getToken()}`,
            },
            data: JSON.stringify({ 
                "clock":
                {
                    "status": status,
                    "time": time,
                }
            })
        }).catch(err => {
            console.log(err)
            if(err.response.status === 401){
                console.log(AuthService.refreshAccessToken())
            }
        }).then(response => {
            return response
        })
    }

    static getClocks(userId) {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/clocks/${userId}`,
            headers:{
                'Authorization' : `Bearer ${AuthService.getToken()}`,
            },
        });
    }

    static getCurrentClocks(userId) {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/clocks/${userId}/today`,
            headers:{
                'Authorization' : `Bearer ${AuthService.getToken()}`,
            },
        });
    }
}