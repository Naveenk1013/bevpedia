import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Users, MessageSquare, Settings, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../utils/soundEngine';
import YapLayout from '../components/YapLayout';
import MessageBubble from '../components/MessageBubble';
import GroupSettingsModal from '../components/GroupSettingsModal';
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
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showMembers, setShowMembers] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [groupMembers, setGroupMembers] = useState([]);
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
        if (!user) {
            navigate('/yap/community');
            return;
        }

        const loadData = async () => {
            try {
                // Fetch messages, group info, and members
                const [msgData, groupData, membersData] = await Promise.all([
                    yapService.getMessages(groupId),
                    supabase.from('groups').select('*, member_count:group_members(count)').eq('id', groupId).single(),
                    yapService.getGroupMembers(groupId)
                ]);

                setMessages(msgData);
                if (groupData.data) {
                    const g = groupData.data;
                    setGroup({ ...g, member_count: g.member_count?.[0]?.count || 0 });
                }
                if (membersData) {
                    setGroupMembers(membersData);
                }
                setLoading(false);
                setTimeout(() => scrollToBottom("auto"), 100);
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
                if (newMessage.sender_id !== user.id) {
                    playReceive();
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
                    setMessages(prev => {
                        if (prev.some(m => m.id === newMessage.id)) return prev;
                        return [...prev, newMessage];
                    });
                }
                setTimeout(() => scrollToBottom(), 50);
            },
            async (deletedId) => {
                setMessages(prev => prev.filter(m => m.id !== deletedId));
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
        
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        yapService.sendTyping(groupId, user.id, user.email?.split('@')[0], false, channelRef.current);

        playSend();

        const tempId = Date.now().toString();
        const optimisticMessage = {
            id: tempId,
            content,
            sender_id: user.id,
            created_at: new Date().toISOString(),
            sender: {
                full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Me',
                avatar_url: user.user_metadata?.avatar_url || null
            }
        };
        
        setMessages(prev => [...prev, optimisticMessage]);
        setTimeout(() => scrollToBottom(), 50);

        try {
            const confirmedMessage = await yapService.sendMessage(groupId, user.id, content);
            setMessages(prev => prev.map(m => m.id === tempId ? confirmedMessage : m));
        } catch (err) {
            console.error("Send failed:", err);
            setMessages(prev => prev.filter(m => m.id !== tempId));
            alert("Failed to send message.");
        }
    };

    const handleInputChange = (val) => {
        setInput(val);
        
        if (!typingTimeoutRef.current) {
            yapService.sendTyping(groupId, user.id, user.email?.split('@')[0], true, channelRef.current);
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        
        typingTimeoutRef.current = setTimeout(() => {
            yapService.sendTyping(groupId, user.id, user.email?.split('@')[0], false, channelRef.current);
            typingTimeoutRef.current = null;
        }, 2000);
    };

    const handleClearChat = async () => {
        try {
            await yapService.clearGroupMessages(groupId);
            setMessages([]);
            setShowClearConfirm(false);
            playSend();
        } catch (err) {
            console.error("Failed to clear chat:", err);
            alert("Failed to clear lounge history.");
        }
    };

    return (
        <YapLayout user={user}>
            <motion.div 
                className="chat-window"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}
            >
                <header className="chat-header sticky-header">
                    <div className="chat-header-info">
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            className="btn-icon mobile-only" 
                            style={{ background: 'transparent', marginRight: '8px' }}
                            onClick={() => navigate('/yap/community')}
                        >
                            <span style={{ fontSize: '1.2rem' }}>←</span>
                        </motion.button>
                        <div className="status-avatar-wrapper" style={{ width: 40, height: 40, padding: 2 }}>
                            <div className="status-avatar">
                                <MessageSquare size={16} color="var(--clr-accent)" />
                            </div>
                        </div>
                        <div className="header-text">
                            <h3>{group?.name || 'Loading...'}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <motion.span 
                                    className={`presence-dot ${activeUsers.length > 0 ? 'online' : 'offline'}`}
                                ></motion.span>
                                <p className="header-subtitle">
                                    {activeUsers.length} active
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="chat-header-actions">
                         <motion.button 
                            whileTap={{ scale: 0.9 }}
                            className="btn-icon" 
                            onClick={() => { playSend(); setShowMembers(true); }}
                            title="View Members"
                         >
                            <Users size={18} />
                         </motion.button>
                         {group?.created_by === user?.id && (
                             <>
                                 <motion.button 
                                    whileTap={{ scale: 0.9 }}
                                    className="btn-icon" 
                                    onClick={() => { playSend(); setShowClearConfirm(true); }}
                                    title="Clear All Messages"
                                    style={{ color: '#ff6b6b' }}
                                 >
                                    <Trash2 size={18} />
                                 </motion.button>
                                 <motion.button 
                                    whileTap={{ scale: 0.9 }}
                                    className="btn-icon" 
                                    onClick={() => { playSend(); setIsSettingsOpen(true); }} title="Lounge Settings"
                                 >
                                     <Settings size={18} color="var(--clr-accent)" />
                                 </motion.button>
                             </>
                         )}
                    </div>
                </header>

                <GroupSettingsModal 
                    isOpen={isSettingsOpen}
                    group={group}
                    currentUser={user}
                    onClose={() => setIsSettingsOpen(false)}
                    onUpdate={(updatedGroup) => setGroup(prev => ({ ...prev, ...updatedGroup }))}
                    onDelete={() => navigate('/yap/community')}
                />

                <div className="chat-messages" ref={chatContainerRef}>
                    <AnimatePresence>
                        {loading ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-muted"
                            >
                                Initialized secure connection...
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
                                        isAdmin={group?.created_by === user?.id}
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
                                <MessageSquare size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                                <p>No messages yet.<br/>Start the conversation.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                        {Object.values(typingUsers).filter(Boolean).length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="typing-indicator" 
                                style={{ padding: '10px 20px', fontSize: '0.8rem', color: 'var(--clr-accent)', fontStyle: 'italic' }}
                            >
                                {Object.values(typingUsers).filter(Boolean).join(', ')} {Object.values(typingUsers).filter(Boolean).length > 1 ? 'are' : 'is'} typing...
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
                            placeholder="Aa" 
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
            <GroupSettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
                group={group} 
            />

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
                            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>Clear Lounge History?</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '25px' }}>
                                This will permanently delete all messages in this lounge for everyone. This action cannot be undone.
                            </p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowClearConfirm(false)}>Cancel</button>
                                <button className="btn" style={{ flex: 1, background: '#ff6b6b', color: 'white' }} onClick={handleClearChat}>Clear All</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showMembers && (
                    <div className="yap-modal-overlay" onClick={() => setShowMembers(false)}>
                        <motion.div 
                            className="yap-modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            style={{ maxWidth: '400px' }}
                        >
                            <div className="yap-modal-header">
                                <h3 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Users size={18} color="var(--clr-accent)" />
                                    Members ({groupMembers.length})
                                </h3>
                                <button className="btn-icon" onClick={() => setShowMembers(false)}>×</button>
                            </div>
                            <div style={{ padding: '20px', maxHeight: '50vh', overflowY: 'auto' }}>
                                {groupMembers.map(member => {
                                    const isUserOnline = activeUsers.some(u => u.id === member.user.id);
                                    return (
                                        <div 
                                            key={member.user.id} 
                                            onClick={() => navigate(`/yap/user/${member.user.id}`)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', marginBottom: '8px', cursor: 'pointer' }}
                                        >
                                            <div className="status-avatar-wrapper" style={{ width: 44, height: 44, padding: '2px' }}>
                                                <div className="status-avatar">
                                                    {member.user.avatar_url ? (
                                                        <img src={member.user.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                                    ) : (
                                                        <span style={{ fontSize: '1.2rem' }}>{(member.user.full_name?.[0] || 'U').toUpperCase()}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontWeight: 'bold', color: 'white', fontSize: '0.9rem' }}>{member.user.full_name}</span>
                                                    {member.role === 'admin' ? (
                                                        <span style={{ fontSize: '0.7rem', color: '#000', background: 'var(--clr-accent)', padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}>Founder</span>
                                                    ) : (
                                                        <span style={{ fontSize: '0.7rem', color: 'gray', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>Member</span>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', opacity: 0.7, marginTop: '4px' }}>
                                                    <span className={`presence-dot ${isUserOnline ? 'online' : 'offline'}`}></span>
                                                    <span>{isUserOnline ? 'Active Now' : 'Offline'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </YapLayout>
    );
};

export default ChatPage;
