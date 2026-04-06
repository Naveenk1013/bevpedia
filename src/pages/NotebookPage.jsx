import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExportNotebook from '../Notebook/ExportNotebook';
import SEO from '../components/SEO';
import '../styles/Notebook.css';

export default function NotebookPage() {
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToastMsg({ msg, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="nb-page nb-scrollbar overflow-x-hidden">
      <SEO 
        title="Scholar Notebook" 
        description="Architect and export your academic research, reports, and hospitality projects with our professional Scholar Notebook tool. Designed for hotel management students and researchers."
      />
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-100 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md border ${
              toastMsg.type === 'error' 
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' 
                : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
            }`}
          >
            <p className="text-sm font-semibold flex items-center gap-2">
              {toastMsg.type === 'error' ? '⚠️' : '✓'} {toastMsg.msg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="nb-container">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="nb-glass-card overflow-hidden"
        >
          <ExportNotebook toast={showToast} />
        </motion.div>
      </div>
    </div>
  );
}
