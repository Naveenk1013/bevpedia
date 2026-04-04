import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../styles/sathi.css';
import { motion, AnimatePresence } from 'framer-motion';
import ShinyText from '../components/ShinyText';
import { Menu, X, Plus, LogOut, Send, Trash2, Home } from 'lucide-react';
import SathiBody from '../components/SathiBody';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../lib/supabaseClient';

export default function SathiPage({ user, onLoginClick, onLogout }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  // New states for UI and AI
  const [aiState, setAiState] = useState('idle'); // 'idle' | 'thinking' | 'speaking'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  // Lock body scroll on mount
  useEffect(() => {
    document.body.classList.add('sathi-lock');
    return () => {
      document.body.classList.remove('sathi-lock');
    };
  }, []);

  const fetchConversations = async () => {
    const { data } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });
    if (data) setConversations(data);
  };

  const loadConversation = async (id) => {
    setConversationId(id);
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });
    
    if (data) {
      setMessages(data.map(m => JSON.parse(m.content)));
    }
    setIsSidebarOpen(false); // Close sidebar on selection
  };

  const createNewChat = () => {
    setConversationId(null);
    setMessages([]);
    setIsSidebarOpen(false); // Close sidebar for fresh chat
  };

  const handleDeleteConversation = async (e, id) => {
    e.stopPropagation(); // Avoid selecting the chat while deleting it
    if (!window.confirm("Are you sure you want to delete this conversation?")) return;

    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setConversations(prev => prev.filter(c => c.id !== id));
      if (conversationId === id) {
        setConversationId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete the conversation.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageObj = { role: 'user', content: input };
    const currentMessages = [...messages, userMessageObj];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);
    setAiState('thinking');

    let activeConvId = conversationId;

    try {
      setAiState('speaking');
      if (!activeConvId) {
        const { data: newConv } = await supabase
          .from('conversations')
          .insert([{ user_id: user.id, title: input.substring(0, 30) + '...' }])
          .select()
          .single();
        if (newConv) {
          activeConvId = newConv.id;
          setConversationId(activeConvId);
          setConversations(prev => [newConv, ...prev]);
        }
      }

      if (activeConvId) {
        await supabase.from('messages').insert([{
          conversation_id: activeConvId,
          role: 'user',
          content: JSON.stringify(userMessageObj)
        }]);
      }

      const response = await fetch('/api/sathi-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || "API Error");
      }

      setAiState('speaking');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      setMessages(prev => [...prev, { role: 'assistant', content: '', reasoning: '' }]);

      let finalAssistantMessage = { role: 'assistant', content: '', reasoning: '' };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunkStr = decoder.decode(value, { stream: true });
        const lines = chunkStr.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            const dataStr = line.slice(6);
            if (dataStr.trim()) {
               try {
                 const data = JSON.parse(dataStr);
                 setMessages(prev => {
                   const newMsgs = [...prev];
                   const lastMsg = { ...newMsgs[newMsgs.length - 1] };
                   if (data.type === 'reasoning') {
                     lastMsg.reasoning = (lastMsg.reasoning || '') + data.content;
                     finalAssistantMessage.reasoning = lastMsg.reasoning;
                   } else if (data.type === 'content') {
                     lastMsg.content += data.content;
                     finalAssistantMessage.content = lastMsg.content;
                   }
                   newMsgs[newMsgs.length - 1] = lastMsg;
                   return newMsgs;
                 });
               } catch (e) {
                 console.error("Parse error", e, dataStr);
               }
            }
          }
        }
      }

      if (activeConvId) {
        await supabase.from('messages').insert([{
          conversation_id: activeConvId,
          role: 'assistant',
          content: JSON.stringify(finalAssistantMessage)
        }]);
      }

    } catch (error) {
      console.error("SATHI API ERROR:", error);
      const errorMessage = { 
        role: 'assistant', 
        content: `**Service Unreachable:** I'm having trouble connecting to my knowledge core (NVIDIA NIMs). Please check your internet connection or try again in a moment. \n\n*Technical hint: Check if your API key is valid.*` 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setAiState('idle');
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ padding: '8rem 1rem 4rem', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--clr-accent)', marginBottom: '1rem' }}>SATHI AI requires Authentication</h1>
        <p className="text-muted" style={{ maxWidth: '500px', marginBottom: '2rem' }}>To provide a continuous learning experience and remember your previous complex queries, SATHI requires an account.</p>
        <button onClick={onLoginClick} className="btn" style={{ padding: '1rem 3rem', fontSize: '1.2rem', background: 'var(--clr-accent)', color: 'black', borderRadius: '30px' }}>Sign In to Chat</button>
      </div>
    );
  }

  return (
    <div className="sathi-page">
      
      {/* Unified Header Bar (All Devices) */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/60 backdrop-blur-md" style={{ zIndex: 10 }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="sathi-icon-btn">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button onClick={() => navigate('/')} className="sathi-icon-btn hidden md:flex" title="Go Home">
             <Home size={22} />
          </button>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--clr-accent)', margin: 0, fontSize: '1.2rem', marginLeft: '0.5rem' }}>SATHI</h2>
        </div>
        <div className="hidden md:block text-muted" style={{ fontSize: '0.85rem', opacity: 0.7 }}>Smart Assistant for Tourism & Hospitality Innovation</div>
        <div className="flex md:hidden">
           
        </div>
      </div>

      <div className="sathi-main-layout">
        
        {/* Sidebar Overlay (All Devices when open) */}
        <AnimatePresence>
            {isSidebarOpen && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
                />
            )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`chat-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ 
          display: 'flex', flexDirection: 'column', background: 'rgba(10,12,15,0.98)', 
          borderRight: '1px solid var(--clr-border-muted)', height: '100%'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--clr-border-muted)' }}>
            <button onClick={createNewChat} className="btn flex items-center justify-center gap-2" style={{ width: '100%', padding: '0.8rem', fontWeight: 'bold', borderRadius: '12px' }}>
               <Plus size={18} /> New Chat
            </button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--clr-accent)', textTransform: 'uppercase', marginBottom: '1.2rem', letterSpacing: '2px', fontWeight: 'bold', opacity: 0.6 }}>History</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {conversations.map(conv => (
                <div 
                  key={conv.id} 
                  onClick={() => loadConversation(conv.id)}
                  className={`chat-history-item ${conversationId === conv.id ? 'active' : ''}`}
                >
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem' }}>{conv.title}</span>
                  <button onClick={(e) => handleDeleteConversation(e, conv.id)} className="delete-btn">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {conversations.length === 0 && <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)', textAlign: 'center', marginTop: '2rem', opacity: 0.5 }}>No recent chats.</p>}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="sidebar-footer" style={{ padding: '1.2rem', borderTop: '1px solid var(--clr-border-muted)', background: 'rgba(0,0,0,0.2)' }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                   <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email?.split('@')[0]}</span>
                   <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Hospitality Expert</span>
                </div>
                <button onClick={onLogout} className="sathi-icon-btn" style={{ color: 'var(--clr-accent)', opacity: 0.8 }} title="Logout">
                  <LogOut size={18} />
                </button>
             </div>
             
             <div style={{ pt: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.8rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'rgba(240,161,19,0.5)', margin: 0, fontWeight: '500', letterSpacing: '0.5px' }}>Developed by Naveen Kumar</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem' }}>
                   <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)' }}>Powered by NVIDIA NIMs</span>
                   <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)' }}>v2.0.4</span>
                </div>
             </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        {/* Main Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', position: 'relative' }}>
          
          <div className="chat-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', background: 'transparent', overflow: 'hidden' }}>
            
            {/* 1. Sathi Body (Bottom Layer) */}
            <div style={{ 
               position: 'absolute',
               inset: 0,
               zIndex: 0,
               pointerEvents: 'none',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               opacity: 1
            }}>
                <SathiBody aiState={aiState} />
            </div>

            {/* 2. Simplified Glass Overlay (Now correctly allows clicks through) */}
            <div className="glass-overlay" style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'none', pointerEvents: 'none' }} />

            {/* 3. Messages (Top Layer - Scrollable) */}
            <div 
              id="sathi-message-scroll"
              style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '1.5rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1.5rem',
                position: 'relative', 
                zIndex: 2,
                minHeight: 0,
                overscrollBehavior: 'contain'
              }}
            >
              {messages.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ textAlign: 'center', color: 'var(--clr-text-muted)', margin: 'auto', maxWidth: '500px' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.9)' }}>How can I help you today?</p>
                  <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <span className="btn outline" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', background: 'rgba(240,161,19,0.1)', border: '1px solid rgba(240,161,19,0.3)', color: 'var(--clr-accent)' }} onClick={() => setInput("Can you generate a standard SOP for hotel morning check-outs?")}>Suggest an SOP</span>
                    <span className="btn outline" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', background: 'rgba(240,161,19,0.1)', border: '1px solid rgba(240,161,19,0.3)', color: 'var(--clr-accent)' }} onClick={() => setInput("What is the Angel's Share in whisky production?")}>Define Angel's Share</span>
                  </div>
                </motion.div>
              )}
              
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={m.role === 'user' ? 'self-end' : 'self-start'}
                  style={{ 
                    maxWidth: '85%',
                    background: m.role === 'user' ? 'var(--clr-accent)' : 'rgba(255,255,255,0.08)',
                    color: m.role === 'user' ? '#000' : 'rgba(255,255,255,0.95)',
                    padding: '1.2rem 1.8rem',
                    borderRadius: '1.5rem',
                    borderBottomRightRadius: m.role === 'user' ? '4px' : '1.5rem',
                    borderBottomLeftRadius: m.role === 'assistant' ? '4px' : '1.5rem',
                    border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    backdropFilter: m.role === 'assistant' ? 'blur(12px)' : 'none',
                    boxShadow: m.role === 'user' ? '0 8px 32px rgba(240,161,19,0.3)' : 'none'
                  }}
                >
                  {m.reasoning && (
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', borderLeft: '3px solid var(--clr-accent)', paddingLeft: '1.2rem', marginBottom: '1.2rem', fontStyle: 'italic' }}>
                      <div style={{ marginBottom: '0.4rem' }}>
                          <ShinyText text="SATHI is analyzing..." speed={1.5} color="var(--clr-accent)" shineColor="white" />
                      </div>
                      {m.reasoning}
                    </div>
                  )}
                  <div className="markdown-body" style={{ color: 'inherit', fontSize: '1rem', lineHeight: '1.8' }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {m.content?.replace(/<br\s*\/?>/gi, '\n')}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                 <div style={{ alignSelf: 'flex-start', padding: '1rem' }}>
                    <ShinyText text="SATHI is generating response..." speed={1.5} color="var(--clr-accent)" shineColor="white" />
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 4. Input Area (Fixed/Pinned Bottom) */}
            <form onSubmit={handleSubmit} style={{ 
                padding: '1.5rem', 
                display: 'flex', 
                gap: '0.8rem', 
                flexShrink: 0, 
                background: 'rgba(0,0,0,0.85)', 
                backdropFilter: 'blur(20px)', 
                borderTop: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                zIndex: 3
            }}>
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Ask SATHI a question..." 
                  style={{ flex: 1, padding: '1.2rem 1.8rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', minWidth: 0, fontSize: '1.1rem' }}
                />
                <button type="submit" disabled={isLoading} className="btn flex items-center justify-center" style={{ width: '60px', height: '60px', borderRadius: '50%', padding: 0, flexShrink: 0, background: 'var(--clr-accent)' }}>
                  <Send size={24} color="#000" />
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
