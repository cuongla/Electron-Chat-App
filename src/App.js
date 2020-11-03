import React, { useEffect } from 'react';
import HomeView from './view/Home';
import SettingsView from './view/Settings';
import WelcomeView from './view/Welcome';
import ChatView from './view/Chat';
import ChatCreateView from './view/ChatCreate';
import LoadingView from './components/shared/LoadingView';
import ContentWrapper from './utils/ContentWrapper';
import AuthRoute from './utils/AuthRoute';
import firebase from 'firebase/app';

const storage = firebase.storage();

const getDefaultPhoto = storage.refFromURL('gs://electron-app-614f0.appspot.com/');

// redux
import { Provider, useDispatch, useSelector } from 'react-redux';
const store = require('./reducers').init();
// router
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
//actions
import { listenToAuthChanges } from './actions/auth';
import { listenToConnectionChanges } from './actions/app';
import { checkUserConnection } from './actions/connection';
import {loadInitialSettings} from './actions/settings';


function ChatApp() {
    const dispatch = useDispatch();
    const isChecking = useSelector(({ auth }) => auth.isChecking);
    const isOnline = useSelector(({ app }) => app.isOnline);

    useEffect(() => {
        dispatch(loadInitialSettings());
        const unsubFromAuth = dispatch(listenToAuthChanges());
        const unsubFromConnection = dispatch(listenToConnectionChanges());
        const unsubFromUserConnection = dispatch(checkUserConnection());

        return () => {
            unsubFromAuth();
            unsubFromConnection();
            unsubFromUserConnection();
        }
    }, [dispatch])

    if (!isOnline) {
        return <LoadingView message="Application has been disconnected from the internet. Please reconnect..." />
    }

    if (isChecking) {
        return <LoadingView />
    }

    return (
        <Router>
            <ContentWrapper>
                <Switch>
                    <Route path="/" exact>
                        <WelcomeView />
                    </Route>
                    <AuthRoute path="/home">
                        <HomeView />
                    </AuthRoute>
                    <AuthRoute path="/chat/create">
                        <ChatCreateView />
                    </AuthRoute>
                    <AuthRoute path="/chat/:id">
                        <ChatView />
                    </AuthRoute>
                    <AuthRoute path="/settings">
                        <SettingsView />
                    </AuthRoute>
                </Switch>
            </ContentWrapper>
        </Router>
    )
}

export default function App() {
    return (
        <Provider store={store}>
            <ChatApp />
        </Provider>
    )
}

