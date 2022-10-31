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
        const end = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)).format("YYYY-MM-DD HH:mm:ss");
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/chartmanager/linechart/${userID}?start=${start}&end=${end}`,
        });
    }

    static getPieChart(userID) {
        const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/chartmanager/piechart/${userID}?date=${date}`,
        });

    }

}