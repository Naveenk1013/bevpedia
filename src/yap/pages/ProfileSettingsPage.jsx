import React, { useState, useEffect } from 'react';
import { User, Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import YapLayout from '../components/YapLayout';
import { yapService } from '../services/yapService';

const ProfileSettingsPage = ({ user }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        full_name: '',
        username: '',
        bio: '',
        avatar_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!user) return;
        const fetchProfile = async () => {
            try {
                const data = await yapService.getProfile(user.id);
                setProfile({
                    full_name: data.full_name || '',
                    username: data.username || '',
                    bio: data.bio || '',
                    avatar_url: data.avatar_url || ''
                });
            } catch (err) {
                console.error("Failed to load profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            await yapService.updateProfile(user.id, profile);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            console.error("Save failed:", err);
            setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <YapLayout user={user}><div className="text-muted">Loading profile...</div></YapLayout>;

    return (
        <YapLayout user={user}>
            <div className="discovery-header">
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ background: 'transparent', border: 'none', color: 'var(--clr-accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}
                >
                    <ArrowLeft size={20} /> Back
                </button>
                <h1 className="discovery-title">Profile Settings</h1>
                <p className="discovery-subtitle">Customize your elite identity in the network.</p>
            </div>

            <div className="chat-messages" style={{ padding: '0 20px', maxWidth: '800px' }}>
                <form onSubmit={handleSave} className="unified-box" style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                        <div style={{ position: 'relative' }}>
                            <div className="avatar" style={{ width: 120, height: 120, fontSize: '3rem' }}>
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                ) : (
                                    (profile.full_name[0] || 'U').toUpperCase()
                                )}
                            </div>
                            <button 
                                type="button"
                                className="btn-icon" 
                                style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--clr-accent)', color: 'black' }}
                                onClick={() => {
                                    const url = prompt("Enter avatar image URL:");
                                    if (url) setProfile(prev => ({ ...prev, avatar_url: url }));
                                }}
                            >
                                <Camera size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="chat-input-area" style={{ flexWrap: 'wrap', gap: '20px', background: 'transparent', padding: 0, position: 'static' }}>
                        <div style={{ width: '100%' }}>
                            <label style={{ display: 'block', color: 'var(--clr-accent)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Full Name</label>
                            <input 
                                className="chat-input" 
                                style={{ width: '100%' }}
                                value={profile.full_name}
                                onChange={e => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                                placeholder="Your real name"
                                required
                            />
                        </div>

                        <div style={{ width: '100%' }}>
                            <label style={{ display: 'block', color: 'var(--clr-accent)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Username (Professional Handle)</label>
                            <input 
                                className="chat-input" 
                                style={{ width: '100%' }}
                                value={profile.username}
                                onChange={e => setProfile(prev => ({ ...prev, username: e.target.value.toLowerCase().replace(/\s/g, '_') }))}
                                placeholder="e.g. chef_johnson"
                                required
                            />
                        </div>

                        <div style={{ width: '100%' }}>
                            <label style={{ display: 'block', color: 'var(--clr-accent)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Professional Bio</label>
                            <textarea 
                                className="chat-input" 
                                style={{ width: '100%', height: '100px', borderRadius: '15px', padding: '15px' }}
                                value={profile.bio}
                                onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                                placeholder="Tell the network about your hospitality expertise..."
                            />
                        </div>

                        {message.text && (
                            <div style={{ width: '100%', padding: '15px', borderRadius: '10px', background: message.type === 'success' ? 'rgba(48,200,138,0.1)' : 'rgba(255,0,0,0.1)', color: message.type === 'success' ? '#30c88a' : '#ff4444', textAlign: 'center' }}>
                                {message.text}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn" 
                            disabled={saving}
                            style={{ width: '100%', padding: '15px', background: 'var(--clr-accent)', color: 'black', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '10px' }}
                        >
                            <Save size={20} />
                            {saving ? 'Saving...' : 'Update Elite Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </YapLayout>
    );
};

export default ProfileSettingsPage;
