import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';

const StoryExhibit = ({ block }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 550; // Approximating card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="iks-exhibit-container">
      <div className="iks-container" style={{ paddingBottom: '3rem', paddingTop: 0 }}>
         <h3 className="iks-display" style={{ color: 'var(--iks-maroon)', fontSize: '2.8rem', marginBottom: '0.5rem' }}>{block.title}</h3>
         <p className="iks-mono" style={{ opacity: 0.6, marginBottom: '1.5rem' }}>{block.meta}</p>
         <div style={{ maxWidth: '750px', borderLeft: '4px solid var(--iks-gold)', paddingLeft: '24px', margin: '2rem 0' }}>
            <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--iks-ink-light)', lineHeight: 1.75 }}>{block.essence}</p>
         </div>
      </div>
      
      <div style={{ position: 'relative' }}>
        {/* Navigation Arrows for PC */}
        <button 
          onClick={() => scroll('left')}
          className="iks-exhibit-nav-btn left"
          aria-label="Previous Chapter"
        >
          <ChevronLeft size={32} />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="iks-exhibit-nav-btn right"
          aria-label="Next Chapter"
        >
          <ChevronRight size={32} />
        </button>

        <div className="iks-exhibit-track" ref={scrollRef}>
          {block.events.map((e, i) => (
            <motion.div 
              key={i} 
              className="iks-exhibit-card"
              whileHover={{ y: -8, boxShadow: '0 25px 60px var(--iks-shadow)' }}
              style={{ 
                background: 'white',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                padding: 0
              }}
            >
              {/* Illustration Header */}
              {e.image ? (
                <div className="iks-exhibit-image-wrapper">
                  <img src={e.image} alt={e.label} className="iks-exhibit-image" />
                  <div className="iks-exhibit-image-overlay" />
                </div>
              ) : (
                <div className="iks-exhibit-image-placeholder">
                  <Award size={40} opacity={0.1} />
                </div>
              )}

              <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 'auto' }}>
                  <div className="iks-label" style={{ background: 'var(--iks-rust)', marginBottom: '1.2rem', fontSize: '0.7rem' }}>Chapter {i + 1}</div>
                  <h4 className="iks-display" style={{ fontSize: '1.7rem', color: 'var(--iks-rust)', marginBottom: '1rem', lineHeight: 1.2 }}>{e.label}</h4>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--iks-ink-light)' }}>{e.text}</p>
                </div>
                <div style={{ marginTop: '2rem', height: '1px', width: '40px', background: 'var(--iks-gold)', opacity: 0.5 }} />
              </div>
            </motion.div>
          ))}
          
          {/* Lessons Card */}
          <div className="iks-exhibit-card" style={{ background: 'var(--iks-maroon)', color: 'white', backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }}>
            <div className="iks-label" style={{ color: 'white', background: 'rgba(255,255,255,0.2)', marginBottom: '2rem' }}>Core Philosophical Lessons</div>
            <h4 className="iks-display" style={{ fontSize: '2rem', marginBottom: '2rem', lineHeight: 1.3 }}>Management & Ethical Principles</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {block.lessons.map((l, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                  <Award size={22} style={{ flexShrink: 0, color: 'var(--iks-gold)' }} />
                  <span style={{ fontSize: '1.1rem' }}><strong style={{ color: 'var(--iks-gold)' }}>{l.label}:</strong> {l.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="iks-container" style={{ paddingTop: '3rem', paddingBottom: 0, textAlign: 'center' }}>
         <p className="iks-mono" style={{ fontSize: '0.7rem', opacity: 0.4, letterSpacing: '4px' }}>← Navigate using Arrows or Swipe →</p>
      </div>
    </div>
  );
};

export default StoryExhibit;
