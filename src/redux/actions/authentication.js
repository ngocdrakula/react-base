import jwt from 'jwt-decode'
import * as api from '../services/authentication'
import types from '../types'

export const loginLocal = (callback) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        try {
            const user = jwt(token);
            if (user?.exp * 1000 <= Date.now()) throw Error("Token Invalid");
            dispatch({ type: types.LOGIN_SUCCESS, payload: user });
            if (typeof callback === 'function') callback(user);
        }
        catch (error) {
            dispatch({ type: types.LOGIN_FAILED, payload: error });
            if (typeof callback === 'function') callback(error);
        }
    };
};
export const login = (body, callback) => {
    return dispatch => {
        api.loginRequest(body).then(res => {
            if (res?.data?.token) {
                localStorage.setItem('token', res.data.token);
                const user = jwt(res.data.token);
                dispatch({ type: types.LOGIN_SUCCESS, payload: user });
                if (typeof callback === 'function') callback(res.data);
            }
            else throw Error("Token Invalid");
        }).catch(error => {
            console.log('error')
            dispatch({ type: types.LOGIN_FAILED, payload: error });
            if (typeof callback === 'function') callback(error?.response);
        });
    };
};
export const logout = (callback) => {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch({ type: types.LOGOUT });
        if (typeof callback === 'function') callback();
    };
};

export const register = (body, callback) => {
    return dispatch => {
        api.registerRequest(body).then(res => {
            if (res?.data) {
                dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
                if (typeof callback === 'function') callback(res.data);
            }
            else throw Error("Đăng ký thất bại");
        }).catch(error => {
            dispatch({ type: types.REGISTER_FAILED, payload: error });
            if (typeof callback === 'function') callback(error?.response);
        });
    };
};
export const forgotPassword = (body, callback) => {
    return dispatch => {
        api.forgotPasswordRequest(body).then(res => {
            if (res?.data) {
                dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, payload: res?.data });
                if (typeof callback === 'function') callback(res.data);
            }
            else throw Error("Đổi mật khẩu thất bại");
        }).catch(error => {
            dispatch({ type: types.FORGOT_PASSWORD_FAILED, payload: error });
            if (typeof callback === 'function') callback(error?.response);
        });
    };
}; 