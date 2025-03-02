import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user/authentication/';

const authService = {
    login: (email, password) => {
        return axios.post(`${API_URL}login`, { email, password }).then((response) => response.data);
    },
    signUp: (email, password) => {
        return axios.post(`${API_URL}signup`, { email, password }).then((response) => response.data);
    },
    passwordChange: (email) => {
        return axios.get(`${API_URL}password/change`, { params: { email } }).then((response) => response.data);
    }
};

export default authService;
