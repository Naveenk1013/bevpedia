import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, User, ChevronLeft, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../utils/soundEngine';
import YapLayout from '../components/YapLayout';
import MessageBubble from '../components/MessageBubble';
import { yapService } from '../services/yapService';

const PrivateChatPage = ({ user }) => {
    const { otherUserId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const channelRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const { play: playSend } = useSound('ui/click_1');
    const { play: playReceive } = useSound('notifications/glass_ping');

    const scrollToBottom = (behavior = "smooth") => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: behavior === "smooth" ? "smooth" : "auto"
            });
        }
    };

    useEffect(() => {
        if (!user || !otherUserId) {
            navigate('/yap/messages');
            return;
        }

        const loadData = async () => {
            try {
                // Load other user's profile
                const profile = await yapService.getProfile(otherUserId);
                setOtherUser(profile);

                // Load messages
                const data = await yapService.getPrivateMessages(user.id, otherUserId);
                setMessages(data);
                setLoading(false);
                setTimeout(() => scrollToBottom("auto"), 100);
            } catch (err) {
                console.error("Failed to load chat data:", err);
            }
        };

        loadData();

        // Subscribe to messages, presence, and typing
        const userProfile = { 
            id: user.id, 
            full_name: user.email?.split('@')[0] || 'Member' 
        };

        const subscription = yapService.subscribeToPrivateMessages(
            user.id, 
            otherUserId,
            userProfile,
            async (newMessage) => {
                if (newMessage.sender_id === otherUserId) {
                    playReceive();
                    setMessages(prev => {
                        if (prev.some(m => m.id === newMessage.id)) return prev;
                        return [...prev, {
                            ...newMessage,
                            sender: otherUser
                        }];
                    });
                    setTimeout(() => scrollToBottom(), 50);
                }
            },
            async (deletedId) => {
                setMessages(prev => prev.filter(m => m.id !== deletedId));
            },
            (users) => {
                setIsOnline(users.some(u => u.id === otherUserId));
            },
            (typingData) => {
                if (typingData.userId === otherUserId) {
                    setIsTyping(typingData.isTyping);
                }
            }
        );
        
        channelRef.current = subscription;

        return () => {
            subscription.unsubscribe();
            channelRef.current = null;
        };
    }, [otherUserId, user, navigate, otherUser]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const content = input;
        setInput("");
        
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        yapService.sendPrivateTyping(otherUserId, user.id, user.email?.split('@')[0], false, channelRef.current);

        playSend();

        const tempId = Date.now().toString();
        const optimisticMessage = {
            id: tempId,
            content,
            sender_id: user.id,
            receiver_id: otherUserId,
            created_at: new Date().toISOString(),
            sender: {
                full_name: user.email?.split('@')[0] || 'Me',
                avatar_url: null
            }
        };

        setMessages(prev => [...prev, optimisticMessage]);
        setTimeout(() => scrollToBottom(), 50);

        try {
            const confirmedMessage = await yapService.sendPrivateMessage(user.id, otherUserId, content);
            setMessages(prev => prev.map(m => m.id === tempId ? confirmedMessage : m));
        } catch (err) {
            console.error("Private send failed:", err);
            setMessages(prev => prev.filter(m => m.id !== tempId));
            alert("Failed to send message.");
        }
    };

    const handleInputChange = (val) => {
        setInput(val);
        
        if (!typingTimeoutRef.current) {
            yapService.sendPrivateTyping(otherUserId, user.id, user.email?.split('@')[0], true, channelRef.current);
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        
        typingTimeoutRef.current = setTimeout(() => {
            yapService.sendPrivateTyping(otherUserId, user.id, user.email?.split('@')[0], false, channelRef.current);
            typingTimeoutRef.current = null;
        }, 2000);
    };

    const handleClearChat = async () => {
        try {
            await yapService.clearPrivateChat(user.id, otherUserId);
            setMessages([]);
            setShowClearConfirm(false);
            playSend();
        } catch (err) {
            console.error("Failed to clear private chat:", err);
            alert("Failed to clear conversation history.");
        }
    };

    return (
        <YapLayout user={user}>
            <motion.div 
                className="chat-window"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <header className="chat-header sticky-header">
                    <div className="chat-header-info">
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            className="btn-icon" 
                            style={{ background: 'transparent', marginRight: '8px' }}
                            onClick={() => navigate('/yap/messages')}
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                        <div 
                            className="status-avatar-wrapper" 
                            style={{ width: 40, height: 40, padding: 2, cursor: 'pointer' }}
                            onClick={() => navigate(`/yap/user/${otherUserId}`)}
                        >
                            <div className="status-avatar">
                                {otherUser?.avatar_url ? (
                                    <img src={otherUser.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                ) : (
                                    <User size={16} />
                                )}
                            </div>
                        </div>
                        <div 
                            className="header-text"
                            onClick={() => navigate(`/yap/user/${otherUserId}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h3>{otherUser?.full_name || (otherUser?.username ? `@${otherUser.username}` : 'Elite Member')}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <motion.span 
                                    className={`presence-dot ${isOnline ? 'online' : 'offline'}`}
                                ></motion.span>
                                <p className="header-subtitle">
                                    {isOnline ? 'Active Now' : 'Offline'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="chat-header-actions">
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            className="btn-icon" 
                            onClick={() => { playSend(); setShowClearConfirm(true); }}
                            title="Clear Conversation History"
                            style={{ color: '#ff6b6b' }}
                         >
                            <Trash2 size={18} />
                         </motion.button>
                    </div>
                </header>

                <div className="chat-messages" ref={chatContainerRef}>
                    <AnimatePresence>
                        {loading ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-muted"
                            >
                                Initializing secure line...
                            </motion.div>
                        ) : messages.length > 0 ? (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.05 } }
                                    }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                                >
                                {messages.map(msg => (
                                    <MessageBubble 
                                        key={msg.id} 
                                        message={msg} 
                                        isMe={msg.sender_id === user?.id} 
                                        currentUserId={user?.id}
                                        onDelete={(id) => setMessages(prev => prev.filter(m => m.id !== id))}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-muted" 
                                style={{ textAlign: 'center', marginTop: 'auto', padding: '40px' }}
                            >
                                <div className="yap-auth-logo" style={{ marginBottom: '20px' }}>
                                    <Send size={32} />
                                </div>
                                <p>Your conversation with {otherUser?.full_name || (otherUser?.username ? `@${otherUser.username}` : 'this member')} starts here.</p>
                                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>End-to-end encrypted with Sapience Protocol.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isTyping && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="typing-indicator" 
                                style={{ padding: '10px 20px', fontSize: '0.8rem', color: 'var(--clr-accent)', fontStyle: 'italic' }}
                            >
                                {otherUser?.full_name || 'Member'} is typing...
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-input-area" onSubmit={handleSend}>
                    <div className="chat-input-wrapper glass-morphism">
                        <input 
                            type="text" 
                            className="chat-input" 
                            placeholder="Type a message..." 
                            value={input}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                        <motion.button 
                            whileTap={{ scale: 0.8 }}
                            type="submit" 
                            className="send-btn"
                        >
                            <Send size={20} />
                        </motion.button>
                    </div>
                </form>
            </motion.div>

            <AnimatePresence>
                {showClearConfirm && (
                    <div className="yap-modal-overlay" onClick={() => setShowClearConfirm(false)}>
                        <motion.div 
                            className="yap-modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            style={{ maxWidth: '400px', textAlign: 'center', padding: '30px' }}
                        >
                            <div className="yap-auth-logo" style={{ marginBottom: '20px', background: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b' }}>
                                <Trash2 size={32} />
                            </div>
                            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>Clear Conversation?</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '25px' }}>
                                This will remove the message history from your view. The other person will still be able to see their copy of the conversation.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowClearConfirm(false)}>Cancel</button>
                                <button className="btn" style={{ flex: 1, background: '#ff6b6b', color: 'white' }} onClick={handleClearChat}>Clear History</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </YapLayout>
    );
};

export default PrivateChatPage;
