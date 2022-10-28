import axios from "axios";

export default class WorkingTimesService {
    static getWorkingTimes() {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/workingtimes/`
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
