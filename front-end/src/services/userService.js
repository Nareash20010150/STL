import axios from "axios";

const API_URL = "http://localhost:6001/api/user";


class userService {
    register(payload) {
        console.log("PAYLOAD", payload);
        return axios.post(API_URL + "/register", payload).then((response) => {
            console.log("RESPONSE", response.data);
            return response.data;
        });
    }

    login(payload) {
        console.log("PAYLOAD", payload);
        return axios.post(API_URL + "/login", payload).then((response) => {
            console.log("RESPONSE", response.data);

            if (response.data.payload) {
                localStorage.setItem("user", JSON.stringify(response.data.payload));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new userService();
