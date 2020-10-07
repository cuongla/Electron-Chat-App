import * as api from '../api/chats';
import db from '../db/firestore';
import {
    CHATS_FETCH_SUCCESS,
    CHATS_CREATE_SUCCESS
} from './types';

export const fetchChats = () => dispatch => {
    return api
        .fetchChats()
        .then(chats => dispatch({
            type: CHATS_FETCH_SUCCESS,
            chats
        }))
}

export const createChat = (formData, userId) => dispatch => {
    const newChat = {...formData};
    const useRef = db.doc(`profiles/${userId}`);
    newChat.admin = useRef; // use user id as an admin
    newChat.joinedUsers = [useRef]; // list of user ids

    return api
            .createChat(newChat)
            .then(_ => dispatch({ type: CHATS_CREATE_SUCCESS }));
}