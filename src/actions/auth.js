import * as api from '../api/auth';
import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_INIT,
    USER_REGISTER_ERROR,
    USER_LOGIN_INIT,
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    AUTH_ON_INIT,
    AUTH_ON_SUCCESS,
    AUTH_ON_ERROR,
    CHATS_FETCH_RESTART
} from './types';

export const registerUser = formData => dispatch => {
    dispatch({ type: USER_REGISTER_INIT });
    return api.register(formData)
        .then(user => dispatch({
            type: USER_REGISTER_SUCCESS,
            user
        }))
        .catch(error => dispatch({
            type: USER_REGISTER_ERROR,
            error
        }));
}

export const loginUser = formData => dispatch => {
    dispatch({ type: USER_LOGIN_INIT });
    return api
        .login(formData)
        .then(user => dispatch({
            type: USER_LOGIN_SUCCESS,
            user
        }))
        .catch(error => {
            dispatch({
                type: USER_LOGIN_ERROR,
                error
            })
        })
}

export const logout = () => dispatch =>
    api
        .logout()
        .then(_ => {
            dispatch({ type: USER_LOGOUT_SUCCESS });
            dispatch({ type: CHATS_FETCH_RESTART });
        })

export const listenToAuthChanges = () => dispatch => {
    dispatch({ type: AUTH_ON_INIT });
    return api.onAuthStateChanges(async authUser => {
        if (authUser) {
            const userProfile = await api.getUserProfile(authUser.uid);
            dispatch({ 
                type: AUTH_ON_SUCCESS, 
                user: userProfile 
            });
        } else {
            dispatch({ type: AUTH_ON_ERROR });
        }
    })
}