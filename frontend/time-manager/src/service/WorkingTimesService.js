import axios from "axios";

export default class WorkingTimesService {
    static getWorkingTimesByUser(selectedUserID) {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/workingtimes/${selectedUserID}`,
        });
    }

    static editWorkingTimes(workingTimeId, start, end) {
        return axios({
            method: 'put',
            url: `http://localhost:4000/api/workingtimes/${workingTimeId}`,
            responseType: 'json',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                // 'Authorization' : `Bearer ${token}`,
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
}
