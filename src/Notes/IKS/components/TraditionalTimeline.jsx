import React from 'react';
import { motion } from 'framer-motion';

const TraditionalTimeline = ({ items }) => {
  return (
    <section className="iks-timeline">
      {items.map((item, index) => (
        <motion.div 
          key={index}
          className="iks-timeline-item"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="iks-timeline-dot" />
          <div className="iks-mono" style={{ color: 'var(--iks-saffron)', fontSize: '0.75rem', fontWeight: 600 }}>{item.date}</div>
          <h4 className="iks-display" style={{ fontSize: '1.4rem', margin: '5px 0' }}>{item.title}</h4>
          <p style={{ fontSize: '0.95rem', color: 'var(--iks-ink-light)' }}>{item.desc}</p>
        </motion.div>
      ))}
    </section>
  );
};

export default TraditionalTimeline;
