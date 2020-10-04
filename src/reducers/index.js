import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// reducers
import chatReducers from './chat';

export const init = () => {
    const middlewares = [thunk, applyMiddleware];

    const reducer = combineReducers({
        chats: chatReducers
    });

    const store = createStore(
        reducer,
        applyMiddleware(...middlewares)
    );

    return store;
};

