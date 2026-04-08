import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { yapService } from '../services/yapService';

const MessageBubble = ({ message, isMe, isAdmin, onDelete }) => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = React.useState(false);
    const time = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (!window.confirm("Retract this message? It will be removed for everyone.")) return;
        
        setIsDeleting(true);
        try {
            if (message.group_id) {
                await yapService.deleteGroupMessage(message.id);
            } else {
                await yapService.deletePrivateMessage(message.id);
            }
            onDelete(message.id);
        } catch (err) {
            console.error("Failed to delete message:", err);
            alert("Could not retract message.");
            setIsDeleting(false);
        }
    };

    return (
        <div 
            className={`message-bubble ${isMe ? 'me' : ''} ${isDeleting ? 'retracting' : ''}`}
            style={{ opacity: isDeleting ? 0.3 : 1, transition: 'all 0.3s ease' }}
        >
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
            <div className="message-content-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div className="message-content">
                    {message.content}
                </div>
                {(isMe || isAdmin) && (
                    <button 
                        className="btn-icon delete-msg-btn" 
                        onClick={handleDelete}
                        style={{ 
                            padding: '4px', 
                            color: '#e05c5c', 
                            marginLeft: '8px', 
                            opacity: 0, 
                            cursor: 'pointer',
                            background: 'transparent',
                            border: 'none'
                        }}
                    >
                        <Trash2 size={14} />
                    </button>
                )}
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
