import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { motion } from 'framer-motion';
import ShinyText from '../components/ShinyText';

import { supabase } from '../lib/supabaseClient';

export default function SathiPage({ user, onLoginClick, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

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
  };

  const createNewChat = () => {
    setConversationId(null);
    setMessages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageObj = { role: 'user', content: input };
    const currentMessages = [...messages, userMessageObj];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    let activeConvId = conversationId;

    try {
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

      if (!response.ok) throw new Error("API Error");

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
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: '**Error:** Failed to connect to SATHI AI.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ padding: '8rem 1rem 4rem', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--clr-accent)', marginBottom: '1rem' }}>✨ SATHI AI requires Authentication</h1>
        <p className="text-muted" style={{ maxWidth: '500px', marginBottom: '2rem' }}>To provide a continuous learning experience and remember your previous complex queries, SATHI requires an account.</p>
        <button onClick={onLoginClick} className="btn" style={{ padding: '1rem 3rem', fontSize: '1.2rem', background: 'var(--clr-accent)', color: 'black', borderRadius: '30px' }}>Sign In to Chat</button>
      </div>
    );
  }

  return (
    <div className="sathi-page container" style={{ padding: '6rem 1rem 2rem', margin: '0 auto', height: '100vh', display: 'flex', gap: '2rem' }}>
      
      <aside className="chat-sidebar detail-card" style={{ width: '280px', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--clr-border)', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--clr-border)' }}>
          <button onClick={createNewChat} className="btn" style={{ width: '100%', background: 'var(--clr-accent)', color: 'black', fontWeight: 'bold' }}>+ New Chat</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Recent Chats</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {conversations.map(conv => (
              <div 
                key={conv.id} 
                onClick={() => loadConversation(conv.id)}
                style={{ 
                  padding: '0.8rem', cursor: 'pointer', borderRadius: '8px', 
                  background: conversationId === conv.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: conversationId === conv.id ? 'var(--clr-accent)' : 'var(--clr-text-muted)',
                  fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
                }}
              >
                {conv.title}
              </div>
            ))}
            {conversations.length === 0 && <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)' }}>No recent chats.</p>}
          </div>
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
           <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>{user.email}</span>
           <button onClick={onLogout} style={{ background: 'none', border: 'none', color: 'var(--clr-text)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>Sign Out</button>
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <header style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--clr-accent)', margin: 0, fontSize: '1.5rem' }}>
            ✨ SATHI
          </h2>
          <span className="text-muted" style={{ fontSize: '0.9rem' }}>| Smart Hospitality Assistant</span>
        </header>
        
        <div className="chat-container detail-card" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--clr-border)', borderRadius: '16px', background: 'rgba(0,0,0,0.2)' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--clr-text-muted)', margin: 'auto' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>How can I assist your hospitality journey today?</p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={() => setInput("Can you generate a standard SOP for hotel morning check-outs?")}>Suggest an SOP</span>
                <span className="btn" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={() => setInput("What is the Angel's Share in whisky production?")}>Define Angel's Share</span>
              </div>
            </div>
          )}
          
          {messages.map((m, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              style={{ 
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                background: m.role === 'user' ? 'var(--clr-accent)' : 'rgba(255,255,255,0.05)',
                color: m.role === 'user' ? 'black' : 'var(--clr-text)',
                padding: '1rem 1.5rem',
                borderRadius: '16px',
                borderBottomRightRadius: m.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: m.role === 'assistant' ? '4px' : '16px',
                maxWidth: '85%',
                border: m.role === 'assistant' ? '1px solid var(--clr-border)' : 'none'
              }}
            >
              {m.reasoning && (
                <div style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '1rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--clr-accent)' }}><ShinyText text="SATHI is thinking..." speed={1.5} color="var(--clr-accent)" shineColor="white" /></strong>
                  {m.reasoning}
                </div>
              )}
              <div className="markdown-body" style={{ color: 'inherit', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
             <div style={{ alignSelf: 'flex-start', padding: '1rem' }}>
               <ShinyText text="SATHI is generating response..." speed={1.5} color="var(--clr-text-muted)" shineColor="var(--clr-accent)" />
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask SATHI a question..." 
            style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '30px', border: '1px solid var(--clr-border)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none' }}
          />
          <button type="submit" disabled={isLoading} className="btn" style={{ padding: '1rem 2rem', borderRadius: '30px', background: 'var(--clr-accent)', color: 'black', fontWeight: 'bold', cursor: isLoading ? 'wait' : 'pointer' }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
