import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// reducers
import chatReducer from './chat';
import authReducer from './auth';
import appReducer from './app';
import settingsReducer from './settings';

// middlewares
import appMiddleware from './middlewares/app';
import { USER_LOGOUT_SUCCESS } from '../actions/types';

export const init = () => {
    const middlewares = [thunk, appMiddleware];

    const reducer = combineReducers({
        chats: chatReducer,
        auth: authReducer,
        app: appReducer,
        settings: settingsReducer
    });

    const rootReducer = (state, action) => {
        if (action.type === USER_LOGOUT_SUCCESS) {
            Object.keys(state).forEach(sk => {
                if (state[sk].savable) {
                    return;
                }

                state[sk] = undefined;
            })
        }

        return reducer(state, action);
    }

    const store = createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    );

    return store;
};

