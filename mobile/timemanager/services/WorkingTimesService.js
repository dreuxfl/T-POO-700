import axios from "axios";
import AuthService from "./AuthService";
import * as SecureStore from "expo-secure-store";

export default class WorkingTimesService {

    static async addWorkingTime(selectedUserId, start, end) {
        await AuthService.refreshAccessToken();
        return axios({
            method: 'post',
            url: `http://localhost:4000/api/workingtimes/${selectedUserId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            },
            data: JSON.stringify({
                "workingtime":
                    {
                        "start": start,
                        "end": end,
                    }
            })
        });
    }

    static async getWorkingTimesByUser(selectedUserId) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'get',
            url: `http://localhost:4000/api/workingtimes/${selectedUserId}`,
            headers:{
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            },
        });
    }

    static async editWorkingTimes(workingTimeId, start, end) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'put',
            url: `http://localhost:4000/api/workingtimes/${workingTimeId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            },
            data: JSON.stringify({
                "workingtime":
                    {
                        "start": start,
                        "end": end,
                    }
            })
        });
    }

    static async deleteWorkingTimes(workingTimeId) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'delete',
            url: `${AuthService.BaseUrl}/workingtimes/${workingTimeId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${await SecureStore.getItemAsync('access_token')}`,
            },
        });
    }
}
