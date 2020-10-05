import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './view/Home';
import SettingsView from './view/Settings';
import WelcomeView from './view/Welcome';
import ChatView from './view/Chat';

// redux
import { Provider } from 'react-redux';
const store = require('./reducers').init();
// router
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
//actions
import { listenToAuthChanges } from './actions/auth';


export default function App() {

    useEffect(() => {
        store.dispatch(listenToAuthChanges());
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <div className='content-wrapper'>
                    <Switch>
                        <Route path="/" exact>
                            <WelcomeView />
                        </Route>
                        <Route path="/home">
                            <HomeView />
                        </Route>
                        <Route path="/chat/:id">
                            <ChatView />
                        </Route>
                        <Route path="/settings">
                            <SettingsView />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}