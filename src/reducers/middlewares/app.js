import { APP_IS_OFFLINE, APP_IS_ONLINE, USER_LOGOUT_SUCCESS, SETTINGS_UPDATE, SETTINGS_INITIAL_LOAD } from '../../actions/types';
import Notification from '../../utils/Notification';
import Storage from '../../utils/Storage';

export default store => next => action => {
    switch (action.type) {
        case APP_IS_ONLINE:
        case APP_IS_OFFLINE: {
            const { showNotifications } = store.getState().settings
            if (showNotifications) {
                Notification.show({
                    title: 'Connection status:',
                    body: action.isOnline ? 'Online' : 'Offline'
                });
            }
        }
        case SETTINGS_UPDATE: {
            const { setting, value } = action;
            const currentSettings = Storage.getItem('app-settings');
            const settings = { ...currentSettings, [setting]: value }
            Storage.setItem('app-settings', settings);
        }
        case USER_LOGOUT_SUCCESS: {
            const { messagesSubs } = store.getState().chats;
            if (messagesSubs) {
                Object.keys(messagesSubs).forEach(messageSub => messagesSubs[messageSub]())
            }
        }
    }

    next(action);
}