import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BackButton from './shared/BackButton';
import { logout } from '../actions/auth';

export default function NavBar({ canGoBack, view }) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user)

    return (
        <div className="chat-navbar">
            <nav className="chat-navbar-inner">
                <div className="chat-navbar-inner-left">
                    {canGoBack && <BackButton />}
                    {view !== 'Settings' &&
                        <Link
                            to="/settings"
                            className="btn btn-outline-success ml-2">Settings
                        </Link>
                    }
                </div>
                <div className="chat-navbar-inner-right">
                    {user &&
                        <>
                            <img className="avatar mr-2" src={user.avatar}></img>
                            <span className="logged-in-user">Hi, {user.username}</span>
                            <button
                                onClick={() => dispatch(logout())}
                                className="btn btn-outline-danger ml-4">Logout
                </button>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}