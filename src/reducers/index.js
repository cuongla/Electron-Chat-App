import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// reducers
import chatReducer from './chat';
import authReducer from './auth';

export const init = () => {
    const middlewares = [thunk];

    const reducer = combineReducers({
        chats: chatReducer,
        auth: authReducer
    });

    const store = createStore(
        reducer,
        applyMiddleware(...middlewares)
    );

    return store;
};

