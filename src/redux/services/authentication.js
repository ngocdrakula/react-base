import axios from "../../utils/axios";

export const loginRequest = (body) => {
    return axios.post('user/login', body);
};
export const registerRequest = (body) => {
    return axios.post('user/register', body);
};
export const forgotPasswordRequest = (body) => {
    return axios.post('user/forgot-password', body);
}; 