import React, { useState } from 'react';
import { X, Users, Globe, Lock, Plus, Wine, Coffee, GlassWater, Hotel } from 'lucide-react';
import { yapService } from '../services/yapService';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
    { id: 'Mixology', name: 'Mixology', icon: Wine, color: '#c9963a' },
    { id: 'Baristi', name: 'Baristi', icon: Coffee, color: '#7c5cfc' },
    { id: 'Sommelier', name: 'Sommelier', icon: GlassWater, color: '#30c88a' },
    { id: 'Front Office', name: 'Front Office', icon: Hotel, color: '#e05c5c' },
    { id: 'Others', name: 'Global', icon: Globe, color: '#999' }
];

const CreateGroupModal = ({ user, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Others');
    const [isPublic, setIsPublic] = useState(true);
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            const group = await yapService.createGroup(name, description, user.id, isPublic, pin, category);
            // Service already joins the creator as admin
            onClose();
            navigate(`/yap/chat/${group.id}`);
        } catch (err) {
            console.error("Group creation failed:", err);
            alert("Failed to create group. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="yap-modal-overlay">
            <div className="yap-modal-content">
                <div className="yap-modal-header">
                    <div className="flex items-center gap-3">
                        <div className="status-avatar-wrapper" style={{ width: 44, height: 44, padding: 2 }}>
                            <div className="status-avatar" style={{ background: 'var(--clr-accent)' }}>
                                <Plus size={20} color="#000" />
                            </div>
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Create Group</h2>
                            <p className="text-muted" style={{ fontSize: '0.8rem', margin: 0 }}>Start a new hospitality legacy.</p>
                        </div>
                    </div>
                    <button className="btn-icon" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="yap-form">
                    <div className="form-group">
                        <label>Specialty Category</label>
                        <div className="category-selector" style={{ 
                            display: 'flex', 
                            gap: '10px', 
                            overflowX: 'auto', 
                            padding: '10px 0',
                            scrollbarWidth: 'none'
                        }}>
                            {CATEGORIES.map(cat => (
                                <div 
                                    key={cat.id} 
                                    className={`category-opt ${category === cat.id ? 'active' : ''}`}
                                    onClick={() => setCategory(cat.id)}
                                    style={{
                                        minWidth: '70px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 8px',
                                        borderRadius: '12px',
                                        background: category === cat.id ? 'rgba(201, 150, 58, 0.15)' : 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${category === cat.id ? 'var(--clr-accent)' : 'transparent'}`,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{ color: category === cat.id ? 'var(--clr-accent)' : '#666' }}>
                                        <cat.icon size={20} />
                                    </div>
                                    <span style={{ fontSize: '0.7rem', color: category === cat.id ? '#fff' : '#888' }}>{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Community Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Master Mixologists" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            placeholder="What is this community about?" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label>Privacy Setting</label>
                        <div className="privacy-toggle" onClick={() => setIsPublic(!isPublic)}>
                            <div className={`toggle-option ${isPublic ? 'active' : ''}`}>
                                <Globe size={16} />
                                <span>Public</span>
                            </div>
                            <div className={`toggle-option ${!isPublic ? 'active' : ''}`}>
                                <Lock size={16} />
                                <span>Private</span>
                            </div>
                        </div>
                        <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '8px' }}>
                            {isPublic 
                                ? "Anyone can discover and join this community." 
                                : "Only elite members with the PIN can join."}
                        </p>
                    </div>

                    {!isPublic && (
                        <div className="form-group animate-fade-in">
                            <label>Security PIN (4-6 digits)</label>
                            <input 
                                type="text" 
                                placeholder="Set a unique lounge PIN" 
                                value={pin}
                                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                style={{ letterSpacing: '8px', fontSize: '1.2rem', textAlign: 'center' }}
                                required={!isPublic}
                            />
                        </div>
                    )}

                    <div className="yap-modal-footer">
                        <button type="button" className="btn outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Launch Community'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupModal;
