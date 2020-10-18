import React, { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// layouts
import { withBaseLayout } from '../layouts/Base';
import LoadingView from '../components/shared/LoadingView';

// chats
import ChatUserList from '../components/user/ChatUsersList';
import ViewTitle from '../components/shared/ViewTitle';
import ChatMessagesList from '../components/chat/ChatMessagesList';

// messenger view
import Messenger from '../components/messenger/Messenger';

// actions
import {
    subscribeToChat,
    subscribeToProfile,
    sendChatMessage,
    subscribeToMessages,
    registerMessageSubscription
} from '../actions/chats';


function Chat() {
    const { id } = useParams();
    const peopleWatchers = useRef({});
    const dispatch = useDispatch();
    const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
    const messages = useSelector(({ chats }) => chats.messages[id]);
    const messagesSub = useSelector(({chats}) => chats.messagesSubs[id])
    const joinedUsers = activeChat?.joinedUsers;


    useEffect(() => {
        const unsubFromChat = dispatch(subscribeToChat(id));
        if (!messagesSub)  {
            const unsubFromMessages = dispatch(subscribeToMessages(id));
            dispatch(registerMessageSubscription(id, unsubFromMessages));
          }
      
        return () => {
            unsubFromChat();
            unsubFromJoinedUsers();
        }
    }, [])

    useEffect(() => {
        joinedUsers && subscribeToJoinedUsers(joinedUsers);
    }, [joinedUsers])

    const sendMessage = useCallback(message => {
        dispatch(sendChatMessage(message, id))
      }, [id])

    const subscribeToJoinedUsers = useCallback(jUsers => {
        jUsers.forEach(user => {
            if (!peopleWatchers.current[user.uid]) {
                peopleWatchers.current[user.uid] = dispatch(subscribeToProfile(user.uid, id))
            }
        })
    }, [dispatch, id])

    const unsubFromJoinedUsers = useCallback(() => {
        Object.keys(peopleWatchers.current)
            .forEach(id => peopleWatchers.current[id]())
    }, [peopleWatchers.current])

    if (!activeChat?.id) {
        return <LoadingView message="Loading Chat..." />
    }

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUserList users={activeChat?.joinedUsers} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text={`Channel ${activeChat?.name}`} />
                <ChatMessagesList messages={messages} />
                <Messenger onSubmit={sendMessage} />
            </div>
        </div>
    )
}

export default withBaseLayout(Chat, { canGoBack: true });
