import {
    CHATS_FETCH_SUCCESS,
    CHATS_FETCH_RESTART,
} from '../actions/types';
import { combineReducers } from 'redux';

function createChatReducer() {
  const joined = (state = [], action) => {
    switch(action.type) {
      case CHATS_FETCH_SUCCESS:
        return action.joined;
      case CHATS_FETCH_RESTART:
        return [];
      default: {
        return state;
      }
    }
  }

  const available = (state = [], action) => {
    switch(action.type) {
      case CHATS_FETCH_SUCCESS:
        return action.available;
      case CHATS_FETCH_RESTART:
        return [];
      default: {
        return state;
      }
    }
  }

  return combineReducers({
    joined,
    available
  })
}

export default createChatReducer();