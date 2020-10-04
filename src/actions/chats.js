import * as api from '../api/chats';
import {
    CHATS_FETCH_SUCCESS
} from './types';

export const fetchChats = () => dispatch => {
    return api
        .fetchChats()
        .then(chats => dispatch({
            type: CHATS_FETCH_SUCCESS,
            chats
        }))
}