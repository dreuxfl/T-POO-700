import axios from "axios";

export default class ChartsManagerService {
    static getBarChart() {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/chartmanager/barchart`
        });
    }
}
