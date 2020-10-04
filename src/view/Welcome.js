import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../components/Login';
import Register from '../components/Register';

import { fetchChats } from '../actions/chats';

export default function Welcome() {
    const [isLoginView, setIsLogin] = useState(true);

    const optInText = isLoginView ?
        ['Need an account?', 'Register'] :
        ['Already registered?', 'Login']

    return (
        <div className="centered-view">
            <div className="centered-container">
                {isLoginView ? <Login /> : <Register />}
                <small className="form-text text-muted mt-2">{optInText[0]}
                    <span
                        onClick={() => setIsLogin(!isLoginView)}
                        className="btn-link ml-2">{optInText[1]}</span></small>
            </div>
        </div>
    )
}