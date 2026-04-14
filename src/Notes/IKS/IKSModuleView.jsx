import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Lightbulb, Quote, ChevronRight, Award, Layers } from 'lucide-react';

import VedicHero from './components/VedicHero';
import TraditionalTimeline from './components/TraditionalTimeline';
import InteractiveMotif from './components/InteractiveMotif';
import CustomCursor from './components/CustomCursor';
import StoryExhibit from './components/StoryExhibit';

import { iksModule1 } from '../data/iksData';
import '../../styles/iks.css';

// Higher-order component for staggered revealing
const RevealBlock = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

const BlockRenderer = ({ block }) => {
  switch (block.type) {
    case 'header':
      return (
        <RevealBlock>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '4rem 0 2rem' }}>
            <div style={{ height: '2px', flex: 1, background: 'linear-gradient(to right, transparent, var(--iks-border))' }} />
            <h2 className="iks-display" style={{ fontSize: '2.8rem', color: 'var(--iks-rust)', textAlign: 'center' }}>{block.text}</h2>
            <div style={{ height: '2px', flex: 1, background: 'linear-gradient(to left, transparent, var(--iks-border))' }} />
          </div>
        </RevealBlock>
      );
    
    case 'sub-header':
      return (
        <RevealBlock>
          <h4 className="iks-display" style={{ fontSize: '1.8rem', color: 'var(--iks-rust)', borderBottom: '1px solid var(--iks-border)', display: 'inline-block', paddingBottom: '8px', marginBottom: '2rem' }}>{block.text}</h4>
        </RevealBlock>
      );
    
    case 'paragraph':
      return (
        <RevealBlock>
          <p className={block.isIntro ? "iks-unit-intro" : ""} style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--iks-ink-light)' }}>{block.text}</p>
        </RevealBlock>
      );
    
    case 'callout':
      return (
        <RevealBlock>
          <div className={`iks-callout-premium ${block.variant}`}>
            <div className="iks-label">{block.label}</div>
            <p style={{ fontSize: '1.2rem', fontStyle: block.variant === 'quote' ? 'italic' : 'normal', fontWeight: 500, whiteSpace: 'pre-line' }}>{block.text}</p>
          </div>
        </RevealBlock>
      );
    
    case 'table':
      return (
        <RevealBlock>
          <div className="iks-table-container" style={{ margin: '4rem 0' }}>
            <table className="iks-table" style={{ background: 'white' }}>
              <thead>
                <tr>
                  {block.headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={ci === 0 ? { fontWeight: 700, color: 'var(--iks-rust)' } : {}}>
                        {cell}
                      </td>
                    ))}
                  </tr>
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
                transition={{ delay: i * 0.1 }}
                style={{ marginBottom: '1.5rem', display: 'flex', gap: '15px' }}
              >
                <div style={{ width: '20px', height: '2px', background: 'var(--iks-gold)', marginTop: '12px', flexShrink: 0 }} />
                <span style={{ fontSize: '1.05rem', color: 'var(--iks-ink-light)' }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </RevealBlock>
      );
    
    case 'grid':
      return (
        <div className="iks-exam-grid" style={{ margin: '4rem 0' }}>
          {block.items.map((item, i) => (
            <RevealBlock key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -10, boxShadow: '0 20px 40px var(--iks-shadow)' }}
                style={{ background: 'white', padding: '30px', borderRadius: '4px', border: '1px solid var(--iks-border)', height: '100%' }}
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

const IKSModuleView = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const data = iksModule1;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
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
        style={{
          scaleX,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '6px',
          backgroundColor: 'var(--iks-saffron)',
          transformOrigin: '0%',
          zIndex: 10001,
          boxShadow: '0 -2px 10px rgba(200, 98, 26, 0.2)'
        }}
      />

      {/* Entrance Transition */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        style={{ position: 'fixed', inset: 0, background: 'var(--iks-saffron)', zIndex: 99999, transformOrigin: 'top', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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

      {/* Side Nav dots */}
      <div className="iks-sidebar-premium">
        {data.units.map((u, i) => (
          <a key={u.id} href={`#unit-${u.id}`} className="iks-nav-dot" title={u.title} />
        ))}
        <a href="#exam-section" className="iks-nav-dot" title="Exam Prep" style={{ background: 'var(--iks-saffron)' }} />
      </div>

      <button 
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/students/notes'); // Fallback to notes page
          }
        }}
        className="iks-exit-btn"
      >
        <ArrowLeft size={16} /> <span>Exit Realm</span>
      </button>

      <VedicHero title={data.title} eyebrow={data.eyebrow} tagline={data.tagline} />

      <main>
        {data.units.map((unit) => (
          <section key={unit.id} id={`unit-${unit.id}`}>
            <div className="iks-container">
               {unit.blocks.map((block, i) => <BlockRenderer key={i} block={block} />)}
            </div>
          </section>
        ))}

        {/* Exam Prep Layout Refinement */}
        <section id="exam-section" style={{ background: 'var(--iks-ink)', color: 'white', padding: '100px 0', marginTop: '100px' }}>
          <div className="iks-container" style={{ maxWidth: '1200px' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="iks-label" style={{ color: 'var(--iks-gold)' }}>Pedagogical Resources</div>
              <h2 className="iks-display" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Examination Mastery</h2>
              <div style={{ width: '60px', height: '2px', background: 'var(--iks-gold)', margin: '0 auto' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '6rem' }}>
              <div>
                <h4 className="iks-display" style={{ fontSize: '1.8rem', color: 'var(--iks-gold)', marginBottom: '2.5rem' }}>Short Answer Questions</h4>
                <div className="iks-exam-grid">
                  {data.examQuestions.short.map((q, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="iks-q-card"
                    >
                      <div className="iks-mono" style={{ color: 'var(--iks-gold)', marginBottom: '8px' }}>Q{i+1} {q.priority && `· ${q.priority}`}</div>
                      <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{q.q}</p>
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
                      whileHover={{ x: 10 }}
                      className="iks-q-card"
                      style={{ borderLeftColor: 'var(--iks-gold)' }}
                    >
                      <div className="iks-mono" style={{ color: 'var(--iks-gold)', marginBottom: '8px' }}>LONG ESSAY Q{i+1} {q.priority && `· ${q.priority}`}</div>
                      <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>{q.q}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer style={{ padding: '80px 0', textAlign: 'center', background: 'var(--iks-ink)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="iks-divider" style={{ color: 'var(--iks-gold)', opacity: 0.3 }}>✦ ✦ ✦</div>
          <p className="iks-mono" style={{ fontSize: '0.8rem', letterSpacing: '4px', color: 'white', opacity: 0.8 }}>
             BEVPEDIA.IN ACADEMIC REALM · NEW WAY TO LEARN
          </p>
          <p style={{ color: 'white', opacity: 0.3, fontSize: '0.65rem', marginTop: '10px' }}>ESTABLISHED ON TRADITION · POWERED BY EXCELLENCE</p>
        </footer>
      </main>
    </div>
  );
};

export default IKSModuleView;
