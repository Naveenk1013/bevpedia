import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Users, GraduationCap, MessageSquare, Coffee, Wine, GlassWater, Hotel } from 'lucide-react';
import YapLayout from '../components/YapLayout';
import GroupCard from '../components/GroupCard';
import CreateGroupModal from '../components/CreateGroupModal';
import { yapService } from '../services/yapService';

const CommunityPage = ({ user }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await yapService.getPublicGroups();
                setGroups(data);
            } catch (err) {
                console.error("Failed to fetch groups:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, []);

    const handleJoin = async (groupId) => {
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

    return (
        <YapLayout user={user}>
            {/* Active Groups / Stories Bar */}
            <div className="status-bar">
                <div className="status-item">
                    <div className="status-avatar-wrapper">
                        <div className="status-avatar"><Wine size={24} color="#fff" /></div>
                    </div>
                    <span className="status-name">Mixology</span>
                </div>
                <div className="status-item">
                    <div className="status-avatar-wrapper" style={{ background: '#7c5cfc' }}>
                        <div className="status-avatar"><Coffee size={24} color="#fff" /></div>
                    </div>
                    <span className="status-name">Baristi</span>
                </div>
                <div className="status-item">
                    <div className="status-avatar-wrapper" style={{ background: '#30c88a' }}>
                        <div className="status-avatar"><GlassWater size={24} color="#fff" /></div>
                    </div>
                    <span className="status-name">Sommelier</span>
                </div>
                <div className="status-item">
                    <div className="status-avatar-wrapper" style={{ background: '#e05c5c' }}>
                        <div className="status-avatar"><Hotel size={24} color="#fff" /></div>
                    </div>
                    <span className="status-name">Front Office</span>
                </div>
            </div>

            <header className="community-header">
                <h1 className="community-title">Discover Communities</h1>
                <p className="community-subtitle">The official Bevpedia network for hospitality elite.</p>
            </header>

            <div className="groups-grid">
                {loading ? (
                    <div className="text-muted">Analyzing networks...</div>
                ) : groups.length > 0 ? (
                    groups.map(group => (
                        <GroupCard 
                            key={group.id} 
                            group={group} 
                            onJoin={handleJoin} 
                        />
                    ))
                ) : (
                    <div className="text-muted" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                        <p>No active chapters found. Start a new legacy.</p>
                        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setShowCreateModal(true)}>
                            Create Group
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
