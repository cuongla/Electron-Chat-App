import {
    CHATS_FETCH_SUCCESS
} from '../actions/types';

const INTIAL_STATE = {
    items: []
}

export default function chatReducer(state = INTIAL_STATE, action) {
    switch(action.type) {
        case CHATS_FETCH_SUCCESS:
            return { items: action.chats}
        default:
            return state
    }
}