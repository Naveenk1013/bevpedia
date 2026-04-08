import React from 'react';
import { useNavigate } from 'react-router-dom';

const MessageBubble = ({ message, isMe }) => {
    const navigate = useNavigate();
    const time = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`message-bubble ${isMe ? 'me' : ''}`}>
            {!isMe && (
                <div className="message-meta">
                    <span 
                        className="sender"
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        onClick={() => navigate(`/yap/messages/${message.sender_id}`)}
                        title={`Message ${message.sender?.full_name}`}
                    >
                        {message.sender?.full_name || 'User'}
                        {message.sender?.username && <small style={{ opacity: 0.5, fontWeight: 'normal' }}>@{message.sender.username}</small>}
                    </span>
                    <span className="time">{time}</span>
                </div>
            )}
            <div className="message-content">
                {message.content}
            </div>
            {isMe && (
                <div className="message-meta" style={{ justifyContent: 'flex-end' }}>
                    <span className="time">{time}</span>
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
