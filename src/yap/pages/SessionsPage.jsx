import React, { useState, useEffect } from 'react';
import { Calendar, UserPlus, Clock, GraduationCap } from 'lucide-react';
import YapLayout from '../components/YapLayout';
import { yapService } from '../services/yapService';

const SessionsPage = ({ user }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const data = await yapService.getSessions();
                setSessions(data);
            } catch (err) {
                console.error("Failed to fetch sessions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    const handleJoinSession = async (sessionId) => {
        if (!user) return;
        try {
            await yapService.joinSession(sessionId, user.id);
            alert("Success! You've joined the session.");
            // Refresh counts or show status
        } catch (err) {
            console.error("Join session failed:", err);
        }
    };

    return (
        <YapLayout user={user}>
            <header className="community-header">
                <h1 className="community-title">Active Study Rooms</h1>
                <p className="community-subtitle">Collaborative learning sessions for hospitality elite.</p>
            </header>

            <div className="groups-grid">
                {loading ? (
                    <div className="text-muted">Scanning active rooms...</div>
                ) : sessions.length > 0 ? (
                    sessions.map(session => (
                        <div key={session.id} className="yap-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 className="yap-card-title">{session.title}</h3>
                                <div className="status-avatar-wrapper" style={{ width: 40, height: 40, padding: 2, background: 'var(--clr-accent)' }}>
                                    <div className="status-avatar"><GraduationCap size={18} color="#000" /></div>
                                </div>
                            </div>
                            <p className="text-muted" style={{ fontSize: '0.9rem', flex: 1 }}>{session.description}</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' }}>
                                <div className="flex items-center gap-2 text-muted" style={{ fontSize: '0.8rem' }}>
                                    <Calendar size={14} />
                                    <span>{new Date(session.start_time).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted" style={{ fontSize: '0.8rem' }}>
                                    <Clock size={14} />
                                    <span>{new Date(session.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                            </div>

                            <button 
                                className="btn btn-primary" 
                                style={{ width: '100%', borderRadius: '12px' }}
                                onClick={() => handleJoinSession(session.id)}
                            >
                                Join Room
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-muted" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px' }}>
                        <Calendar size={48} style={{ opacity: 0.1, marginBottom: '20px' }} />
                        <p>No upcoming study rooms found.<br/>Check back later or schedule one yourself.</p>
                    </div>
                )}
            </div>
        </YapLayout>
    );
};

export default SessionsPage;
