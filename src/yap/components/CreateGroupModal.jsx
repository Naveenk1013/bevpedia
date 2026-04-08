import React, { useState } from 'react';
import { X, Users, Globe, Lock, Plus } from 'lucide-react';
import { yapService } from '../services/yapService';
import { useNavigate } from 'react-router-dom';

const CreateGroupModal = ({ user, onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            const group = await yapService.createGroup(name, description, user.id);
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
                                : "Only invited members can find this community."}
                        </p>
                    </div>

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
