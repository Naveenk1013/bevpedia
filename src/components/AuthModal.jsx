import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Registration successful! You can now log in.');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay" 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 50, scale: 0.9 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 50, scale: 0.9 }}
          className="auth-card detail-card"
          style={{
            background: 'var(--clr-bg-alt)', padding: '2rem', borderRadius: '16px',
            width: '90%', maxWidth: '400px', border: '1px solid var(--clr-border)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--clr-accent)', margin: 0 }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--clr-text)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
          </div>

          {message && (
            <div style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', background: message.includes('Error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)', color: message.includes('Error') ? '#ff4d4f' : '#30c88a', fontSize: '0.9rem' }}>
              {message}
            </div>
          )}

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--clr-text-muted)' }}>Email</label>
              <input 
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--clr-border)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--clr-text-muted)' }}>Password</label>
              <input 
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--clr-border)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }}
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <button type="submit" disabled={loading} className="btn" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', background: 'var(--clr-accent)', color: 'black', fontWeight: 'bold' }}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span style={{ color: 'var(--clr-accent)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
