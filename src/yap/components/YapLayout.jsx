import { NavLink, useNavigate } from 'react-router-dom';
import { MessageSquare, Globe, Users, GraduationCap, LogOut, User } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import YapMobileNav from './YapMobileNav';
import '../../styles/yap.css';

const YapLayout = ({ children, user }) => {
    const navigate = useNavigate();

    return (
        <div className="yap-container">
            {/* Main Sidebar (Desktop Rail) */}
            <aside className="yap-sidebar">
                <div className="yap-sidebar-header" onClick={() => navigate('/yap/community')}>
                    <div className="status-avatar-wrapper" style={{ width: 44, height: 44 }}>
                        <div className="status-avatar">
                            <MessageSquare size={20} color="var(--clr-accent)" />
                        </div>
                    </div>
                    <h2 className="yap-logo-text">BEVPEDIA</h2>
                </div>
                
                <nav className="yap-nav">
                    <NavLink to="/yap/community" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                        <Globe className="icon" size={24} />
                        <span>Discovery</span>
                    </NavLink>
                    <NavLink to="/yap/my-groups" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                        <Users className="icon" size={24} />
                        <span>My Groups</span>
                    </NavLink>
                    <NavLink to="/yap/sessions" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                        <GraduationCap className="icon" size={24} />
                        <span>Study Rooms</span>
                    </NavLink>
                    <NavLink to="/yap/messages" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                        <MessageSquare className="icon" size={24} />
                        <span>Direct</span>
                    </NavLink>
                    <NavLink to="/yap/profile" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                        <User className="icon" size={24} />
                        <span>Profile</span>
                    </NavLink>
                    
                    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                        <button 
                            className="yap-nav-item" 
                            style={{ background: 'transparent', border: 'none', width: '100%', cursor: 'pointer' }}
                            onClick={async () => {
                                await supabase.auth.signOut();
                                navigate('/yap/login');
                            }}
                        >
                            <LogOut className="icon" size={24} color="#666" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </nav>

                <div className="yap-sidebar-footer">
                    {user ? (
                        <div className="yap-user-brief">
                            <div className="avatar">{user.email[0].toUpperCase()}</div>
                            <div className="info">
                                <p className="name" style={{ color: '#fff' }}>{user.email.split('@')[0]}</p>
                                <p className="status">Active Now</p>
                            </div>
                        </div>
                    ) : (
                        <div className="yap-user-brief" onClick={() => navigate('/yap/login')}>
                             <LogOut size={20} color="#666" />
                             <div className="info"><p className="name">Sign In</p></div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="yap-content">
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <YapMobileNav />
        </div>
    );
};

export default YapLayout;
