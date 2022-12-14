import axios from "axios";
import moment from "moment";
import AuthService from "./AuthService";

export default class ChartsManagerService {
    
    static async getBarChart(token) {
        await AuthService.refreshAccessToken();

        return axios({
            method: 'get',
            url: `http://localhost:4000/api/chartmanager/barchart`,
            headers:{
                'Authorization' : `Bearer ${token}`,
            },
        })
    }

    static async getLineChart(token, userID) {
        await AuthService.refreshAccessToken();

        const now = new Date();
        const end = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)).format("YYYY-MM-DD HH:mm:ss");
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/chartmanager/linechart/${userID}?start=${start}&end=${end}`,
            headers:{
                'Authorization' : `Bearer ${token}`,
            },
        });
    }

    static async getPieChart(token, userID) {
        await AuthService.refreshAccessToken();

        const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/chartmanager/piechart/${userID}?date=${date}`,
            headers:{
                'Authorization' : `Bearer ${token}`,
            },
        });

    }

}
