import {SETTINGS_UPDATE, SETTINGS_INITIAL_LOAD} from './types';

export const updateSettings = (setting, value) => {
    return {
        type: SETTINGS_UPDATE,
        setting, 
        value
    }
}

export const loadInitialSettings = () => ({
    type: SETTINGS_INITIAL_LOAD
})