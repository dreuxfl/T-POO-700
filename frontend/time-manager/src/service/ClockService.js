import axios from "axios";

export default class ClockService {
    static postClock(token, userId, status, time) {
        return axios({
            method: 'post',
            url: `http://localhost:4000/api/clocks/${userId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${token}`,
            },
            data: JSON.stringify({ 
                "clock":
                {
                    "status": status,
                    "time": time,
                }
            })
        });
    }

    static getClocks(token, userId) {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/clocks/${userId}`,
            headers:{
                'Authorization' : `Bearer ${token}`,
            },
        });
    }

    static getCurrentClocks(token, userId) {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/clocks/${userId}/today`,
            headers:{
                'Authorization' : `Bearer ${token}`,
            },
        });
    }
}