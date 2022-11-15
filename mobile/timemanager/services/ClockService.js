import axios from "axios";
import AuthService from "./AuthService";
import * as SecureStore from "expo-secure-store";

export default class ClockService {
    static async postClock(userId, status, time) {
        await AuthService.refreshAccessToken();
        let token = await SecureStore.getItemAsync('access_token');
        return axios({
            method: 'post',
            url: `${AuthService.BaseUrl}/clocks/${userId}`,
            responseType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`,
            },
            data: JSON.stringify({
                "clock":
                    {
                        "status": status,
                        "time": time,
                    }
            })
        })

    }

    static async getClocks(userId) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'get',
            url: `${AuthService.BaseUrl}/clocks/${userId}`,
            headers:{
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            },
        });
    }

    static async getCurrentClocks(userId) {
        await AuthService.refreshAccessToken();
        let token = await SecureStore.getItemAsync('access_token');
        return axios({
            method: 'get',
            url: `${AuthService.BaseUrl}/clocks/${userId}/today`,
            headers:{
                'Authorization' : `Bearer ${token}`,
            },
        });
    }
}