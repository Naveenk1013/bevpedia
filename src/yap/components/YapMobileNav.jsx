import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSound } from '../utils/soundEngine';
import { Globe, Users, GraduationCap, MessageSquare, User } from 'lucide-react';

const YapMobileNav = () => {
    const location = useLocation();
    const { play: playTick } = useSound('ui/click_1');
    
    const navItems = [
        { path: '/yap/community', icon: Globe, label: 'Community' },
        { path: '/yap/my-groups', icon: Users, label: 'Groups' },
        { path: '/yap/sessions', icon: GraduationCap, label: 'Study' },
        { path: '/yap/messages', icon: MessageSquare, label: 'Direct' },
        { path: '/yap/profile', icon: User, label: 'Profile' }
    ];

    return (
        <nav className="yap-mobile-nav" style={{ 
            overflow: 'hidden', 
            height: 'calc(64px + env(safe-area-inset-bottom))',
            paddingBottom: 'env(safe-area-inset-bottom)',
            background: 'rgba(10, 10, 10, 0.75)',
            backdropFilter: 'blur(30px) saturate(180%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <NavLink 
                        key={item.path} 
                        to={item.path} 
                        className="yap-nav-item"
                        onClick={() => playTick()}
                        style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                    >
                        {isActive && (
                            <motion.div 
                                layoutId="nav-pill"
                                className="nav-active-indicator"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    width: '40px',
                                    height: '4px',
                                    background: 'var(--clr-accent)',
                                    borderRadius: '2px',
                                    zIndex: 0,
                                    boxShadow: '0 0 10px rgba(201, 150, 58, 0.4)'
                                }}
                            />
                        )}
                        <motion.div
                            animate={{ 
                                scale: isActive ? 1.1 : 1,
                                color: isActive ? 'var(--clr-accent)' : '#666'
                            }}
                            style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
                        >
                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span style={{ fontSize: '0.6rem', fontWeight: isActive ? '700' : '500', opacity: isActive ? 1 : 0.6 }}>{item.label}</span>
                        </motion.div>
                    </NavLink>
                );
            })}
        </nav>
    );

};

export default YapMobileNav;
