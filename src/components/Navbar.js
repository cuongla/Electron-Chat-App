import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import BackButton from './shared/BackButton';

export default function NavBar({canGoBack}) {
    const history = useHistory();

    return (
        <div className="chat-navbar">
            <nav className="chat-navbar-inner">
                <div className="chat-navbar-inner-left">
                    {/* Back Button */}
                    <BackButton />
                    <Link
                        to="/settings"
                        className="btn btn-outline-success ml-2"
                        replace
                    >Settings
                    </Link>
                </div>
                <div className="chat-navbar-inner-right">
                    <span className="logged-in-user">Hi User</span>
                    <button
                        onClick={() => history.push('/register')}
                        className="btn btn-outline-danger ml-2">Register</button>
                    <Link
                        to="/login"
                        className="btn btn-outline-success ml-2">Login</Link>
                </div>
            </nav>
        </div>
    )
}