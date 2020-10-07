import * as api from '../api/chats';
import db from '../db/firestore';
import {
    CHATS_FETCH_SUCCESS,
    CHATS_CREATE_SUCCESS,
    CHATS_JOINED_SUCCESS
} from './types';

export const fetchChats = () => dispatch => {
    return api
        .fetchChats()
        .then(chats => dispatch({
            type: CHATS_FETCH_SUCCESS,
            chats
        }))
}

export const createChat = (formData, userId) => async dispatch => {
    const newChat = {...formData};
    newChat.admin = db.doc(`profiles/${userId}`);
  
    const chatId = await api.createChat(newChat);
    dispatch({type: CHATS_CREATE_SUCCESS});
    await api.joinChat(userId, chatId)
    dispatch({type: CHATS_JOINED_SUCCESS});
    return chatId;
}