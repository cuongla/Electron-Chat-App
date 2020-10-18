import * as api from '../api/connection';
import { 
    CONNECTION_USER_STATUS_CHANGE
} from '../actions/types';

export const checkUserConnection = () => dispatch => api.onConnectionChanged((isConnected) => {
    dispatch({type: CONNECTION_USER_STATUS_CHANGE})
})