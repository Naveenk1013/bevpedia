import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Lock, ArrowRight } from 'lucide-react';
import { yapService } from '../services/yapService';

const GroupCard = ({ group, onJoin, viewMode = 'card' }) => {
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

    /* ═══════ LIST VIEW — Compact single row ═══════ */
    if (viewMode === 'list') {
        return (
            <div className="yap-card yap-card-list" onClick={handleJoinClick}>
                <div className="list-card-left">
                    <div className="list-card-icon">
                        {group.name?.[0]?.toUpperCase() || 'G'}
                    </div>
                    <div className="list-card-info">
                        <h4 className="list-card-title">{group.name}</h4>
                        <span className="list-card-meta">
                            <Users size={12} />
                            {group.member_count || 0}/{group.max_members || 100}
                            {group.category && <> · {group.category}</>}
                        </span>
                    </div>
                </div>
                <div className="list-card-right">
                    {group.pin && <Lock size={14} color="var(--clr-accent)" />}
                    <button 
                        className={`btn ${isFull ? 'btn-outline' : 'btn-primary'}`}
                        disabled={isFull}
                        style={{ 
                            height: '32px', minWidth: '72px', borderRadius: '10px', fontSize: '0.75rem',
                            opacity: isFull ? 0.5 : 1, cursor: isFull ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isFull ? 'Full' : 'Join'}
                    </button>
                </div>
            </div>
        );
    }

    /* ═══════ GRID VIEW — Compact 2-column card ═══════ */
    if (viewMode === 'grid') {
        return (
            <div className="yap-card yap-card-grid" onClick={handleJoinClick}>
                <div className="grid-card-top">
                    <div className="grid-card-icon">
                        {group.name?.[0]?.toUpperCase() || 'G'}
                    </div>
                    {group.pin && (
                        <div style={{ background: 'rgba(201, 150, 58, 0.15)', padding: '4px', borderRadius: '8px' }}>
                            <Lock size={12} color="var(--clr-accent)" />
                        </div>
                    )}
                </div>
                <h4 className="grid-card-title">{group.name}</h4>
                <div className="grid-card-footer">
                    <span className="grid-card-meta">
                        <Users size={13} /> {group.member_count || 0}
                    </span>
                    <button 
                        className={`btn ${isFull ? 'btn-outline' : 'btn-primary'}`}
                        disabled={isFull}
                        style={{ 
                            height: '30px', minWidth: '60px', borderRadius: '10px', fontSize: '0.7rem',
                            opacity: isFull ? 0.5 : 1, cursor: isFull ? 'not-allowed' : 'pointer',
                            padding: '0 12px'
                        }}
                    >
                        {isFull ? 'Full' : 'Join'}
                    </button>
                </div>
            </div>
        );
    }

    /* ═══════ CARD VIEW — Default full card (original) ═══════ */
    return (
        <div className="yap-card" style={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 className="yap-card-title">{group.name}</h3>
                    {group.pin && (
                        <div style={{ background: 'rgba(201, 150, 58, 0.15)', padding: '6px', borderRadius: '10px' }}>
                            <Lock size={14} color="var(--clr-accent)" />
                        </div>
                    )}
                </div>
                {!showPinEntry && (
                    <p className="yap-card-desc" style={{ 
                        fontSize: '0.9rem', 
                        color: 'rgba(255,255,255,0.6)', 
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        margin: '0 0 20px 0'
                    }}>
                        {group.description}
                    </p>
                )}
            </div>

            {showPinEntry ? (
                <form onSubmit={handlePinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} className="animate-fade-in">
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--clr-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secure Chapter</p>
                        <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>Enter the 6-digit access code</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                            type="text" 
                            className="chat-input" 
                            placeholder="••••••"
                            style={{ 
                                textAlign: 'center', 
                                letterSpacing: '8px', 
                                background: 'rgba(255,255,255,0.05)', 
                                flex: 1,
                                height: '50px',
                                borderRadius: '14px',
                                fontSize: '1.2rem',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                            value={pin}
                            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            autoFocus
                        />
                        <button type="button" className="btn-icon" style={{ height: '50px', width: '50px', borderRadius: '14px' }} onClick={() => setShowPinEntry(false)}>×</button>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ height: '50px', width: '100%', borderRadius: '14px' }} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify & Enter'}
                    </button>
                </form>
            ) : (
                <div className="yap-card-footer" style={{ 
                    marginTop: 'auto', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '15px',
                    borderTop: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div className={`member-count ${isFull ? 'text-danger' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)' }}>
                        <Users size={16} />
                        <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                            {group.member_count || 0} <span style={{ opacity: 0.4 }}>/</span> {group.max_members || 100}
                        </span>
                    </div>
                    <button 
                        className={`btn ${isFull ? 'btn-outline' : 'btn-primary'}`}
                        onClick={handleJoinClick}
                        disabled={isFull}
                        style={{ 
                            height: '40px',
                            minWidth: '120px',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            opacity: isFull ? 0.6 : 1, 
                            cursor: isFull ? 'not-allowed' : 'pointer' 
                        }}
                    >
                        {isFull ? 'Network Full' : (group.pin ? 'Enter' : 'Join')}
                    </button>
                </div>
            )}
        </div>
    );

};

export default GroupCard;
