import {SETTINGS_UPDATE} from '../actions/types';

const INITIAL_STATE = {
    isDarkThem: false,
    playsound: true,
    showNotifications: true
}

export default function settingsReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SETTINGS_UPDATE:
            return {...state, [action.setting]: action.value}
        default:
            return state;
    }
}