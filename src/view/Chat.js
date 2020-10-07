import React from 'react';
import { useParams } from 'react-router-dom';

// layouts
import { withBaseLayout } from '../layouts/Base';

// chats
import ChatUserList from '../components/user/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import ChatMessagesList from '../components/chat/ChatMessagesList';


function Chat() {
    const { id } = useParams();

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUserList />
            </div>
            <div className="col-9 fh">
                <ViewTitle text={`Joined channel: ${id}`} />
                <ChatMessagesList />
            </div>
        </div>
    )
}

export default withBaseLayout(Chat, { canGoBack: true });
