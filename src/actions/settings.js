import {
    SETTINGS_UPDATE, 
    SETTINGS_INITIAL_LOAD
} from './types';

// updating settings for app
export const updateSettings = (setting, value) => {
    return {
      type: SETTINGS_UPDATE,
      setting,
      value
    }
  }

// loading settings
export const loadInitialSettings = () => ({
    type: SETTINGS_INITIAL_LOAD
})