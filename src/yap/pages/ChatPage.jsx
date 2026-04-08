import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Users, MessageSquare } from 'lucide-react';
import YapLayout from '../components/YapLayout';
import MessageBubble from '../components/MessageBubble';
import { yapService } from '../services/yapService';
import { supabase } from '../../lib/supabaseClient';

const ChatPage = ({ user }) => {
    const { groupId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [group, setGroup] = useState(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [typingUsers, setTypingUsers] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);
    const messagesEndRef = useRef(null);
    const channelRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!user) {
            navigate('/yap/community');
            return;
        }

        const loadData = async () => {
            try {
                // Fetch messages and group info in parallel for speed
                const [msgData, groupData] = await Promise.all([
                    yapService.getMessages(groupId),
                    supabase.from('groups').select('*, member_count:group_members(count)').eq('id', groupId).single()
                ]);

                setMessages(msgData);
                if (groupData.data) {
                    const g = groupData.data;
                    setGroup({ ...g, member_count: g.member_count?.[0]?.count || 0 });
                }
                setLoading(false);
                setTimeout(scrollToBottom, 100);
            } catch (err) {
                console.error("Failed to load data:", err);
            }
        };

        loadData();

        // Subscribe to messages, presence, and typing
        const userProfile = { 
            id: user.id, 
            full_name: user.email?.split('@')[0] || 'Member' 
        };

        const subscription = yapService.subscribeToMessages(
            groupId, 
            userProfile,
            async (newMessage) => {
                // If it's from another user, fetch the full details (with joins)
                if (newMessage.sender_id !== user.id) {
                    try {
                        const fullMessage = await yapService.getMessageById(newMessage.id);
                        setMessages(prev => {
                            if (prev.some(m => m.id === fullMessage.id)) return prev;
                            return [...prev, fullMessage];
                        });
                    } catch (err) {
                        console.error("Failed to fetch realtime message details:", err);
                    }
                } else {
                    // If it's from us, it's already added optimistically (or will be soon)
                    setMessages(prev => {
                        if (prev.some(m => m.id === newMessage.id)) return prev;
                        return [...prev, newMessage];
                    });
                }
                setTimeout(scrollToBottom, 50);
            },
            (users) => {
                setActiveUsers(users);
            },
            (typingData) => {
                if (typingData.userId === user.id) return;
                setTypingUsers(prev => ({
                    ...prev,
                    [typingData.userId]: typingData.isTyping ? typingData.fullName : null
                }));
            }
        );

        channelRef.current = subscription;

        return () => {
            subscription.unsubscribe();
            channelRef.current = null;
        };
    }, [groupId, user, navigate]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const content = input;
        setInput(""); // Clear input
        
        // Stop typing indicator instantly
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        yapService.sendTyping(groupId, user.id, user.email?.split('@')[0], false, channelRef.current);

        // Optimistic UI update
        const tempId = Date.now().toString();
        const optimisticMessage = {
            id: tempId,
            content,
            sender_id: user.id,
            created_at: new Date().toISOString(),
            sender: {
                full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Me', // Fallback name
                avatar_url: user.user_metadata?.avatar_url || null
            }
        };
        
        setMessages(prev => [...prev, optimisticMessage]);
        setTimeout(scrollToBottom, 50);

        try {
            const confirmedMessage = await yapService.sendMessage(groupId, user.id, content);
            // Replace optimistic message with the confirmed one
            setMessages(prev => prev.map(m => m.id === tempId ? confirmedMessage : m));
        } catch (err) {
            console.error("Send failed:", err);
            // Remove optimistic message on failure
            setMessages(prev => prev.filter(m => m.id !== tempId));
            alert("Failed to send message.");
        }
    };

    const handleInputChange = (val) => {
        setInput(val);
        
        // Broadcast typing
        if (!typingTimeoutRef.current) {
            yapService.sendTyping(groupId, user.id, user.email?.split('@')[0], true, channelRef.current);
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        
        typingTimeoutRef.current = setTimeout(() => {
            yapService.sendTyping(groupId, user.id, user.email?.split('@')[0], false, channelRef.current);
            typingTimeoutRef.current = null;
        }, 2000);
    };

    return (
        <YapLayout user={user}>
            <div className="chat-window">
                <header className="chat-header">
                    <div className="chat-header-info">
                        <div className="status-avatar-wrapper" style={{ width: 40, height: 40, padding: 2 }}>
                            <div className="status-avatar">
                                <MessageSquare size={16} color="var(--clr-accent)" />
                            </div>
                        </div>
                        <div>
                            <h3 style={{ textTransform: 'capitalize' }}>{group?.name || 'Loading...'}</h3>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: 8, height: 8, background: activeUsers.length > 0 ? '#30c88a' : '#555', borderRadius: '50%' }}></span>
                                {activeUsers.length} members active in lounge
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                         <button className="btn-icon" onClick={() => navigate('/yap/community')}>
                            <Users size={20} />
                         </button>
                    </div>
                </header>

                <div className="chat-messages">
                    {Object.values(typingUsers).filter(Boolean).length > 0 && (
                        <div className="typing-indicator" style={{ padding: '10px 20px', fontSize: '0.8rem', color: 'var(--clr-accent)', fontStyle: 'italic', opacity: 0.8 }}>
                            {Object.values(typingUsers).filter(Boolean).join(', ')} {Object.values(typingUsers).filter(Boolean).length > 1 ? 'are' : 'is'} typing...
                        </div>
                    )}
                    {loading ? (
                        <div className="text-muted">Loading secure connection...</div>
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
                            <MessageSquare size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                            <p>No messages yet.<br/>Start the conversation.</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-input-area" onSubmit={handleSend}>
                    <div className="chat-input-wrapper">
                        <input 
                            type="text" 
                            className="chat-input" 
                            placeholder="Aa" 
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

export default ChatPage;
