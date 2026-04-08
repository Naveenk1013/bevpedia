import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, User, ChevronLeft } from 'lucide-react';
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
    const messagesEndRef = useRef(null);
    const channelRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
                setTimeout(scrollToBottom, 100);
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
            userProfile,
            async (newMessage) => {
                if (newMessage.sender_id === otherUserId) {
                    setMessages(prev => {
                        if (prev.some(m => m.id === newMessage.id)) return prev;
                        return [...prev, {
                            ...newMessage,
                            sender: otherUser
                        }];
                    });
                    setTimeout(scrollToBottom, 50);
                }
            },
            (users) => {
                // Check if other user is in our presence list
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
    }, [otherUserId, user, navigate]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const content = input;
        setInput("");
        
        // Stop typing instantly
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        yapService.sendPrivateTyping(otherUserId, user.id, user.email?.split('@')[0], false, channelRef.current);

        // Optimistic UI
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
        setTimeout(scrollToBottom, 50);

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
        
        // Broadcast typing to the other user
        if (!typingTimeoutRef.current) {
            yapService.sendPrivateTyping(otherUserId, user.id, user.email?.split('@')[0], true, channelRef.current);
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        
        typingTimeoutRef.current = setTimeout(() => {
            yapService.sendPrivateTyping(otherUserId, user.id, user.email?.split('@')[0], false, channelRef.current);
            typingTimeoutRef.current = null;
        }, 2000);
    };

    return (
        <YapLayout user={user}>
            <div className="chat-window">
                <header className="chat-header">
                    <div className="chat-header-info">
                        <button 
                            className="btn-icon" 
                            style={{ background: 'transparent', marginRight: '10px' }}
                            onClick={() => navigate('/yap/messages')}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div className="status-avatar-wrapper" style={{ width: 40, height: 40, padding: 2 }}>
                            <div className="status-avatar">
                                {otherUser?.avatar_url ? (
                                    <img src={otherUser.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                ) : (
                                    <User size={16} />
                                )}
                            </div>
                        </div>
                        <div>
                            <h3>{otherUser?.full_name || 'Holographic User'}</h3>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: 8, height: 8, background: isOnline ? '#30c88a' : '#555', borderRadius: '50%' }}></span>
                                {isOnline ? 'Active Now' : 'Offline'}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="chat-messages">
                    {isTyping && (
                        <div className="typing-indicator" style={{ padding: '10px 20px', fontSize: '0.8rem', color: 'var(--clr-accent)', fontStyle: 'italic', opacity: 0.8 }}>
                            {otherUser?.full_name || 'Member'} is typing...
                        </div>
                    )}
                    {loading ? (
                        <div className="text-muted">Initializing secure line...</div>
                    ) : messages.length > 0 ? (
                        messages.map(msg => (
                            <MessageBubble 
                                key={msg.id} 
                                message={msg} 
                                isMe={msg.sender_id === user?.id} 
                            />
                        ))
                    ) : (
                        <div className="text-muted" style={{ textAlign: 'center', marginTop: 'auto', padding: '40px' }}>
                            <div className="yap-auth-logo" style={{ marginBottom: '20px' }}>
                                <Send size={32} />
                            </div>
                            <p>Your conversation with {otherUser?.full_name || 'this user'} starts here.</p>
                            <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>End-to-end encrypted with Sapience Protocol.</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-input-area" onSubmit={handleSend}>
                    <div className="chat-input-wrapper">
                        <input 
                            type="text" 
                            className="chat-input" 
                            placeholder="Type a message..." 
                            value={input}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                        <button type="submit" className="send-btn">
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </YapLayout>
    );
};

export default PrivateChatPage;
