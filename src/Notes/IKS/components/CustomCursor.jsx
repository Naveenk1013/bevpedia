import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e) => {
      if (e.target.closest('a, button, .iks-nav-item, .iks-q-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  // Don't render cursor on touch devices
  if (isTouchDevice) return null;

  return (
    <motion.div
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        position: 'fixed',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'difference'
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 2 : 1,
          rotate: isHovering ? 90 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid #fff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          style={{
            width: '60%',
            height: '60%',
            border: '1px dashed #fff',
            borderRadius: '50%'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
