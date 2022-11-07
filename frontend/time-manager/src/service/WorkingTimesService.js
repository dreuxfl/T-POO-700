import axios from "axios";

export default class WorkingTimesService {
    static addWorkingTime(token, selectedUserId, start, end) {
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

    static getWorkingTimesByUser(token, selectedUserId) {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/workingtimes/${selectedUserId}`,
            headers:{
                'Authorization' : `Bearer ${token}`,
            },
        });
    }

    static editWorkingTimes(token, workingTimeId, start, end) {
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

    static deleteWorkingTimes(token, workingTimeId) {
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
