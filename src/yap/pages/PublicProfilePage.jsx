import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Briefcase, Lock, MessageSquare, ShieldCheck } from 'lucide-react';
import YapLayout from '../components/YapLayout';
import { yapService } from '../services/yapService';

const PublicProfilePage = ({ user }) => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isOwner = user?.id === userId;

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await yapService.getProfile(userId);
                setProfile(data);
            } catch (err) {
                console.error("Profile load error:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [userId]);

    if (loading) {
        return (
            <YapLayout user={user}>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', color: 'var(--clr-accent)' }}>
                    Scanning network identity...
                </div>
            </YapLayout>
        );
    }

    if (error || !profile) {
        return (
            <YapLayout user={user}>
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    <h2>Identity Not Found</h2>
                    <p>The profile you are looking for does not exist or has been purged.</p>
                    <button className="btn" onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>Go Back</button>
                </div>
            </YapLayout>
        );
    }

    const isVisible = profile.is_public || isOwner;

    return (
        <YapLayout user={user}>
            <div style={{ padding: '0px 20px 100px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                
                {/* Header Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
                    <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(-1)} 
                        className="btn-icon"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '50%' }}
                    >
                        <ArrowLeft size={20} />
                    </motion.button>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="glass-morphism profile-card"
                    style={{ 
                        overflow: 'hidden', 
                        position: 'relative', 
                        marginTop: '20px',
                        padding: '0'
                    }}
                >
                    {/* Abstract Banner Component */}
                    <div style={{ 
                        height: '140px', 
                        background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.2), rgba(124, 92, 252, 0.4))',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', bottom: '-40px', left: '30px' }}>
                            <div style={{ 
                                width: '80px', height: '80px', 
                                borderRadius: '50%', 
                                border: '4px solid #0a0a0a',
                                background: '#1a1a1a',
                                overflow: 'hidden',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                {profile.avatar_url ? (
                                    <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '2rem', color: 'var(--clr-accent)', fontWeight: 'bold' }}>
                                        {(profile.full_name?.[0] || 'U').toUpperCase()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Container */}
                    <div style={{ padding: '50px 30px 40px' }}>
                        
                        {!isVisible ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.7 }}>
                                <Lock size={48} style={{ marginBottom: '20px', color: 'rgba(255,255,255,0.4)' }} />
                                <h3>Account is Private</h3>
                                <p style={{ fontSize: '0.9rem' }}>This member has isolated their identity from the public network.</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h1 style={{ margin: '0 0 4px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {profile.full_name} 
                                            {isOwner && <ShieldCheck size={20} color="var(--clr-accent)" title="This is you" />}
                                        </h1>
                                        {profile.username && <p style={{ margin: 0, color: 'var(--clr-accent)', fontWeight: 'bold', fontSize: '1rem' }}>@{profile.username}</p>}
                                    </div>
                                    
                                    {!isOwner && (
                                        <motion.button 
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate(`/yap/messages/${userId}`)}
                                            className="btn" 
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '30px' }}
                                        >
                                            <MessageSquare size={16} /> Direct Message
                                        </motion.button>
                                    )}
                                </div>

                                {/* Details / Bio */}
                                {profile.bio && (
                                    <div style={{ marginTop: '30px' }}>
                                        <p style={{ lineHeight: '1.6', fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>{profile.bio}</p>
                                    </div>
                                )}

                                {/* Meta Info (Location / Company) */}
                                {(profile.location || profile.company) && (
                                    <div style={{ display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap' }}>
                                        {profile.location && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                                                <MapPin size={16} /> {profile.location}
                                            </div>
                                        )}
                                        {profile.company && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                                                <Briefcase size={16} /> {profile.company}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                        
                    </div>
                </motion.div>
            </div>
        </YapLayout>
    );
};

export default PublicProfilePage;
