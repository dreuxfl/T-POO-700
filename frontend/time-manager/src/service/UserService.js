import axios from "axios";

export default class UserService {
    static getUsers() {
        return axios({
            method: 'get',
            url: `http://localhost:4000/api/users/`
        });
    }
}
