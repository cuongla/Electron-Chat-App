import {SETTINGS_UPDATE} from './types';

export const updateSettings = (setting, value) => {
    return {
        type: SETTINGS_UPDATE,
        setting, 
        value
    }
}