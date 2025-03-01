import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user/authentication/';

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'login', { email, password });
    return response.data;
};

const signUp = async (email, password) => {
    const response = await axios.post(API_URL + 'signup', { email, password });
    return response.data;
};

const passwordChange = async (email) => {
    const response = await axios.get(API_URL + 'password/change', { params: { email } });
    return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login,
    signUp,
    passwordChange,
};