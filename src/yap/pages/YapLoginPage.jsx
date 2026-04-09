import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Globe, Lock, Mail, UserPlus, ChevronRight, User, Calendar, ShieldCheck, ShieldAlert, Info } from 'lucide-react';
import "../../styles/yap.css";

const YapLoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [isDeclared, setIsDeclared] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page user was trying to reach
    const from = location.state?.from?.pathname || "/yap/community";

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                navigate(from, { replace: true });
            } else {
                // Validation for signup
                if (!fullName.trim()) throw new Error("A legacy requires a name.");
                if (!age || parseInt(age) < 18) throw new Error("You must be 18+ to join this network.");
                if (!isDeclared) throw new Error("Please accept the legal declaration.");

                const { error } = await supabase.auth.signUp({ 
                    email, 
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            age: parseInt(age),
                            signup_declaration: true
                        }
                    }
                });
                if (error) throw error;
                alert('Success! You can now log in.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="yap-auth-page">
            <div className="yap-auth-overlay"></div>
            
            <div className="yap-auth-container">
                <div className="yap-auth-branding">
                    <div 
                        className="yap-auth-logo" 
                        onClick={() => window.location.href = 'https://bevpedia.in'}
                        style={{ cursor: 'pointer' }}
                    >
                        <Globe size={48} className="icon-glow" />
                    </div>
                    <h1 
                        className="yap-auth-title" 
                        onClick={() => window.location.href = 'https://bevpedia.in'}
                        style={{ cursor: 'pointer' }}
                    >
                        BEVPEDIA
                    </h1>
                    <p className="yap-auth-subtitle">Join the elite network of hospitality professionals.</p>
                </div>

                <div className="yap-auth-card glass-morphism">
                    <div className="auth-card-header">
                        <h2>{isLogin ? 'Welcome Back' : 'Join the Network'}</h2>
                        <p>{isLogin ? 'Enter your credentials to enter the hub.' : 'Create your legacy in the hospitality world.'}</p>
                    </div>

                    {error && <div className="auth-error-banner">{error}</div>}

                    <form onSubmit={handleAuth} className="yap-auth-form">
                        {!isLogin && (
                            <>
                                <div className="auth-input-group animate-fade-in">
                                    <label><User size={16} /> Full Name</label>
                                    <input 
                                        type="text" 
                                        value={fullName} 
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your real identity"
                                        required 
                                    />
                                </div>
                                <div className="auth-input-group animate-fade-in">
                                    <label><Calendar size={16} /> Age</label>
                                    <input 
                                        type="number" 
                                        value={age} 
                                        onChange={(e) => setAge(e.target.value)}
                                        placeholder="Min 18 required"
                                        required 
                                        min="18"
                                    />
                                </div>
                            </>
                        )}

                        <div className="auth-input-group">
                            <label><Mail size={16} /> Email Address</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@luxury-hotel.com"
                                required 
                            />
                        </div>

                        <div className="auth-input-group">
                            <label><Lock size={16} /> Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required 
                                minLength={6}
                            />
                        </div>

                        {!isLogin && (
                            <div className="auth-security-notice animate-fade-in">
                                <div className="notice-header">
                                    <ShieldCheck size={16} color="var(--clr-accent)" />
                                    <span>Sapience Security Protocol</span>
                                </div>
                                <p>We are a highly secured messaging platform. Your data is never shared. Once you <strong>Purge</strong> your account, all traces of your data are wiped forever from our network.</p>
                                
                                <label className="auth-checkbox-group">
                                    <input 
                                        type="checkbox" 
                                        checked={isDeclared} 
                                        onChange={(e) => setIsDeclared(e.target.checked)} 
                                    />
                                    <span className="checkbox-text">I am 18+ and legally allowed to use social media. I agree to be a responsible user of the network.</span>
                                </label>
                            </div>
                        )}

                        <button type="submit" className="yap-auth-btn" disabled={loading}>
                            {loading ? 'Authenticating...' : (isLogin ? 'Enter The Hub' : 'Register Now')}
                            <ChevronRight size={18} />
                        </button>
                    </form>

                    <div className="auth-card-footer">
                        <p>
                            {isLogin ? "New to the elite network?" : "Already a member?"}
                            <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle-btn">
                                {isLogin ? 'Create Account' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>

                <div className="yap-auth-footer-info">
                    <span>Private Network</span>
                    <span className="dot"></span>
                    <span>Encrypted Connection</span>
                    <span className="dot"></span>
                    <span>Hospitality Elite</span>
                </div>
            </div>
        </div>
    );
};

export default YapLoginPage;
