import * as types from '../types/Authentication'

let initialState = {
    user: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case types.LOGIN_FAILED: {
            return {
                ...state,
                user: null,
            };
        }
        case types.LOGOUT: {
            return {
                ...state,
                user: null,
            };
        }
        default:
            return state;
    }
}
export default authReducer;