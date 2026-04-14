import React from 'react';
import { motion } from 'framer-motion';

const VedicHero = ({ title, eyebrow, tagline }) => {
  return (
    <header className="iks-hero">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="iks-container"
      >
        <span className="iks-label iks-mono" style={{ marginBottom: '1.5rem' }}>{eyebrow}</span>
        
        <motion.h1 
          className="iks-display"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {title.split(' ').map((word, i) => (
            <span key={i} style={{ display: 'inline-block', margin: '0 8px' }}>
              {word === 'Indian' ? <span style={{ color: 'var(--iks-saffron)' }}>{word}</span> : word}
            </span>
          ))}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1, duration: 2 }}
          className="iks-divider"
        >
          ✦ ✦ ✦
        </motion.div>

        <motion.p 
          style={{ fontSize: '1.2rem', color: 'var(--iks-ink-light)', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {tagline}
        </motion.p>
      </motion.div>
    </header>
  );
};

export default VedicHero;
