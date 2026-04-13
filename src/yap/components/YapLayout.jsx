import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, Globe, Users, GraduationCap, LogOut, User, Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../utils/soundEngine';
import { supabase } from '../../lib/supabaseClient';
import '../../styles/yap.css';

// Map routes to page titles
const PAGE_TITLES = {
    '/yap/community': 'Discovery',
    '/yap/my-groups': 'My Groups',
    '/yap/sessions': 'Study Rooms',
    '/yap/messages': 'Messages',
    '/yap/profile': 'Profile',
};

const YapLayout = ({ children, user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { play: playTick } = useSound('ui/click_1');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Lock body scroll for YAP route
    useEffect(() => {
        document.body.classList.add('yap-active');
        return () => {
            document.body.classList.remove('yap-active');
        };
    }, []);

    // Close drawer on route change
    useEffect(() => {
        setIsDrawerOpen(false);
    }, [location.pathname]);

    // Derive current page title (supports dynamic chat routes)
    const getPageTitle = () => {
        if (location.pathname.startsWith('/yap/chat/')) return 'Chat';
        if (location.pathname.startsWith('/yap/messages/')) return 'Messages';
        if (location.pathname.startsWith('/yap/user/')) return 'Profile';
        return PAGE_TITLES[location.pathname] || 'YAP';
    };

    const navItems = [
        { path: '/yap/community', icon: Globe, label: 'Discovery' },
        { path: '/yap/my-groups', icon: Users, label: 'My Groups' },
        { path: '/yap/sessions', icon: GraduationCap, label: 'Study Rooms' },
        { path: '/yap/messages', icon: MessageSquare, label: 'Direct Messages' },
        { path: '/yap/profile', icon: User, label: 'Profile' },
    ];

    const handleSignOut = async () => {
        playTick();
        await supabase.auth.signOut();
        navigate('/yap/login');
    };

    return (
        <div className="yap-container">
            {/* ════ Desktop Sidebar Rail (unchanged) ════ */}
            <aside className="yap-sidebar">
                <div className="yap-sidebar-header" onClick={() => window.location.href = 'https://bevpedia.in'}>
                    <div className="status-avatar-wrapper" style={{ width: 44, height: 44 }}>
                        <div className="status-avatar">
                            <MessageSquare size={20} color="var(--clr-accent)" />
                        </div>
                    </div>
                    <h2 className="yap-logo-text">BEVPEDIA</h2>
                </div>

                <nav className="yap-nav">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => playTick()}
                            className={({ isActive }) => isActive ? "yap-nav-item active" : "yap-nav-item"}
                        >
                            <item.icon className="icon" size={24} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}

                    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                        <button
                            className="yap-nav-item"
                            style={{ background: 'transparent', border: 'none', width: '100%', cursor: 'pointer' }}
                            onClick={handleSignOut}
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

            {/* ════ Mobile Header Bar ════ */}
            <div className="yap-mobile-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        className="btn-icon"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        aria-label="Toggle menu"
                    >
                        {isDrawerOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                    <h1 className="yap-mobile-header-title">{getPageTitle()}</h1>
                </div>
                <button
                    className="btn-icon"
                    onClick={() => window.location.href = 'https://bevpedia.in'}
                    aria-label="Go to Bevpedia"
                >
                    <Home size={20} />
                </button>
            </div>

            {/* ════ Mobile Drawer Overlay ════ */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        className="yap-drawer-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsDrawerOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* ════ Mobile Sidebar Drawer ════ */}
            <aside className={`yap-mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
                <div className="yap-drawer-brand">
                    <div className="drawer-logo">
                        <MessageSquare size={20} />
                    </div>
                    <h2>YAP</h2>
                </div>

                <nav className="yap-drawer-nav">
                    {navItems.map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => { playTick(); setIsDrawerOpen(false); }}
                            className={({ isActive }) => `yap-drawer-nav-item ${isActive ? 'active' : ''}`}
                        >
                            <item.icon className="icon" size={22} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}

                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                        <button className="yap-drawer-nav-item" onClick={handleSignOut}>
                            <LogOut className="icon" size={22} color="#666" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </nav>

                <div className="yap-drawer-footer">
                    {user ? (
                        <div className="yap-drawer-user">
                            <div className="avatar">{user.email[0].toUpperCase()}</div>
                            <div className="info">
                                <p className="name">{user.email.split('@')[0]}</p>
                                <p className="status">Active Now</p>
                            </div>
                        </div>
                    ) : (
                        <div className="yap-drawer-user" onClick={() => navigate('/yap/login')} style={{ cursor: 'pointer' }}>
                            <div className="avatar">?</div>
                            <div className="info"><p className="name">Sign In</p></div>
                        </div>
                    )}
                    <div className="yap-drawer-meta">
                        <span>Powered by Bevpedia.in</span>
                        <span>v2.1.0</span>
                    </div>
                </div>
            </aside>

            {/* ════ Main Content Area ════ */}
            <main className="yap-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default YapLayout;
