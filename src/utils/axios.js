import axios from "axios";
export const BASE_URL = 'http://api.com.vn/api/';

const defaultConfig = {
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 100000,
};

class BaseService {
    constructor() {
        const instance = axios.create(defaultConfig);
        instance.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');
            config.headers.Authorization = token ? `Bearer ${token}` : '';
            return config;
        });
        instance.interceptors.response.use(this.handleSuccess, this.handleError);
        this.instance = instance;
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject(error);
    }

    get(url) {
        return this.instance.get(url);
    }

    post(url, body) {
        return this.instance.post(url, body)
    }
    download(url) {
        return this.instance({ method: 'GET', url, responseType: 'blob' });
    }
}

export default new BaseService();