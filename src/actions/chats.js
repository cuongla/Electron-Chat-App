import * as api from '../api/chats';
import db from '../db/firestore';
import {
    CHATS_FETCH_SUCCESS,
    CHATS_FETCH_INIT,
    CHATS_CREATE_SUCCESS,
    CHATS_JOINED_SUCCESS
} from './types';

export const fetchChats = () => async (dispatch, getState) => {
    const { user } = getState().auth;
    dispatch({type: 'CHATS_FETCH_INIT'});
    const chats = await api.fetchChats();
  
    // get all chats with user id
    chats
      .forEach(chat => chat.joinedUsers = chat.joinedUsers.map(user => user.id));
  
    const sortedChats = chats.reduce((accuChats, chat) => {
      accuChats[chat.joinedUsers.includes(user.uid) ? 'joined' : 'available'].push(chat);
      return accuChats;
    }, {joined: [], available: []})
  
    dispatch({
      type: 'CHATS_FETCH_SUCCESS',
      ...sortedChats
    })
  
    return sortedChats;
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