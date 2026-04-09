import React, { useState, useEffect } from 'react';
import { User, Camera, Save, ArrowLeft, Trash2, AlertTriangle, ShieldX, MapPin, Briefcase, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import YapLayout from '../components/YapLayout';
import { yapService } from '../services/yapService';
import { supabase } from '../../lib/supabaseClient';

const ProfileSettingsPage = ({ user }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        full_name: '',
        username: '',
        bio: '',
        avatar_url: '',
        is_public: true,
        location: '',
        company: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteStep, setDeleteStep] = useState(0); 
    const [message, setMessage] = useState({ type: '', text: '' });
    const [activeTab, setActiveTab] = useState('identity'); // identity | professional | security

    useEffect(() => {
        if (!user) return;
        const fetchProfile = async () => {
            try {
                const data = await yapService.getProfile(user.id);
                setProfile({
                    full_name: data.full_name || '',
                    username: data.username || '',
                    bio: data.bio || '',
                    avatar_url: data.avatar_url || '',
                    is_public: data.is_public !== undefined ? data.is_public : true,
                    location: data.location || '',
                    company: data.company || ''
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
            setMessage({ type: 'success', text: 'Identity perfectly synchronized!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            console.error("Save failed:", err);
            setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteStep < 2) {
            setDeleteStep(prev => prev + 1);
            return;
        }

        setIsDeleting(true);
        try {
            await yapService.deleteAccount();
            await supabase.auth.signOut();
            navigate('/yap/login');
        } catch (err) {
            console.error("Purge failed:", err);
            alert("Security protocol failed to execute purge. Please contact Sapience Support.");
            setIsDeleting(false);
            setDeleteStep(0);
        }
    };

    if (loading) return <YapLayout user={user}><div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }} className="text-muted">Analyzing identity...</div></YapLayout>;

    return (
        <YapLayout user={user}>
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ marginBottom: '30px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
                >
                    <div>
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/yap/community')} 
                            className="btn-icon"
                            style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '50%', marginBottom: '15px' }}
                        >
                            <ArrowLeft size={20} />
                        </motion.button>
                        <h1 className="discovery-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', margin: 0 }}>Dashboard</h1>
                        <p className="discovery-subtitle" style={{ margin: 0 }}>Manage your elite trajectory.</p>
                    </div>
                </motion.div>

                {/* Dashboard Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {['identity', 'professional', 'security'].map(tab => (
                        <motion.button
                            key={tab}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '30px',
                                background: activeTab === tab ? 'var(--clr-accent)' : 'rgba(255,255,255,0.05)',
                                color: activeTab === tab ? 'black' : 'white',
                                border: 'none',
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            {tab}
                        </motion.button>
                    ))}
                </div>

                <div className="chat-messages" style={{ padding: '0 0 100px', flex: 'none', height: 'auto', overflowY: 'visible' }}>
                    <motion.form 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSave} 
                        className="unified-box glass-morphism" 
                        style={{ padding: 'clamp(20px, 5vw, 40px)', borderRadius: '28px', border: '1px solid var(--yap-glass-border)' }}
                    >
                        
                        <AnimatePresence mode="wait">
                            {/* IDENTITY TAB */}
                            {activeTab === 'identity' && (
                                <motion.div key="identity" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                                        <div style={{ position: 'relative' }}>
                                            <motion.div 
                                                className="avatar" 
                                                whileHover={{ scale: 1.05 }}
                                                style={{ width: 120, height: 120, fontSize: '3rem', border: '4px solid var(--yap-glass-border)' }}
                                            >
                                                {profile.avatar_url ? (
                                                    <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                                ) : (
                                                    (profile.full_name[0] || 'U').toUpperCase()
                                                )}
                                            </motion.div>
                                            <motion.button 
                                                whileTap={{ scale: 0.8 }}
                                                type="button"
                                                className="btn-icon" 
                                                style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--clr-accent)', color: 'black', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                                                onClick={() => {
                                                    const url = prompt("Enter avatar image URL:");
                                                    if (url) setProfile(prev => ({ ...prev, avatar_url: url }));
                                                }}
                                            >
                                                <Camera size={18} />
                                            </motion.button>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ width: '100%' }}>
                                            <label style={{ display: 'block', color: 'var(--clr-accent)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', opacity: 0.8 }}>Full Name</label>
                                            <input 
                                                className="chat-input" 
                                                style={{ width: '100%', padding: '14px 18px', borderRadius: '14px' }}
                                                value={profile.full_name}
                                                onChange={e => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                                                placeholder="Your real name"
                                                required
                                            />
                                        </div>

                                        <div style={{ width: '100%' }}>
                                            <label style={{ display: 'block', color: 'var(--clr-accent)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', opacity: 0.8 }}>Professional Handle</label>
                                            <input 
                                                className="chat-input" 
                                                style={{ width: '100%', padding: '14px 18px', borderRadius: '14px' }}
                                                value={profile.username}
                                                onChange={e => setProfile(prev => ({ ...prev, username: e.target.value.toLowerCase().replace(/\s/g, '_') }))}
                                                placeholder="e.g. chef_johnson"
                                                required
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* PROFESSIONAL TAB */}
                            {activeTab === 'professional' && (
                                <motion.div key="professional" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ width: '100%' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--clr-accent)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', opacity: 0.8 }}>
                                                <Briefcase size={14} /> Current Workplace
                                            </label>
                                            <input 
                                                className="chat-input" 
                                                style={{ width: '100%', padding: '14px 18px', borderRadius: '14px' }}
                                                value={profile.company}
                                                onChange={e => setProfile(prev => ({ ...prev, company: e.target.value }))}
                                                placeholder="e.g. The Grand Hotel / Velocity Lounge"
                                            />
                                        </div>

                                        <div style={{ width: '100%' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--clr-accent)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', opacity: 0.8 }}>
                                                <MapPin size={14} /> Location Base
                                            </label>
                                            <input 
                                                className="chat-input" 
                                                style={{ width: '100%', padding: '14px 18px', borderRadius: '14px' }}
                                                value={profile.location}
                                                onChange={e => setProfile(prev => ({ ...prev, location: e.target.value }))}
                                                placeholder="e.g. Mumbai, India"
                                            />
                                        </div>

                                        <div style={{ width: '100%' }}>
                                            <label style={{ display: 'block', color: 'var(--clr-accent)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', opacity: 0.8 }}>Expertise & Bio</label>
                                            <textarea 
                                                className="chat-input" 
                                                style={{ width: '100%', height: '120px', borderRadius: '18px', padding: '18px', lineHeight: '1.6' }}
                                                value={profile.bio}
                                                onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                                                placeholder="Tell the network about your hospitality expertise..."
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* SECURITY TAB */}
                            {activeTab === 'security' && (
                                <motion.div key="security" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                    
                                    {/* Privacy Toggle */}
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '20px', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
                                                    {profile.is_public ? <Eye size={20} color="var(--clr-accent)" /> : <EyeOff size={20} />} 
                                                    Network Visibility
                                                </h3>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                                                    {profile.is_public ? "Your profile is indexable and viewable by the community." : "Your profile is locked. Other members cannot view your details."}
                                                </p>
                                            </div>
                                            
                                            {/* Beautiful custom toggle */}
                                            <div 
                                                onClick={() => setProfile(prev => ({ ...prev, is_public: !prev.is_public }))}
                                                style={{
                                                    width: '60px', height: '32px', 
                                                    background: profile.is_public ? 'var(--clr-accent)' : 'rgba(255,255,255,0.1)',
                                                    borderRadius: '30px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '4px',
                                                    cursor: 'pointer',
                                                    justifyContent: profile.is_public ? 'flex-end' : 'flex-start',
                                                    transition: 'background 0.3s'
                                                }}
                                            >
                                                <motion.div 
                                                    layout
                                                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                                                    style={{ width: '24px', height: '24px', background: profile.is_public ? 'black' : 'white', borderRadius: '50%' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Danger Zone */}
                                    <div style={{ borderTop: '1px solid rgba(224, 92, 92, 0.2)', paddingTop: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#e05c5c' }}>
                                            <ShieldX size={20} />
                                            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Danger Zone</h2>
                                        </div>
                                        
                                        <div style={{ padding: '24px', background: 'rgba(224, 92, 92, 0.05)', border: '1px solid rgba(224, 92, 92, 0.1)', borderRadius: '20px' }}>
                                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '20px' }}>
                                                Initiating an account purge will permanently remove your profile, all created lounges, and private conversations. This action is **irreversible**.
                                            </p>
                                            
                                            <AnimatePresence mode="wait">
                                                {deleteStep === 0 ? (
                                                    <motion.button 
                                                        type="button"
                                                        key="idle"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="btn"
                                                        onClick={() => setDeleteStep(1)}
                                                        style={{ background: 'transparent', border: '1px solid #e05c5c', color: '#e05c5c', width: 'auto', padding: '10px 24px' }}
                                                    >
                                                        Delete Account
                                                    </motion.button>
                                                ) : (
                                                    <motion.div 
                                                        key="confirm"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e05c5c', fontSize: '0.85rem' }}>
                                                            <AlertTriangle size={16} />
                                                            <span>{deleteStep === 1 ? 'Are you absolutely sure?' : 'Final Warning: Complete data wipe will occur.'}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '12px' }}>
                                                            <button 
                                                                type="button"
                                                                className="btn" 
                                                                onClick={handleDeleteAccount}
                                                                disabled={isDeleting}
                                                                style={{ background: '#e05c5c', color: 'white', border: 'none', padding: '10px 24px' }}
                                                            >
                                                                {isDeleting ? 'Purging...' : deleteStep === 1 ? 'Yes, I understand' : 'PURGE EVERYTHING'}
                                                            </button>
                                                            <button 
                                                                type="button"
                                                                className="btn" 
                                                                onClick={() => setDeleteStep(0)}
                                                                style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', padding: '10px 24px' }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ marginTop: '30px' }}>
                            <AnimatePresence>
                                {message.text && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ width: '100%', padding: '15px', borderRadius: '12px', background: message.type === 'success' ? 'rgba(48,200,138,0.1)' : 'rgba(255,0,0,0.1)', color: message.type === 'success' ? '#30c88a' : '#ff4444', textAlign: 'center', fontSize: '0.9rem', marginBottom: '15px' }}
                                    >
                                        {message.text}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button 
                                type="submit" 
                                className="btn" 
                                whileTap={{ scale: 0.98 }}
                                disabled={saving}
                                style={{ width: '100%', padding: '16px', background: 'var(--clr-accent)', color: 'black', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '10px', borderRadius: '14px' }}
                            >
                                <Save size={20} />
                                {saving ? 'Synchronizing...' : 'Save Settings'}
                            </motion.button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </YapLayout>
    );
};

export default ProfileSettingsPage;
