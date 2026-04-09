import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from '../utils/soundEngine';
import YapLayout from '../components/YapLayout';
import GroupCard from '../components/GroupCard';
import CreateGroupModal from '../components/CreateGroupModal';
import { yapService } from '../services/yapService';

const MyGroupsPage = ({ user }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const navigate = useNavigate();
    const { play } = useSound('ui/click_1');

    useEffect(() => {
        if (!user) {
            navigate('/yap/community');
            return;
        }

        const fetchMyGroups = async () => {
            try {
                const data = await yapService.getUserGroups(user.id);
                setGroups(data);
            } catch (err) {
                console.error("Failed to fetch my groups:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyGroups();
    }, [user, navigate]);

    const handleJoin = (groupId) => {
        play();
        navigate(`/yap/chat/${groupId}`);
    };

    return (
        <YapLayout user={user}>
            <div className="community-page-wrapper">
                <header className="discovery-header sticky-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1>My Communities</h1>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.5 }}>Your active hospitality networks</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="btn-icon" 
                                style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '14px', width: 44, height: 44, border: '1px solid rgba(255,255,255,0.1)' }}
                                onClick={() => { play(); setShowCreateModal(true); }}
                            >
                                <Plus size={20} />
                            </motion.button>
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary" 
                                style={{ borderRadius: '14px', padding: '0 20px', height: 44, fontSize: '0.85rem' }}
                                onClick={() => { play(); navigate('/yap/community'); }}
                            >
                                Discover
                            </motion.button>
                        </div>
                    </div>
                </header>

                <div className="community-scroll-content">
                    <div className="groups-grid">
                        {loading ? (
                            <div className="text-muted" style={{ padding: '40px', textAlign: 'center', gridColumn: '1/-1' }}>
                                <div className="loader-dots">Analyzing legacy connections...</div>
                            </div>
                        ) : groups.length > 0 ? (
                            groups.map(group => (
                                <motion.div key={group.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                    <GroupCard 
                                        group={group} 
                                        onJoin={() => handleJoin(group.id)} 
                                        isJoined={true}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-muted" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '120px 40px' }}>
                                <Users size={64} style={{ opacity: 0.05, marginBottom: '24px' }} />
                                <h3 style={{ color: '#fff', marginBottom: '12px' }}>No active chapters</h3>
                                <p style={{ maxWidth: '300px', margin: '0 auto 32px' }}>You haven't joined any communities yet. The network is waiting for you.</p>
                                <button className="btn btn-primary" style={{ padding: '12px 32px' }} onClick={() => { play(); navigate('/yap/community'); }}>
                                    Discover Communities
                                </button>
                            </div>
                        )}
                    </div>
                </div>
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

export default MyGroupsPage;
