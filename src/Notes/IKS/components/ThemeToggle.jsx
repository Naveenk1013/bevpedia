import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('iks-theme') === 'dark';
  });

  useEffect(() => {
    const realm = document.querySelector('.iks-realm');
    if (realm) {
      if (isDark) {
        realm.classList.add('iks-dark');
      } else {
        realm.classList.remove('iks-dark');
      }
    }
    localStorage.setItem('iks-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <motion.button
      className="iks-theme-toggle"
      onClick={() => setIsDark(!isDark)}
      whileTap={{ scale: 0.9 }}
      title={isDark ? 'Switch to Parchment (Light)' : 'Switch to Night Scholar (Dark)'}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex' }}
          >
            <Sun size={16} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex' }}
          >
            <Moon size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
