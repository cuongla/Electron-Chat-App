import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// reducers
import chatReducer from './chat';
import authReducer from './auth';
import appReducer from './app';

// middlewares
import appMiddleware from './middlewares/app';
import {USER_LOGOUT_SUCCESS} from  '../actions/types';

export const init = () => {
    const middlewares = [thunk, appMiddleware];

    const reducer = combineReducers({
        chats: chatReducer,
        auth: authReducer,
        app: appReducer
    });

    const rootReducer = (state, action) => {
        if(action.type === USER_LOGOUT_SUCCESS) state = undefined;

        return reducer(state, action);
    }

    const store = createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    );

    return store;
};

