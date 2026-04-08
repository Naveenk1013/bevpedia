import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, UserPlus, Shield, UserMinus, Lock, Globe, Search, Send } from 'lucide-react';
import { yapService } from '../services/yapService';

const GroupSettingsModal = ({ group, isOpen, onClose, onUpdate, onDelete, currentUser }) => {
    const [name, setName] = useState(group?.name || '');
    const [description, setDescription] = useState(group?.description || '');
    const [isPublic, setIsPublic] = useState(group?.is_public ?? true);
    const [pin, setPin] = useState(group?.pin || '');
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('settings'); // 'settings', 'members', 'privacy', 'invite'
    const [deleteConfirm, setDeleteConfirm] = useState('');
    
    // Invite related
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (isOpen && group) {
            setName(group.name);
            setDescription(group.description);
            setIsPublic(group.is_public);
            setPin(group.pin || '');
            loadMembers();
        }
    }, [isOpen, group]);

    const loadMembers = async () => {
        try {
            const data = await yapService.getGroupMembers(group.id);
            setMembers(data);
        } catch (err) {
            console.error("Failed to load members:", err);
        }
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const updated = await yapService.updateGroup(group.id, name, description);
            onUpdate(updated);
            if (activeTab === 'settings') onClose();
        } catch (err) {
            alert("Failed to update group.");
        } finally {
            setLoading(false);
        }
    };

    const handlePrivacySave = async () => {
        setLoading(true);
        try {
            const updated = await yapService.updateGroupPrivacy(group.id, isPublic, pin);
            onUpdate(updated);
            alert("Privacy settings updated.");
        } catch (err) {
            alert("Failed to update privacy settings.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (val) => {
        setSearchQuery(val);
        if (val.length < 2) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        try {
            const results = await yapService.searchUsers(val);
            // Filter out existing members
            const memberIds = new Set(members.map(m => m.user_id));
            setSearchResults(results.filter(r => !memberIds.has(r.id)));
        } catch (err) {
            console.error("Invite search failed:", err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleInvite = async (userId) => {
        try {
            await yapService.sendSocialInvite(group.id, currentUser.id, userId);
            setSearchResults(prev => prev.filter(r => r.id !== userId));
            alert("Invitation sent!");
        } catch (err) {
            alert("This user is already invited or part of the lounge.");
        }
    };

    const handleDelete = async () => {
        if (deleteConfirm !== group.name) {
            alert("Please type the group name to confirm deletion.");
            return;
        }
        if (!window.confirm(`Are you absolutely sure you want to delete ${group.name}? This cannot be undone.`)) return;
        
        setLoading(true);
        try {
            await yapService.deleteGroup(group.id);
            onDelete();
        } catch (err) {
            alert("Failed to delete group.");
        } finally {
            setLoading(false);
        }
    };

    const handleKick = async (userId) => {
        if (!window.confirm("Are you sure you want to remove this member?")) return;
        try {
            await yapService.removeMember(group.id, userId);
            setMembers(prev => prev.filter(m => m.user_id !== userId));
        } catch (err) {
            alert("Failed to remove member.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="yap-modal-overlay">
            <div className="yap-modal-content" style={{ maxWidth: '600px', height: '600px', display: 'flex', flexDirection: 'column' }}>
                <header className="yap-modal-header" style={{ borderBottom: '1px solid var(--yap-glass-border)', flexShrink: 0 }}>
                    <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {[
                            { id: 'settings', label: 'General' },
                            { id: 'privacy', label: 'Privacy' },
                            { id: 'members', label: 'Members' },
                            { id: 'invite', label: 'Invite' }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                className={`btn-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{ 
                                    background: 'transparent', 
                                    border: 'none', 
                                    color: activeTab === tab.id ? 'var(--clr-accent)' : '#888', 
                                    padding: '10px 0', 
                                    borderBottom: activeTab === tab.id ? '2px solid' : 'none', 
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    fontWeight: activeTab === tab.id ? 'bold' : 'normal'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </header>

                <div className="yap-modal-body" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
                    {activeTab === 'settings' && (
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="form-group">
                                <label style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '8px', display: 'block' }}>LOUNGE NAME</label>
                                <input 
                                    className="chat-input" 
                                    style={{ background: 'rgba(255,255,255,0.05)', width: '100%' }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '8px', display: 'block' }}>CHAPTER MISSION (DESCRIPTION)</label>
                                <textarea 
                                    className="chat-input" 
                                    style={{ background: 'rgba(255,255,255,0.05)', width: '100%', minHeight: '80px', paddingTop: '10px' }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            
                            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }} disabled={loading}>
                                <Save size={18} style={{ marginRight: '8px' }} />
                                {loading ? 'Saving...' : 'Update Lounge Details'}
                            </button>

                            <hr style={{ border: 'none', borderBottom: '1px solid var(--yap-glass-border)', margin: '20px 0' }} />
                            
                            <div className="danger-zone" style={{ padding: '20px', border: '1px solid rgba(224,92,92,0.2)', borderRadius: '12px', background: 'rgba(224,92,92,0.02)' }}>
                                <h4 style={{ color: '#e05c5c', marginBottom: '10px', fontSize: '0.9rem' }}>Danger Zone</h4>
                                <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '15px' }}>
                                    Deleting this group will permanently remove all messages and member records. This cannot be undone.
                                </p>
                                <input 
                                    className="chat-input" 
                                    placeholder={`Type "${group.name}" to confirm`}
                                    style={{ background: 'rgba(0,0,0,0.2)', width: '100%', marginBottom: '12px', borderColor: deleteConfirm === group.name ? 'var(--clr-accent)' : 'rgba(255,255,255,0.1)' }}
                                    value={deleteConfirm}
                                    onChange={(e) => setDeleteConfirm(e.target.value)}
                                />
                                <button type="button" className="btn btn-outline" style={{ color: '#e05c5c', borderColor: '#e05c5c', width: '100%' }} onClick={handleDelete} disabled={loading}>
                                    <Trash2 size={18} style={{ marginRight: '8px' }} />
                                    Delete This Lounge
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'privacy' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="form-group">
                                <label style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '12px', display: 'block' }}>DISCOVERY MODE</label>
                                <div className="privacy-toggle" style={{ background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px', display: 'flex' }}>
                                    <div 
                                        className={`toggle-option ${isPublic ? 'active' : ''}`} 
                                        onClick={() => setIsPublic(true)}
                                        style={{ flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', borderRadius: '10px', background: isPublic ? 'rgba(255,255,255,0.1)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <Globe size={16} /> Public
                                    </div>
                                    <div 
                                        className={`toggle-option ${!isPublic ? 'active' : ''}`} 
                                        onClick={() => setIsPublic(false)}
                                        style={{ flex: 1, padding: '12px', textAlign: 'center', cursor: 'pointer', borderRadius: '10px', background: !isPublic ? 'rgba(255,255,255,0.1)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <Lock size={16} /> Private
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '10px' }}>
                                    {isPublic ? "Public groups can be joined by anyone in the elite network." : "Private groups require a secure PIN for entry."}
                                </p>
                            </div>

                            <div className="form-group">
                                <label style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '8px', display: 'block' }}>SECURITY PIN (4-6 DIGITS)</label>
                                <input 
                                    className="chat-input" 
                                    placeholder="No PIN set"
                                    style={{ background: 'rgba(255,255,255,0.05)', width: '100%', textAlign: 'center', letterSpacing: '8px', fontSize: '1.2rem' }}
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                />
                            </div>

                            <button className="btn btn-primary" onClick={handlePrivacySave} disabled={loading}>
                                <Lock size={18} style={{ marginRight: '8px' }} />
                                Update Security Protocol
                            </button>
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {members.map(m => (
                                <div key={m.user_id} className="yap-user-brief" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                    <div className="avatar" style={{ width: 32, height: 32 }}>
                                        {m.profiles?.avatar_url ? (
                                            <img src={m.profiles.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                        ) : (
                                            (m.profiles?.full_name?.[0] || m.profiles?.username?.[0] || 'U').toUpperCase()
                                        )}
                                    </div>
                                    <div className="info" style={{ opacity: 1, flex: 1 }}>
                                        <p style={{ fontSize: '0.85rem' }}>{m.profiles?.full_name || `@${m.profiles?.username}` || 'Member'}</p>
                                        <p style={{ fontSize: '0.65rem', color: 'var(--clr-accent)' }}>{m.role === 'admin' ? 'Founder' : 'Elite Member'}</p>
                                    </div>
                                    {m.role !== 'admin' && (
                                        <button 
                                            className="btn-icon" 
                                            style={{ color: '#e05c5c', opacity: 0.6 }}
                                            onClick={() => handleKick(m.user_id)}
                                        >
                                            <UserMinus size={16} />
                                        </button>
                                    )}
                                    {m.role === 'admin' && <Shield size={16} color="var(--clr-accent)" style={{ opacity: 0.5 }} />}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'invite' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="chat-input-wrapper" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <Search size={18} color="#555" />
                                <input 
                                    className="chat-input" 
                                    placeholder="Invite by name or @username..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {isSearching ? (
                                    <p className="text-muted">Searching Elite Network...</p>
                                ) : searchResults.length > 0 ? (
                                    searchResults.map(user => (
                                        <div key={user.id} className="yap-user-brief" style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                                            <div className="avatar" style={{ width: 32, height: 32 }}>
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                                ) : (
                                                    (user.full_name?.[0] || user.username?.[0] || 'U').toUpperCase()
                                                )}
                                            </div>
                                            <div className="info" style={{ opacity: 1, flex: 1 }}>
                                                <p style={{ fontSize: '0.85rem' }}>{user.full_name || `@${user.username}`}</p>
                                                <p style={{ fontSize: '0.65rem', opacity: 0.5 }}>@{user.username}</p>
                                            </div>
                                            <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '5px 12px' }} onClick={() => handleInvite(user.id)}>
                                                <Send size={12} style={{ marginRight: '5px' }} /> Invite
                                            </button>
                                        </div>
                                    ))
                                ) : searchQuery.length > 1 && (
                                    <p className="text-muted">No members found matching that name.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupSettingsModal;
