import React from 'react';
import ChatSearch from './ChatSearch';
import { useHistory } from 'react-router-dom';

export default function JoinedChatsList({ chats }) {
    const history = useHistory();
    return (
        <div className="list-container">
            <ChatSearch />
            <ul className="items">
                {
                    chats.map(chat =>
                        <li
                            key={chat.id}
                            onClick={() => history.push(`/chat/${chat.id}`)}
                            className="item">
                            <div className="item-status">
                                <span className="status online"></span>
                            </div>
                            <div className="item-status">
                                <span class="status-name">{chat.name}</span>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}