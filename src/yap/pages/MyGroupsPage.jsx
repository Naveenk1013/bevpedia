import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Plus } from 'lucide-react';
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
            <header className="community-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="community-title">My Communities</h1>
                        <p className="community-subtitle">Your active hospitality networks.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn outline flex items-center gap-2" onClick={() => { play(); setShowCreateModal(true); }}>
                            <Plus size={18} /> Create
                        </button>
                        <button className="btn btn-primary flex items-center gap-2" onClick={() => { play(); navigate('/yap/community'); }}>
                            <Plus size={18} /> Join New
                        </button>
                    </div>
                </div>
            </header>

            <div className="groups-grid">
                {loading ? (
                    <div className="text-muted">Loading your chapters...</div>
                ) : groups.length > 0 ? (
                    groups.map(group => (
                        <GroupCard 
                            key={group.id} 
                            group={group} 
                            onJoin={() => handleJoin(group.id)} 
                            isJoined={true}
                        />
                    ))
                ) : (
                    <div className="text-muted" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px' }}>
                        <Users size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                        <p>You haven't joined any communities yet.</p>
                        <button className="btn outline" style={{ marginTop: '20px' }} onClick={() => { play(); navigate('/yap/community'); }}>
                            Discover Communities
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

export default MyGroupsPage;
