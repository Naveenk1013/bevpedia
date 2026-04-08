import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Globe, Users, GraduationCap, MessageSquare, User } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const YapMobileNav = () => {
    return (
        <nav className="yap-mobile-nav">
            <NavLink to="/yap/community" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                <Globe size={24} />
            </NavLink>
            <NavLink to="/yap/my-groups" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                <Users size={24} />
            </NavLink>
            <NavLink to="/yap/sessions" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                <GraduationCap size={24} />
            </NavLink>
            <NavLink to="/yap/messages" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                <MessageSquare size={24} />
            </NavLink>
            <NavLink to="/yap/profile" className={({isActive}) => isActive ? "yap-nav-item active" : "yap-nav-item"}>
                <User size={24} />
            </NavLink>
        </nav>
    );
};

export default YapMobileNav;
