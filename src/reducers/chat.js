import {
    CHATS_FETCH_SUCCESS,
    CHATS_FETCH_RESTART,
    CHATS_JOIN_SUCCESS,
} from '../actions/types';
import { combineReducers } from 'redux';
import {createReducer} from '@reduxjs/toolkit';

function createChatReducer() {
  const joined = (state = [], action) => {
    switch(action.type) {
      case CHATS_FETCH_SUCCESS:
        return action.joined;
      case CHATS_JOIN_SUCCESS:
        return [...state, action.chat];
      case CHATS_FETCH_RESTART:
        return [];
      default: {
        return state;
      }
    }
  }

  const activeChats = createReducer({}, {
    "CHATS_SET_ACTIVE_CHAT": (state, action) => {
      const { chat } = action;
      state[chat.id] = chat;
    }
  })

  const available = (state = [], action) => {
    switch(action.type) {
      case CHATS_FETCH_SUCCESS:
        return action.available;
      case CHATS_FETCH_RESTART:
        return;
      case CHATS_JOIN_SUCCESS:
        return state.filter(chat => chat.id !== action.chat.id);
      default: {
        return state;
      }
    }
  }

  return combineReducers({
    joined,
    available,
    activeChats
  })
}

export default createChatReducer();