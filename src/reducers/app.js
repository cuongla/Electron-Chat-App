import {APP_IS_OFFLINE, APP_IS_ONLINE} from '../actions/types';
import {combineReducers} from 'redux';

function createAppReducer() {
    const { onLine } = navigator;

    const isOnline = (state = onLine, action) => {
        switch(action.type) {
            case APP_IS_OFFLINE:
            case APP_IS_ONLINE:
                return action.isOnline
            default:
                return state
        }
    }

    return combineReducers({ isOnline })
}

export default createAppReducer;
