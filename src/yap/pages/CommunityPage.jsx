import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Users, GraduationCap, MessageSquare, Coffee, Wine, GlassWater, Hotel, Check, X, Bell } from 'lucide-react';
import YapLayout from '../components/YapLayout';
import GroupCard from '../components/GroupCard';
import CreateGroupModal from '../components/CreateGroupModal';
import { yapService } from '../services/yapService';

const CATEGORIES = [
    { id: 'All', name: 'All Lounges', icon: Globe, color: 'var(--clr-accent)' },
    { id: 'Mixology', name: 'Mixology', icon: Wine, color: '#c9963a' },
    { id: 'Baristi', name: 'Baristi', icon: Coffee, color: '#7c5cfc' },
    { id: 'Sommelier', name: 'Sommelier', icon: GlassWater, color: '#30c88a' },
    { id: 'Front Office', name: 'Front Office', icon: Hotel, color: '#e05c5c' }
];

const CommunityPage = ({ user }) => {
    const [groups, setGroups] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

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
        if (selectedCategory === 'All') return groups;
        return groups.filter(g => g.category === selectedCategory);
    }, [groups, selectedCategory]);

    const handleJoin = async (groupId, pin = null) => {
        if (!user) {
            alert("Please login to join a group!");
            return;
        }
        try {
            await yapService.joinGroup(groupId, user.id);
            navigate(`/yap/chat/${groupId}`);
        } catch (err) {
            if (err.code === '23505') { // Unique constraint violation (already joined)
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
            {/* Active Groups / Stories Bar */}
            <div className="status-bar" style={{ 
                padding: '20px', 
                display: 'flex', 
                gap: '20px', 
                overflowX: 'auto', 
                scrollbarWidth: 'none',
                background: 'rgba(0,0,0,0.2)',
                marginBottom: '10px'
            }}>
                {CATEGORIES.map(cat => (
                    <div 
                        key={cat.id} 
                        className={`status-item ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{ cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s ease' }}
                    >
                        <div className="status-avatar-wrapper" style={{ 
                            background: selectedCategory === cat.id ? cat.color : 'rgba(255,255,255,0.05)',
                            padding: '2px',
                            border: `2px solid ${selectedCategory === cat.id ? cat.color : 'transparent'}`,
                            boxShadow: selectedCategory === cat.id ? `0 0 20px ${cat.color}44` : 'none',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: selectedCategory === cat.id ? 'scale(1.1)' : 'scale(1)'
                        }}>
                            <div className="status-avatar" style={{ background: selectedCategory === cat.id ? '#000' : 'transparent' }}>
                                <cat.icon size={24} color={selectedCategory === cat.id ? cat.color : '#fff'} />
                            </div>
                        </div>
                        <span className="status-name" style={{ 
                            color: selectedCategory === cat.id ? '#fff' : '#888',
                            fontSize: '0.75rem',
                            fontWeight: selectedCategory === cat.id ? 'bold' : 'normal',
                            marginTop: '8px',
                            display: 'block',
                            letterSpacing: '0.02em'
                        }}>{cat.name}</span>
                    </div>
                ))}
            </div>

            <div style={{ padding: '0 20px' }}>
                {invitations.length > 0 && (
                    <div className="invitations-section animate-fade-in" style={{ 
                        margin: '20px 0', 
                        padding: '20px', 
                        background: 'rgba(201, 150, 58, 0.05)', 
                        border: '1px solid rgba(201, 150, 58, 0.1)', 
                        borderRadius: '20px' 
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                            <Bell size={18} color="var(--clr-accent)" />
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: 0, letterSpacing: '0.05em' }}>LOUNGE INVITATIONS</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {invitations.map(invite => (
                                <div key={invite.id} className="yap-user-brief" style={{ 
                                    opacity: 1, 
                                    background: 'rgba(255,255,255,0.03)', 
                                    padding: '12px 16px', 
                                    borderRadius: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <div className="avatar" style={{ width: 36, height: 36, background: 'var(--yap-accent-gradient)' }}>
                                        {invite.inviter?.full_name?.[0]?.toUpperCase() || 'E'}
                                    </div>
                                    <div className="info" style={{ opacity: 1, flex: 1 }}>
                                        <p style={{ fontSize: '0.85rem' }}>
                                            <strong>{invite.inviter?.full_name}</strong> invited you to join <strong>{invite.group?.name}</strong>
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn-icon" onClick={() => handleInviteAction(invite, 'accepted')} style={{ background: 'var(--clr-accent)', color: '#000', borderRadius: '50%', width: 32, height: 32 }}>
                                            <Check size={16} />
                                        </button>
                                        <button className="btn-icon" onClick={() => handleInviteAction(invite, 'declined')} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '50%', width: 32, height: 32 }}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <header className="community-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                        <h1 className="community-title">
                            {selectedCategory === 'All' ? 'Discover Communities' : `${selectedCategory} Lounges`}
                        </h1>
                        <p className="community-subtitle">
                            {selectedCategory === 'All' 
                                ? 'The official Bevpedia network for hospitality elite.' 
                                : `Connecting the world's finest ${selectedCategory.toLowerCase()} professionals.`}
                        </p>
                    </div>
                    {selectedCategory !== 'All' && (
                        <button className="text-link" onClick={() => setSelectedCategory('All')} style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                            Clear Filter
                        </button>
                    )}
                </div>
            </header>

            <div className="groups-grid">
                {loading ? (
                    <div className="text-muted">Analyzing networks...</div>
                ) : filteredGroups.length > 0 ? (
                    filteredGroups.map(group => (
                        <GroupCard 
                            key={group.id} 
                            group={group} 
                            onJoin={handleJoin} 
                        />
                    ))
                ) : (
                    <div className="text-muted" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 40px' }}>
                        <Globe size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                        <p>No active {selectedCategory !== 'All' ? selectedCategory : ''} chapters found.<br/>Be the first to start this legacy.</p>
                        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setShowCreateModal(true)}>
                            Launch {selectedCategory !== 'All' ? selectedCategory : 'New'} Lounge
                        </button>
                    </div>
                )}
            </div>

            {showCreateModal && (
                <CreateGroupModal 
                    user={user} 
                    onClose={() => setShowCreateModal(false)} 
                />
            )}
        </YapLayout>
    );
};

export default CommunityPage;
