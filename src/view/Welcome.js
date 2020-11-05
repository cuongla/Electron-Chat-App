import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';

export default function Welcome() {
    const [isLoginView, setIsLogin] = useState(true);
    const user = useSelector(({ auth }) => auth.user);

    const optInText = isLoginView ?
        ['Need an account?', 'Register Account'] :
        ['Already registered?', 'Login Account']

    if (user) {
        return <Redirect to="/home" />
    }

    return (
        <div className="centered-view">
            <div className="centered-container">
                {isLoginView ? <Login /> : <Register />}
                <small 
                    className="form-text text-muted mt-2"
                    style={{cursor: 'pointer'}}
                    >{optInText[0]}
                    <span
                        onClick={() => setIsLogin(!isLoginView)}
                        className="btn-link ml-2"
                        style={{cursor: 'pointer'}}
                        >{optInText[1]}</span>
                </small>
            </div>
        </div>
    )
}