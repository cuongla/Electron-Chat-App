import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './view/Home';
import SettingsView from './view/Settings';
import WelcomeView from './view/Welcome';
import ChatView from './view/Chat';
import LoadingView from './components/shared/LoadingView';
import ContentWrapper from './utils/ContentWrapper';
import AuthRoute from './utils/AuthRoute';

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


function ChatApp() {
    const dispatch = useDispatch();
    const isChecking = useSelector(({ auth }) => auth.isChecking)

    useEffect(() => {
        dispatch(listenToAuthChanges());
    }, [dispatch])

    if (isChecking) {
        return <LoadingView />
    }

    return (
        <Router>
            <Navbar />
            <ContentWrapper>
                <Switch>
                    <Route path="/" exact>
                        <WelcomeView />
                    </Route>
                    <AuthRoute path="/home">
                        <HomeView />
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

