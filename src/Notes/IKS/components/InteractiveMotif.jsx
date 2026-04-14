import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const InteractiveMotif = () => {
  const { scrollYProgress } = useScroll();
  
  // Create a slow rotation based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.2, 0.2, 0.1]);

  return (
    <div className="iks-hero-mandala" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 0, width: '800px', height: '800px' }}>
      <motion.img
        src="https://res.cloudinary.com/dro6n6co1/image/upload/v1776179410/mandala_ypoowo.png"
        style={{
          rotate,
          scale,
          opacity,
          width: '100%',
          height: '100%',
          filter: 'sepia(0.5) contrast(1.2)'
        }}
        alt="Sacred Mandala Motif"
      />
    </div>
  );
};

export default InteractiveMotif;
