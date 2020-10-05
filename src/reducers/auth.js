import {
    USER_LOGIN_INIT,
    USER_REGISTER_INIT,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_SUCCESS,
    AUTH_ON_INIT,
    AUTH_ON_SUCCESS,
    AUTH_ON_ERROR
} from '../actions/types';

const DEFAULT_STATE = {
    user: null,
    isChecking: false
}


export default function authReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case USER_LOGIN_INIT:
        case USER_REGISTER_INIT:
            return { ...state, isChecking: true };
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return { ...state, isChecking: false };
        case AUTH_ON_INIT:
            return { user: null, isChecking: true }
        case AUTH_ON_SUCCESS:
            return { user: action.user, isChecking: false }
        case AUTH_ON_ERROR:
            return { user: null, isChecking: false }
        default:
            return state;
    }
}