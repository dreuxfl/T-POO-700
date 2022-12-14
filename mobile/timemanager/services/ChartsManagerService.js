import axios from "axios";
import moment from "moment";
import AuthService from "./AuthService";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

export default class ChartsManagerService {
    static async getLineChart() {
        await AuthService.refreshAccessToken();
        const id = parseInt(jwt_decode(await SecureStore.getItemAsync('access_token')).sub)
        const now = new Date();
        const end = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5)).format("YYYY-MM-DD HH:mm:ss");
        return axios({
            method: 'get',
            url: `${AuthService.BaseUrl}/chartmanager/linechart/${id}?start=${start}&end=${end}`,
            headers: {
                'Authorization': `Bearer ${await SecureStore.getItemAsync('access_token')}`,

            },
        });
    }
}
