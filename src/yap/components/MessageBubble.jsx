import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../utils/soundEngine';
import { yapService } from '../services/yapService';

const MessageBubble = ({ message, isMe, isAdmin, onDelete, currentUserId }) => {
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = React.useState(false);
    const time = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const { play } = useSound('ui/click_1');

    const handleDelete = async (e) => {
        e.stopPropagation();
        play();
        
        const isPrivate = !message.group_id;
        const confirmMsg = isPrivate 
            ? "Delete this message? It will only be removed from your device."
            : "Retract this message? It will be removed for everyone in the group.";
            
        if (!window.confirm(confirmMsg)) return;
        
        setIsDeleting(true);
        try {
            if (!isPrivate) {
                await yapService.deleteGroupMessage(message.id);
            } else {
                await yapService.deletePrivateMessage(message.id, currentUserId);
            }
            onDelete(message.id);
        } catch (err) {
            console.error("Failed to delete message:", err);
            alert("Could not retract message.");
            setIsDeleting(false);
        }
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, x: isMe ? 50 : -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`message-bubble ${isMe ? 'me' : ''} ${isDeleting ? 'retracting' : ''}`}
            style={{ opacity: isDeleting ? 0.3 : 1 }}
        >
            {!isMe && (
                <div className="message-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div 
                        className="status-avatar-wrapper" 
                        style={{ width: 24, height: 24, padding: 0, cursor: 'pointer', flexShrink: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            play();
                            navigate(`/yap/user/${message.sender_id}`);
                        }}
                    >
                        <div className="status-avatar" style={{ fontSize: '0.8rem' }}>
                            {message.sender?.avatar_url ? (
                                <img src={message.sender.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                            ) : (
                                (message.sender?.full_name?.[0] || 'U').toUpperCase()
                            )}
                        </div>
                    </div>
                    <span 
                        className="sender"
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            play();
                            navigate(`/yap/user/${message.sender_id}`);
                        }}
                        title={`View ${message.sender?.full_name}'s Profile`}
                    >
                        {message.sender?.full_name || 'User'}
                        {message.sender?.username && <small style={{ opacity: 0.5, fontWeight: 'normal' }}>@{message.sender.username}</small>}
                    </span>
                </div>
            )}
            <div className="message-content-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div className="message-content" style={{ fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)' }}>
                    {message.content}
                </div>
                {(isMe || isAdmin) && (
                    <motion.button 
                        whileTap={{ scale: 1.2, color: '#ff4d4d' }}
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
                    </motion.button>
                )}
            </div>
            {!isMe && (
                <div className="message-meta" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <span className="time">{time}</span>
                </div>
            )}
            {isMe && (
                <div className="message-meta" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span className="time">{time}</span>
                </div>
            )}
        </motion.div>
    );
};

export default MessageBubble;
