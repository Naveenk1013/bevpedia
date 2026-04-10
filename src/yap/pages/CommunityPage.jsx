import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Users, GraduationCap, MessageSquare, Coffee, Wine, GlassWater, Hotel, Check, X, Bell, Plus, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../utils/soundEngine';
import YapLayout from '../components/YapLayout';
import GroupCard from '../components/GroupCard';
import CreateGroupModal from '../components/CreateGroupModal';
import { yapService } from '../services/yapService';

const CATEGORIES = [
    { id: 'All', name: 'All', icon: Globe, color: 'var(--clr-accent)' },
    { id: 'Mixology', name: 'Mixology', icon: Wine, color: '#c9963a' },
    { id: 'Baristi', name: 'Baristi', icon: Coffee, color: '#7c5cfc' },
    { id: 'Sommelier', name: 'Sommelier', icon: GlassWater, color: '#30c88a' },
    { id: 'Front Office', name: 'Front Office', icon: Hotel, color: '#e05c5c' }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const CommunityPage = ({ user }) => {
    const [groups, setGroups] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate = useNavigate();
    const { play } = useSound('ui/click_1');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [groupData, inviteData] = await Promise.all([
                    yapService.getPublicGroups(),
                    user ? yapService.getInvitations(user.id) : []
                ]);
                setGroups(groupData);
                setInvitations(inviteData || []);
            } catch (err) {
                console.error("Failed to fetch community data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const filteredGroups = useMemo(() => {
        return groups.filter(g => {
            const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
            const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 (g.description && g.description.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [groups, selectedCategory, searchTerm]);

    const handleJoin = async (groupId) => {
        play();
        if (!user) {
            alert("Please login to join a group!");
            return;
        }
        try {
            await yapService.joinGroup(groupId, user.id);
            navigate(`/yap/chat/${groupId}`);
        } catch (err) {
            if (err.code === '23505') {
                navigate(`/yap/chat/${groupId}`);
            } else {
                console.error("Join failed:", err);
            }
        }
    };

    const handleInviteAction = async (invite, status) => {
        try {
            await yapService.respondToInvite(invite.id, status, invite.group_id, user.id);
            setInvitations(prev => prev.filter(i => i.id !== invite.id));
            if (status === 'accepted') {
                navigate(`/yap/chat/${invite.group_id}`);
            }
        } catch (err) {
            console.error("Invite response failed:", err);
        }
    };

    return (
        <YapLayout user={user}>
            <div className="community-page-wrapper">
                
                {/* PREMIUM DISCOVERY HEADER */}
                <header className="discovery-header sticky-header">
                    <div className="discovery-header-main">
                        <div>
                            <h1>Network</h1>
                            <p className="header-subtitle">{filteredGroups.length} active hospitality lounges</p>
                        </div>
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowCreateModal(true)}
                            className="btn-icon mobile-only"
                            style={{ background: 'var(--clr-accent)', color: '#000', borderRadius: '14px', width: 44, height: 44, boxShadow: '0 4px 12px rgba(201, 150, 58, 0.3)' }}
                        >
                            <Plus size={24} />
                        </motion.button>
                    </div>

                    {/* SEARCH & FILTERS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div className={`search-bar glass-morphism ${isSearchFocused ? 'focused' : ''}`}>
                            <Search size={18} className="search-icon" style={{ opacity: 0.5, color: isSearchFocused ? 'var(--clr-accent)' : 'inherit', transition: 'color 0.3s' }} />
                            <input 
                                type="text" 
                                placeholder="Search lounges..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                        </div>

                        <div className="status-bar">
                            {CATEGORIES.map(cat => (
                                <motion.div 
                                    key={cat.id} 
                                    className={`status-item ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    whileTap={{ scale: 0.94 }}
                                >
                                    <div className="status-avatar-wrapper">
                                        <div className="status-avatar">
                                            <cat.icon size={22} color={selectedCategory === cat.id ? cat.color : '#fff'} strokeWidth={selectedCategory === cat.id ? 2.5 : 2} />
                                        </div>
                                    </div>
                                    <span style={{ 
                                        color: selectedCategory === cat.id ? '#fff' : '#888',
                                        fontSize: '0.7rem',
                                        fontWeight: selectedCategory === cat.id ? '700' : '500',
                                        letterSpacing: '0.05em',
                                        marginTop: '4px',
                                        display: 'block',
                                        transition: 'all 0.3s'
                                    }}>{cat.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="community-scroll-content">

                    <AnimatePresence>
                        {invitations.length > 0 && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ marginBottom: '20px', overflow: 'hidden' }}
                            >
                                <div style={{ 
                                    padding: '20px', 
                                    background: 'rgba(201, 150, 58, 0.05)', 
                                    border: '1px solid rgba(201, 150, 58, 0.1)', 
                                    borderRadius: '20px' 
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                                        <Bell size={16} color="var(--clr-accent)" />
                                        <h3 style={{ fontSize: '0.75rem', fontWeight: 'bold', margin: 0, letterSpacing: '0.1em', opacity: 0.7 }}>PENDING INVITATIONS</h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {invitations.map(invite => (
                                            <div key={invite.id} style={{ 
                                                background: 'rgba(255,255,255,0.03)', 
                                                padding: '12px', 
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }}>
                                                <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                                                    {invite.inviter?.full_name?.[0]?.toUpperCase() || 'E'}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontSize: '0.8rem', margin: 0, lineHeight: '1.4' }}>
                                                        <strong>{invite.inviter?.full_name}</strong> invited you to <strong>{invite.group?.name}</strong>
                                                    </p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    <button onClick={() => handleInviteAction(invite, 'accepted')} style={{ background: 'var(--clr-accent)', color: '#000', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer' }}>
                                                        <Check size={14} />
                                                    </button>
                                                    <button onClick={() => handleInviteAction(invite, 'declined')} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer' }}>
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div 
                        className="groups-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={`${selectedCategory}-${searchTerm}`}
                    >
                        {loading ? (
                            <div className="text-muted">Analyzing legacy channels...</div>
                        ) : filteredGroups.length > 0 ? (
                            filteredGroups.map(group => (
                                <motion.div key={group.id} variants={itemVariants} whileTap={{ scale: 0.98 }}>
                                    <GroupCard 
                                        group={group} 
                                        onJoin={handleJoin} 
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-muted" 
                                style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 40px' }}
                            >
                                <Globe size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                                <p>No {selectedCategory !== 'All' ? selectedCategory : ''} active lounges found.<br/>The network is waiting for you.</p>
                                <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setShowCreateModal(true)}>
                                    Initiate Legacy
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* MOBILE FAB - Refined for safe distance from nav */}
                <motion.button 
                    className="mobile-fab"
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => setShowCreateModal(true)}
                >
                    <Plus size={28} />
                </motion.button>


                {showCreateModal && (
                    <CreateGroupModal 
                        user={user} 
                        onClose={() => setShowCreateModal(false)} 
                    />
                )}
            </div>
        </YapLayout>
    );
};

export default CommunityPage;
