import { APP_IS_OFFLINE, APP_IS_ONLINE, USER_LOGOUT_SUCCESS } from '../../actions/types';
import Notification from '../../utils/Notification';

export default store => next => action => {
    switch (action.type) {
        case APP_IS_ONLINE:
        case APP_IS_OFFLINE: {
            Notification.show({
                title: 'Connection status',
                body: action.isOnline ? 'Online' : 'Offline'
            })
        }
        case USER_LOGOUT_SUCCESS: {
            const { messagesSubs } = store.getState().chats;
            if (messagesSubs) {
                Object.keys(messagesSubs).forEach(messageSub =>  messagesSubs[messageSub]())
            }
        }
    }

    next(action);
}