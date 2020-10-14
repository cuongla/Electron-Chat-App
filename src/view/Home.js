import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { withBaseLayout } from '../layouts/Base';
import JoinedChatsList from '../components/chat/JoinedChatsList';
import AvailableChatsList from '../components/chat/AvailableChatsList';
import ViewTitle from '../components/shared/ViewTitle';

// actions
import { fetchChats } from '../actions/chats';
import Notification from '../utils/Notification';

function Home() {
    const dispatch = useDispatch();
    // const chats = useSelector(({ chats }) => chats.items)

    useEffect(() => {
        Notification.setup();
        dispatch(fetchChats())
    }, [dispatch])

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinedChatsList chats={[]} />

            </div>
            <div className="col-9 fh">
                <ViewTitle text="Choose your channel">
                    <Link
                        className="btn btn-outline-primary"
                        to="/chat/create">New</Link>
                </ViewTitle>
                <AvailableChatsList chats={[]} />
            </div>
        </div>
    )
}

export default withBaseLayout(Home);