import axios from "axios";
import AuthService from "./AuthService";

export default class WorkingTimesService {
    static async addWorkingTime(token, selectedUserId, start, end) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'post',
            url: `http://localhost:4000/api/workingtimes/${selectedUserId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${token}`,
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

    static async getWorkingTimesByUser(token, selectedUserId) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'get',
            url: `http://localhost:4000/api/workingtimes/${selectedUserId}`,
            headers:{
                'Authorization' : `Bearer ${token}`,
            },
        });
    }

    static async editWorkingTimes(token, workingTimeId, start, end) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'put',
            url: `http://localhost:4000/api/workingtimes/${workingTimeId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${token}`,
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

    static async deleteWorkingTimes(token, workingTimeId) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'delete',
            url: `http://localhost:4000/api/workingtimes/${workingTimeId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization' : `Bearer ${token}`,
            },
        });
    }
}
