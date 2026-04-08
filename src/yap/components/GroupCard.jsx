import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Lock } from 'lucide-react';
import { yapService } from '../services/yapService';

const GroupCard = ({ group, onJoin }) => {
    const navigate = useNavigate();
    const [showPinEntry, setShowPinEntry] = React.useState(false);
    const [pin, setPin] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const isFull = (group.member_count || 0) >= (group.max_members || 100);

    const handleJoinClick = () => {
        if (isFull) return;
        if (group.pin && !showPinEntry) {
            setShowPinEntry(true);
            return;
        }
        onJoin(group.id);
    };

    const handlePinSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const isValid = await yapService.verifyLoungePin(group.id, pin);
            if (isValid) {
                onJoin(group.id, pin);
            } else {
                alert("Incorrect PIN. Access denied.");
                setPin('');
            }
        } catch (err) {
            alert("Verification failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="yap-card" style={{ height: showPinEntry ? 'auto' : '200px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 className="yap-card-title">{group.name}</h3>
                    {group.pin && <Lock size={14} color="var(--clr-accent)" style={{ opacity: 0.6 }} />}
                </div>
                <p className="yap-card-desc" style={{ display: showPinEntry ? 'none' : 'block' }}>{group.description}</p>
            </div>

            {showPinEntry ? (
                <form onSubmit={handlePinSubmit} style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }} className="animate-fade-in">
                    <p style={{ fontSize: '0.75rem', color: 'var(--clr-accent)', textAlign: 'center' }}>Secure Chapter: Enter PIN</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                            type="text" 
                            className="chat-input" 
                            placeholder="****"
                            style={{ textAlign: 'center', letterSpacing: '4px', background: 'rgba(255,255,255,0.05)', flex: 1 }}
                            value={pin}
                            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            autoFocus
                        />
                        <button type="button" className="btn-icon" onClick={() => setShowPinEntry(false)}>×</button>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify & Enter'}
                    </button>
                </form>
            ) : (
                <div className="yap-card-footer">
                    <div className={`member-count ${isFull ? 'text-danger' : ''}`} title="Network Capacity">
                        <Users size={16} />
                        <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                            {group.member_count || 0} / {group.max_members || 100} members
                        </span>
                    </div>
                    <button 
                        className={`btn ${isFull ? 'btn-outline' : 'btn-primary'}`}
                        onClick={handleJoinClick}
                        disabled={isFull}
                        style={{ opacity: isFull ? 0.6 : 1, cursor: isFull ? 'not-allowed' : 'pointer' }}
                    >
                        {isFull ? 'Network Full' : (group.pin ? 'Enter Securely' : 'Join Group')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default GroupCard;
