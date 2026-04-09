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
        <nav className="yap-mobile-nav" style={{ overflow: 'hidden' }}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <NavLink 
                        key={item.path} 
                        to={item.path} 
                        className="yap-nav-item"
                        onClick={() => playTick()}
                        style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {isActive && (
                            <motion.div 
                                layoutId="nav-pill"
                                className="nav-active-bubble"
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                style={{
                                    position: 'absolute',
                                    width: '45px',
                                    height: '45px',
                                    background: 'var(--clr-accent)',
                                    borderRadius: '16px',
                                    zIndex: 0,
                                    opacity: 0.15
                                }}
                            />
                        )}
                        <motion.div
                            animate={{ 
                                scale: isActive ? 1.2 : 1,
                                color: isActive ? 'var(--clr-accent)' : '#888'
                            }}
                            style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                        </motion.div>
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default YapMobileNav;
