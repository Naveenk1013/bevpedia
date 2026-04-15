import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useInView, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Lightbulb, Quote, ChevronRight, Award, Layers, ArrowUp } from 'lucide-react';

import VedicHero from './components/VedicHero';
import TraditionalTimeline from './components/TraditionalTimeline';
import InteractiveMotif from './components/InteractiveMotif';
import CustomCursor from './components/CustomCursor';
import StoryExhibit from './components/StoryExhibit';
import LanguageSelector from './components/LanguageSelector';
import DownloadPDF from './components/DownloadPDF';
import ThemeToggle from './components/ThemeToggle';

import { iksModule1 } from '../data/iksData';
import '../../styles/iks.css';

/* ──────────────────────────────────────
   Micro-Interaction: Staggered Reveal
   ────────────────────────────────────── */
const RevealBlock = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

/* ──────────────────────────────────────
   Block Renderer — All Content Types
   ────────────────────────────────────── */
const BlockRenderer = ({ block }) => {
  switch (block.type) {
    case 'header':
      return (
        <RevealBlock>
          <div className="iks-header-row">
            <div className="iks-header-line" style={{ background: 'linear-gradient(to right, transparent, var(--iks-border))' }} />
            <h2 className="iks-display iks-section-title">{block.text}</h2>
            <div className="iks-header-line" style={{ background: 'linear-gradient(to left, transparent, var(--iks-border))' }} />
          </div>
        </RevealBlock>
      );
    
    case 'sub-header':
      return (
        <RevealBlock>
          <h4 className="iks-display iks-sub-header">{block.text}</h4>
        </RevealBlock>
      );
    
    case 'paragraph':
      return (
        <RevealBlock>
          <p className={block.isIntro ? "iks-unit-intro" : "iks-body-text"}>{block.text}</p>
        </RevealBlock>
      );
    
    case 'callout':
      return (
        <RevealBlock>
          <motion.div 
            className={`iks-callout-premium ${block.variant}`}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="iks-label">{block.label}</div>
            <p style={{ fontSize: '1.2rem', fontStyle: block.variant === 'quote' ? 'italic' : 'normal', fontWeight: 500, whiteSpace: 'pre-line' }}>{block.text}</p>
          </motion.div>
        </RevealBlock>
      );
    
    case 'table':
      return (
        <RevealBlock>
          <div className="iks-table-container" style={{ margin: '4rem 0' }}>
            <table className="iks-table">
              <thead>
                <tr>
                  {block.headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <motion.tr 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="iks-table-row"
                  >
                    {row.map((cell, ci) => (
                      <td key={ci} style={ci === 0 ? { fontWeight: 700, color: 'var(--iks-rust)' } : {}}>
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
        </RevealBlock>
      );
    
    case 'timeline':
      return (
        <RevealBlock>
          <TraditionalTimeline items={block.items} />
        </RevealBlock>
      );
    
    case 'list':
      return (
        <RevealBlock>
          <div style={{ margin: '2rem 0' }}>
            {block.items.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
                className="iks-list-item"
              >
                <div className="iks-list-dash" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </RevealBlock>
      );
    
    case 'grid':
      return (
        <div className="iks-philosophy-grid" style={{ margin: '4rem 0' }}>
          {block.items.map((item, i) => (
            <RevealBlock key={i} delay={i * 0.08}>
              <motion.div 
                className="iks-grid-card"
                whileHover={{ y: -8, boxShadow: '0 20px 40px var(--iks-shadow)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="iks-label" style={{ color: 'var(--iks-saffron)' }}>{item.title}</div>
                <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>{item.text}</p>
              </motion.div>
            </RevealBlock>
          ))}
        </div>
      );

    case 'story':
      return <StoryExhibit block={block} />;

    default:
      return null;
  }
};

/* ──────────────────────────────────────
   Reading Progress Indicator (Units)
   ────────────────────────────────────── */
const UnitProgress = ({ units }) => {
  return (
    <div className="iks-unit-progress">
      {units.map((u, i) => (
        <a key={u.id} href={`#unit-${u.id}`} className="iks-nav-dot" title={u.title}>
          <span className="iks-nav-dot-tooltip">{u.title}</span>
        </a>
      ))}
      <a href="#exam-section" className="iks-nav-dot iks-nav-dot-exam" title="Exam Prep">
        <span className="iks-nav-dot-tooltip">Exam Prep</span>
      </a>
    </div>
  );
};

/* ──────────────────────────────────────
   THE IKS MODULE VIEW
   ────────────────────────────────────── */
const IKSModuleView = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const data = iksModule1;
  const mainRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Show "Back to Top" after scrolling 5%
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setShowBackToTop(v > 0.05);
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="iks-realm">
      <CustomCursor />
      <InteractiveMotif />

      {/* Scroll Progress Bar */}
      <motion.div
        className="iks-progress-bar"
        style={{ scaleX, transformOrigin: 'left', zIndex: 10002 }}
      />

      {/* Entrance Transition */}
      <motion.div
        className="iks-entrance-overlay"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6 }}
           className="iks-display" 
           style={{ color: 'white', fontSize: '3rem', fontWeight: 800 }}
        >
          Entering the Realm...
        </motion.div>
      </motion.div>

      {/* Side Nav dots (Desktop) */}
      <UnitProgress units={data.units} />

      {/* ═══ MINIMAL FLOATING TOOLBAR ═══ */}
      <div className="iks-toolbar">
        <button 
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate('/students/notes');
            }
          }}
          className="iks-toolbar-btn iks-exit-btn"
        >
          <ArrowLeft size={16} /> <span>Exit</span>
        </button>

        <div className="iks-toolbar-right">
          <DownloadPDF contentRef={mainRef} />
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>

      <VedicHero title={data.title} eyebrow={data.eyebrow} tagline={data.tagline} />

      <main ref={mainRef}>
        {data.units.map((unit) => (
          <section key={unit.id} id={`unit-${unit.id}`}>
            <div className="iks-container">
               {unit.blocks.map((block, i) => <BlockRenderer key={i} block={block} />)}
            </div>
          </section>
        ))}

        {/* Exam Prep */}
        <section id="exam-section" className="iks-exam-section">
          <div className="iks-container" style={{ maxWidth: '1200px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="iks-label" style={{ color: 'var(--iks-gold)' }}>Pedagogical Resources</div>
              <h2 className="iks-display" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Examination Mastery</h2>
              <div style={{ width: '60px', height: '2px', background: 'var(--iks-gold)', margin: '0 auto' }} />
            </div>
            
            <div className="iks-exam-columns">
              <div>
                <h4 className="iks-display" style={{ fontSize: '1.8rem', color: 'var(--iks-gold)', marginBottom: '2.5rem' }}>Short Answer Questions</h4>
                <div className="iks-exam-grid">
                  {data.examQuestions.short.map((q, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="iks-q-card"
                    >
                      <div className="iks-mono" style={{ color: 'var(--iks-gold)', marginBottom: '8px' }}>Q{i+1} {q.priority && `· ${q.priority}`}</div>
                      <p>{q.q}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="iks-display" style={{ fontSize: '1.8rem', color: 'var(--iks-gold)', marginBottom: '2.5rem' }}>Essay Mastery</h4>
                <div className="iks-exam-grid">
                  {data.examQuestions.long.map((q, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="iks-q-card"
                      style={{ borderLeftColor: 'var(--iks-gold)' }}
                    >
                      <div className="iks-mono" style={{ color: 'var(--iks-gold)', marginBottom: '8px' }}>LONG ESSAY Q{i+1} {q.priority && `· ${q.priority}`}</div>
                      <p>{q.q}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="iks-footer">
          <div className="iks-divider" style={{ color: 'var(--iks-gold)', opacity: 0.3 }}>✦ ✦ ✦</div>
          <p className="iks-mono" style={{ fontSize: '0.8rem', letterSpacing: '4px', color: 'white', opacity: 0.8 }}>
             BEVPEDIA.IN ACADEMIC REALM · NEW WAY TO LEARN
          </p>
          <p style={{ color: 'white', opacity: 0.3, fontSize: '0.65rem', marginTop: '10px' }}>ESTABLISHED ON TRADITION · POWERED BY EXCELLENCE</p>
        </footer>
      </main>

      {/* Back to Top — appears after scrolling */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="iks-back-to-top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IKSModuleView;
