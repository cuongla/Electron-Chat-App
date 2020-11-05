import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BackButton from './shared/BackButton';
import { logout } from '../actions/auth';
import DefaultProfilePhoto from '../assets/DefaultProfilePhoto.png';

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
                            className="icon"
                        >
                            <i className="fa fa-cog fa-sm"></i>
                        </Link>
                    }
                </div>
                <div className="chat-navbar-inner-right">
                    {user &&
                        <>
                            <img className="avatar mr-2" src={!user.avatar ? DefaultProfilePhoto : user.avatar}></img>
                            <span className="logged-in-user">Hi, {user.username}</span>
                            <button
                                onClick={() => dispatch(logout())}
                                className="btn btn-danger ml-4">Log Out
                            </button>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}