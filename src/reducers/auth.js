import {
    USER_LOGIN_SUCCESS,
    USER_REGISTER_SUCCESS,
    AUTH_ON_SUCCESS,
    AUTH_ON_INIT,
    AUTH_ON_ERROR,
} from '../actions/types';
import { combineReducers } from 'redux';
import { createErrorReducer, createIsFetchingReducer } from './common';

const createLoginReducer = () =>
    combineReducers({
        isChecking: createIsFetchingReducer(`USER_LOGIN`),
        error: createErrorReducer(`USER_LOGIN`)
    })

const createRegisterReducer = () =>
    combineReducers({
        isChecking: createIsFetchingReducer(`USER_REGISTER`),
        error: createErrorReducer(`USER_REGISTER`)
    })

function createAuthReducer() {
    const user = (state = null, action) => {
        switch (action.type) {
            case AUTH_ON_ERROR:
            case AUTH_ON_INIT:
                return null;
            case USER_REGISTER_SUCCESS:
            case USER_LOGIN_SUCCESS:
            case AUTH_ON_SUCCESS:
                return action.user ? action.user : '';
            default:
                return state;
        }
    }

    return combineReducers({
        user,
        isChecking: createIsFetchingReducer(`AUTH_ON`),
        login: createLoginReducer(),
        register: createRegisterReducer()
    })
}

export default createAuthReducer();
