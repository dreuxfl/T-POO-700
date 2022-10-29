import axios from "axios";
import moment from "moment";

export default class ChartsManagerService {
    static getBarChart() {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/chartmanager/barchart`
        });
    }
    static getLineChart(userID) {
        const now = new Date();
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/chartmanager/linechart/${userID}`,
            params: {
                start: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                end: moment(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)).format("YYYY-MM-DD HH:mm:ss")
            }
        });
    }

    static getPieChart(userID) {
        const now = new Date();
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/chartmanager/linechart/${userID}`,
            params: {
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            }
        });
    }
}
