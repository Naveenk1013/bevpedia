import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

const GroupCard = ({ group, onJoin }) => {
    const navigate = useNavigate();

    const isFull = (group.member_count || 0) >= (group.max_members || 100);

    return (
        <div className="yap-card">
            <div>
                <h3 className="yap-card-title">{group.name}</h3>
                <p className="yap-card-desc">{group.description}</p>
            </div>
            <div className="yap-card-footer">
                <div className={`member-count ${isFull ? 'text-danger' : ''}`} title="Network Capacity">
                    <Users size={16} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                        {group.member_count || 0} / {group.max_members || 100} members
                    </span>
                </div>
                <button 
                    className={`btn ${isFull ? 'btn-outline' : 'btn-primary'}`}
                    onClick={() => !isFull && onJoin(group.id)}
                    disabled={isFull}
                    style={{ opacity: isFull ? 0.6 : 1, cursor: isFull ? 'not-allowed' : 'pointer' }}
                >
                    {isFull ? 'Network Full' : 'Join Group'}
                </button>
            </div>
        </div>
    );
};

export default GroupCard;
