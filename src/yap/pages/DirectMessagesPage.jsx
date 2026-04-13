import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Search, User } from 'lucide-react';
import { useSound } from '../utils/soundEngine';
import YapLayout from '../components/YapLayout';
import { yapService } from '../services/yapService';

const DirectMessagesPage = ({ user }) => {
    const [conversations, setConversations] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();
    const { play } = useSound('ui/click_1');

    useEffect(() => {
        if (!user) {
            navigate('/yap/community');
            return;
        }

        const fetchConversations = async () => {
            try {
                const data = await yapService.getRecentConversations(user.id);
                setConversations(data);
            } catch (err) {
                console.error("Failed to fetch conversations:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchConversations();
    }, [user, navigate]);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        setSearching(true);
        try {
            const results = await yapService.searchUsers(query);
            // Filter out current user
            setSearchResults(results.filter(r => r.id !== user.id));
        } catch (err) {
            console.error("Search failed:", err);
        } finally {
            setSearching(false);
        }
    };

    return (
        <YapLayout user={user}>
            <div className="community-page-wrapper">
                <header className="discovery-header sticky-header">
                    <div className="discovery-header-main">
                        <div>
                            <h1>Messages</h1>
                            <p className="header-subtitle">Private conversations with the network.</p>
                        </div>
                    </div>
                </header>

                <div className="community-scroll-content" style={{ padding: '0 20px 24px' }}>
                <div style={{ paddingBottom: '20px' }}>
                    <div className="chat-input-wrapper">
                        <Search size={18} color="#555" />
                        <input 
                            className="chat-input" 
                            placeholder="Search member name or @username..." 
                            style={{ fontSize: '0.9rem' }} 
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                {/* Search Results */}
                {searchQuery.length >= 2 && (
                    <div style={{ marginBottom: '30px' }}>
                        <p style={{ fontSize: '0.7rem', color: 'var(--clr-accent)', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' }}>
                            {searching ? 'Searching Elite Network...' : `Results for "${searchQuery}"`}
                        </p>
                        {searchResults.length > 0 ? (
                            searchResults.map(result => (
                                <div 
                                    key={result.id} 
                                    className="yap-nav-item" 
                                    style={{ padding: '12px', background: 'rgba(201,150,58,0.05)', borderRadius: '12px', marginBottom: '8px', cursor: 'pointer' }}
                                    onClick={() => {
                                        play();
                                        navigate(`/yap/messages/${result.id}`);
                                    }}
                                >
                                    <div className="yap-user-brief">
                                        <div className="avatar" style={{ width: 40, height: 40 }}>
                                            {result.avatar_url ? (
                                                <img src={result.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                            ) : (
                                                (result.full_name?.[0] || result.username?.[0] || 'U').toUpperCase()
                                            )}
                                        </div>
                                        <div className="info" style={{ opacity: 1, flex: 1 }}>
                                            <p className="name" style={{ color: '#fff', fontSize: '0.9rem' }}>{result.full_name || `@${result.username}` || 'Network Member'}</p>
                                            <p className="status" style={{ fontSize: '0.75rem', color: 'var(--clr-accent)' }}>@{result.username}</p>
                                        </div>
                                        <MessageSquare size={16} color="var(--clr-accent)" />
                                    </div>
                                </div>
                            ))
                        ) : !searching && (
                            <p className="text-muted" style={{ fontSize: '0.85rem' }}>No members found matching that name.</p>
                        )}
                        <hr style={{ border: 'none', borderBottom: '1px solid var(--yap-glass-border)', margin: '20px 0' }} />
                    </div>
                )}

                {loading ? (
                    <div className="text-muted">Loading threads...</div>
                ) : conversations.length > 0 ? (
                    conversations.map(conv => (
                        <div 
                            key={conv.id} 
                            className="yap-nav-item" 
                            style={{ 
                                height: 'auto', 
                                padding: '16px', 
                                borderBottom: '1px solid var(--yap-glass-border)',
                                cursor: 'pointer',
                                background: 'transparent'
                            }}
                            onClick={() => {
                                play();
                                navigate(`/yap/messages/${conv.id}`);
                            }}
                        >
                            <div className="yap-user-brief">
                                <div className="avatar" style={{ width: 50, height: 50 }}>
                                    {conv.user?.avatar_url ? (
                                        <img src={conv.user.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                    ) : (
                                        (conv.user?.full_name?.[0] || conv.user?.username?.[0] || 'U').toUpperCase()
                                    )}
                                </div>
                                <div className="info" style={{ opacity: 1, flex: 1 }}>
                                    <p className="name" style={{ color: '#fff', fontSize: '1rem' }}>{conv.user?.full_name || `@${conv.user?.username}` || 'Elite Member'}</p>
                                    <p className="status" style={{ fontSize: '0.8rem', opacity: 0.6, width: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {conv.lastMessage}
                                    </p>
                                </div>
                                <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                                    {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-muted" style={{ textAlign: 'center', padding: '100px 20px' }}>
                        <MessageSquare size={64} style={{ opacity: 0.1, marginBottom: '20px' }} />
                        <p>No direct messages yet.</p>
                        <p style={{ fontSize: '0.8rem' }}>Click "Direct" on a member profile to start chatting.</p>
                    </div>
                )}
                </div>
            </div>
        </YapLayout>
    );
};

export default DirectMessagesPage;
