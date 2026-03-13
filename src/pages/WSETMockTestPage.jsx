import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { wsetQuestions } from '../data/wset';
import { motion, AnimatePresence } from 'framer-motion';

const WSET_LEVELS = [
  {
    id: 1,
    title: 'WSET Level 1',
    subtitle: 'Award in Wines (Beginner)',
    color: '#D4AF37', // Gold
    purpose: 'This is the entry-level course designed for beginners with little or no wine knowledge.',
    duration: 'Usually 6 to 8 hours of study. Often completed in 1 day or 2 half days.',
    outcomes: [
      {
        name: 'Main types and styles of wine',
        items: ['Types: Still, Sparkling, Fortified', 'Styles: Dry, Medium, Sweet']
      },
      {
        name: 'Major grape varieties',
        items: ['Cabernet Sauvignon', 'Merlot', 'Chardonnay', 'Sauvignon Blanc']
      },
      {
        name: 'Storage & Service',
        items: ['Proper storage conditions', 'Serving temperatures', 'Opening and serving wine']
      },
      {
        name: 'Food & Wine Pairing',
        items: ['Basic taste components', 'Simple pairing principles']
      }
    ],
    exam: {
      format: '30 multiple choice questions',
      duration: '45 minutes',
      passMark: '70 percent',
      tasting: 'No tasting exam required.'
    },
    cost: '₹15,000 to ₹25,000'
  },
  {
    id: 2,
    title: 'WSET Level 2',
    subtitle: 'Award in Wines (Intermediate)',
    color: '#C0C0C0', // Silver
    purpose: 'This course builds structured knowledge of global wines and major regions.',
    duration: '16 to 20 hours of study. Usually completed in 3 to 5 days.',
    outcomes: [
      {
        name: 'Environmental Factors & Winemaking',
        items: ['Climate, soil, and vineyard management', 'Crushing, fermentation, and maturation']
      },
      {
        name: 'Key Grape Varieties & Regions',
        items: [
          'Red: Pinot Noir, Zinfandel, Grenache, etc.',
          'White: Riesling, Pinot Grigio, Chenin Blanc, etc.',
          'Regions: France, Italy, Spain, USA, Australia, etc.'
        ]
      },
      {
        name: 'Sparkling & Fortified Wines',
        items: ['Main production methods', 'Key styles (Champagne, Port, Sherry)']
      },
      {
        name: 'Tasting Skills',
        items: ['Around 40 wines tasted during the course', 'Systematic Approach to Tasting (SAT)']
      }
    ],
    exam: {
      format: '50 multiple choice questions',
      duration: '60 minutes',
      passMark: '55 percent',
      tasting: 'No tasting exam required.'
    },
    cost: '₹35,000 to ₹50,000'
  },
  {
    id: 3,
    title: 'WSET Level 3',
    subtitle: 'Award in Wines (Advanced)',
    color: '#B87333', // Copper/Bronze style
    purpose: 'Advanced qualification for professionals working in wine or hospitality.',
    duration: '80 to 100 hours of study. Intensive 5-10 days or 6-8 weeks.',
    outcomes: [
      {
        name: 'Viticulture & Vinification',
        items: ['Detailed climate/soil effects', 'Human factors in the vineyard', 'Advanced fermentation management']
      },
      {
        name: 'Detailed Global Regions',
        items: ['In-depth study of Old World (Europe) and New World regions', 'Factors affecting price and quality']
      },
      {
        name: 'Professional Tasting',
        items: ['Blind tasting of 2 wines', 'Analysis of appearance, nose, palate, and quality assessment']
      }
    ],
    exam: {
      format: '50 multiple choice + 4 short written answers',
      duration: 'Approximately 2.5 hours',
      passMark: '55 percent overall',
      tasting: 'Part 3: Blind tasting of 2 wines'
    },
    cost: '₹80,000 to ₹120,000'
  },
  {
    id: 4,
    title: 'WSET Level 4',
    subtitle: 'Diploma in Wines (DipWSET)',
    color: '#722F37', // Wine Red
    purpose: 'Professional diploma and one of the highest qualifications before Master of Wine.',
    duration: '18 months to 3 years depending on study pace.',
    units: [
      'D1: Wine Production (Viticulture & Science)',
      'D2: Wine Business (Global Marketing & Trade)',
      'D3: Wines of the World (Detailed Regional Study)',
      'D4: Sparkling Wines',
      'D5: Fortified Wines',
      'D6: Independent Research Assignment (3000 words)'
    ],
    exam: {
      format: 'Written exams, theory papers, and blind tasting',
      duration: 'Multiple sessions across 6 units',
      passMark: 'Varies by unit',
      tasting: 'D3 involves blind tasting 12 wines'
    },
    cost: '₹6,00,000 to ₹9,00,000 (Total)'
  }
];

export default function WSETMockTestPage() {
  const [activeLevel, setActiveLevel] = useState(1);
  const currentLevel = WSET_LEVELS.find(l => l.id === activeLevel);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <header className="page-header animate-fade-up">
        <Link to="/quiz" style={{ color: 'var(--clr-accent)', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
          ← Back to Quiz
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          WSET <span style={{ color: 'var(--clr-accent)' }}>Certification Guide</span>
        </h1>
        <p className="text-muted" style={{ maxWidth: '800px', lineHeight: '1.6', fontSize: '1.1rem' }}>
          The Wine & Spirit Education Trust (WSET) is the global standard in beverage education. 
          Use this guide to understand the progression of qualifications and prepare for your examinations.
        </p>
      </header>

      {/* Level Selector */}
      <div className="filter-bar animate-fade-up" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
        {WSET_LEVELS.map(level => (
          <button
            key={level.id}
            className={`filter-pill ${activeLevel === level.id ? 'active' : ''}`}
            onClick={() => setActiveLevel(level.id)}
            style={{ 
              borderColor: activeLevel === level.id ? level.color : 'var(--clr-border)',
              backgroundColor: activeLevel === level.id ? `${level.color}20` : 'transparent',
              color: activeLevel === level.id ? level.color : 'var(--clr-text)'
            }}
          >
            Level {level.id}
          </button>
        ))}
      </div>

      <div className="wset-content-grid animate-fade-up" style={{ 
        marginTop: '2rem', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        
        {/* Main Info Card */}
        <div className="detail-card" style={{ borderTop: `4px solid ${currentLevel.color}` }}>
          <div className="detail-card-header">
            <h2 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>{currentLevel.title}</h2>
            <p style={{ color: currentLevel.color, fontWeight: 'bold' }}>{currentLevel.subtitle}</p>
          </div>
          <div className="detail-card-body">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Purpose</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{currentLevel.purpose}</p>
            
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--clr-surface-alt)', borderRadius: '12px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Duration:</strong> {currentLevel.duration}</p>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}><strong>Typical Cost (India):</strong> {currentLevel.cost}</p>
            </div>
          </div>
        </div>

        {/* Syllabus / Outcomes Card */}
        <div className="detail-card">
          <div className="detail-card-header">
            <h3 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Syllabus Focus</h3>
          </div>
          <div className="detail-card-body">
            {currentLevel.outcomes ? (
              currentLevel.outcomes.map((outcome, idx) => (
                <div key={idx} style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--clr-accent)', marginBottom: '0.4rem' }}>{outcome.name}</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>
                    {outcome.items.map((item, i) => <li key={i} style={{ marginBottom: '0.2rem' }}>{item}</li>)}
                  </ul>
                </div>
              ))
            ) : (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--clr-accent)', marginBottom: '0.4rem' }}>Units of Study</h4>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>
                  {currentLevel.units.map((unit, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{unit}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Examination Card */}
        <div className="detail-card" style={{ background: 'var(--clr-surface-alt)', borderColor: 'transparent' }}>
          <div className="detail-card-header">
            <h3 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Examination Details</h3>
          </div>
          <div className="detail-card-body">
            <div className="detail-meta">
              <div className="detail-meta-item">
                <div className="detail-meta-label">Format</div>
                <div className="detail-meta-value" style={{fontSize: '0.85rem'}}>{currentLevel.exam.format}</div>
              </div>
              <div className="detail-meta-item">
                <div className="detail-meta-label">Time</div>
                <div className="detail-meta-value">{currentLevel.exam.duration}</div>
              </div>
              <div className="detail-meta-item">
                <div className="detail-meta-label">Pass Mark</div>
                <div className="detail-meta-value">{currentLevel.exam.passMark}</div>
              </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', borderLeft: `3px solid ${currentLevel.color}`, paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.5rem' }}>Tasting Requirement</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)', margin: 0 }}>{currentLevel.exam.tasting}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Test Preparation Area */}
      <WSETQuizEngine activeLevel={activeLevel} levelColor={currentLevel.color} />

      {/* Career & Providers Info */}
      <section className="animate-fade-up" style={{ marginTop: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '2rem' }}>Career Value & Providers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--clr-accent)', marginBottom: '1rem' }}>Why WSET?</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Recognized globally by industry leaders like Diageo, Moët Hennessy, and Pernod Ricard. 
              Ideal for sommeliers, beverage managers, wine buyers, and educators.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--clr-accent)', marginBottom: '1rem' }}>Study in India</h3>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.95rem', color: 'var(--clr-text-muted)' }}>
              <li>Sonarys Co-Brands Education</li>
              <li>Wine Academy of India</li>
              <li>Spiritz Academy</li>
              <li style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>Available in Mumbai, Delhi, Bangalore, Goa</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function WSETQuizEngine({ activeLevel, levelColor }) {
  const [examState, setExamState] = useState('instructions'); // instructions, active, finished
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { index: answer }
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [analysis, setAnalysis] = useState(null);

  // Load questions for the active level
  const questions = useMemo(() => {
    const levelKey = `WSET Level ${activeLevel}`;
    const pool = wsetQuestions.filter(q => q.level === levelKey);
    return pool.sort(() => Math.random() - 0.5).slice(0, 30); // 30 questions for mock
  }, [activeLevel]);

  // Helper to categorize questions for the report
  const getSubCategory = (q) => {
    const text = (q.q + " " + (q.category || "")).toLowerCase();
    if (text.includes('service') || text.includes('storage') || text.includes('temperature') || text.includes('glass')) return 'Service & Storage';
    if (text.includes('sparkling') || text.includes('cava') || text.includes('prosecco') || text.includes('champagne')) return 'Sparkling Wines';
    if (text.includes('fortified') || text.includes('port') || text.includes('sherry')) return 'Fortified Wines';
    if (text.includes('fermentation') || text.includes('yeast') || text.includes('crush') || text.includes('vinification') || text.includes('viticulture')) return 'Production & Viticulture';
    if (text.includes('food') || text.includes('pairing') || text.includes('umami')) return 'Food & Wine Pairing';
    return 'Regions & Varieties';
  };

  // Timer logic
  useEffect(() => {
    let timer;
    if (examState === 'active' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && examState === 'active') {
      finishExam();
    }
    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  // Hide scrollbar and nav during exam
  useEffect(() => {
    if (examState === 'active') {
      document.body.style.overflow = 'hidden';
      // Hide the global header if possible (common practice in CBT)
      const header = document.querySelector('.navbar');
      if (header) header.style.display = 'none';
    } else {
      document.body.style.overflow = 'auto';
      const header = document.querySelector('.navbar');
      if (header) header.style.display = 'flex';
    }
    return () => {
      document.body.style.overflow = 'auto';
      const header = document.querySelector('.navbar');
      if (header) header.style.display = 'flex';
    };
  }, [examState]);

  const startExam = () => {
    setTimeLeft(activeLevel === 1 ? 45 * 60 : 60 * 60); // 45m for L1, 60m for L2+
    setExamState('active');
    setAnswers({});
    setMarkedForReview(new Set());
    setCurrentIdx(0);
    setAnalysis(null);
  };

  const finishExam = () => {
    const categoryStats = {};
    let correctCount = 0;

    questions.forEach((q, idx) => {
      const cat = getSubCategory(q);
      if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 };
      categoryStats[cat].total++;
      
      if (answers[idx] === q.a) {
        correctCount++;
        categoryStats[cat].correct++;
      }
    });

    setAnalysis({
      score: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100),
      categories: categoryStats
    });
    setExamState('finished');
  };

  const toggleMarkForReview = (idx) => {
    const newMarked = new Set(markedForReview);
    if (newMarked.has(idx)) newMarked.delete(idx);
    else newMarked.add(idx);
    setMarkedForReview(newMarked);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (examState === 'instructions') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="cbt-instructions">
        <div className="detail-card" style={{ maxWidth: '800px', margin: '4rem auto', padding: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
             WSET Level {activeLevel} <span style={{ color: levelColor }}>Examination Rules</span>
          </h2>
          <div style={{ lineHeight: '1.8', color: 'var(--clr-text-muted)', marginBottom: '2rem' }}>
            <p>Welcome to the Beverage Encyclopedia Professional CBT environment. Please read the following rules:</p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Total Questions: <strong>{questions.length}</strong></li>
              <li>Time Allotted: <strong>{activeLevel === 1 ? '45' : '60'} Minutes</strong></li>
              <li>Pass Mark: <strong>70% (L1) / 55% (L2+)</strong></li>
              <li><strong>Immersive Mode</strong>: Navigation will be hidden to maintain focus.</li>
              <li>Use the <strong>Question Palette</strong> to navigate.</li>
              <li>The exam will auto-submit when the timer reaches zero.</li>
            </ul>
          </div>
          <div style={{ textAlign: 'center' }}>
            {questions.length > 0 ? (
              <button className="btn btn-primary" onClick={startExam} style={{ background: levelColor, padding: '15px 50px' }}>
                I AM READY - START EXAM
              </button>
            ) : (
              <p style={{ color: 'var(--clr-accent)' }}>Data for this level is being updated. Check back soon!</p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (examState === 'finished' && analysis) {
    const pass = analysis.percentage >= (activeLevel === 1 ? 70 : 55);
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="cbt-results">
        <div className="detail-card" style={{ maxWidth: '900px', margin: '2rem auto', padding: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{pass ? '🎉' : '📚'}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem' }}>Candidate Performance Report</h2>
            <p className="text-muted">WSET Level {activeLevel} Mock Examination</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: pass ? '#30C88A' : '#E05C5C' }}>{analysis.percentage}%</div>
              <div style={{ fontSize: '1.1rem', opacity: 0.8 }}>Final Score</div>
              <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>{analysis.score} / {analysis.total} Correct</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ margin: 0, color: pass ? '#30C88A' : '#E05C5C' }}>Status: {pass ? 'PASSED' : 'NOT YET COMPETENT'}</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                {pass 
                  ? "Great job! Your understanding of the curriculum is solid. Continue practicing to maintain your edge for the final WSET exam."
                  : "Don't be discouraged. Use the breakdown below to identify your knowledge gaps and focus your study sessions accordingly."}
              </p>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem', borderBottom: '1px solid var(--clr-border)', paddingBottom: '0.5rem' }}>Knowledge Area Breakdown</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {Object.entries(analysis.categories).map(([cat, stats]) => {
              const catPct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={cat} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--clr-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 'bold' }}>{cat}</span>
                    <span style={{ color: catPct >= 70 ? '#30C88A' : catPct >= 50 ? '#D4AF37' : '#E05C5C' }}>{catPct}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${catPct}%`, height: '100%', background: catPct >= 70 ? '#30C88A' : catPct >= 50 ? '#D4AF37' : '#E05C5C' }} />
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)', marginTop: '0.75rem', margin: '0.75rem 0 0' }}>
                    {catPct < 70 
                      ? `⚠️ Focus Area: Review your notes on ${cat.toLowerCase()} to improve your score.` 
                      : `✅ Strong Area: You have a good grasp of ${cat.toLowerCase()}.`}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center', borderTop: '1px solid var(--clr-border)', paddingTop: '2rem' }}>
            <button className="btn btn-primary" onClick={startExam} style={{ background: levelColor }}>Retake Exam</button>
            <button className="btn btn-outline" onClick={() => setExamState('instructions')}>Return to Guide</button>
          </div>
        </div>
      </motion.div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="cbt-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'var(--clr-bg)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="cbt-container animate-fade-in" style={{ 
        width: '100%',
        maxWidth: '1200px',
        display: 'grid', 
        gridTemplateColumns: '1fr 320px', 
        gap: '2rem',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '32px',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '3rem',
        height: '90vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Main Examination View */}
        <div className="cbt-main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--clr-border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', letterSpacing: '1px' }}>WSET LEVEL {activeLevel} MOCK</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{currentIdx + 1} <span style={{ fontSize: '1rem', color: 'var(--clr-text-muted)' }}>OF {questions.length}</span></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', letterSpacing: '1px' }}>TIME REMAINING</span>
              <div style={{ fontSize: '2.2rem', fontFamily: 'monospace', fontWeight: 'bold', color: timeLeft < 300 ? '#E05C5C' : 'var(--clr-text)' }}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </header>

          <div className="question-content" style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '1rem' }}>
            <h3 style={{ fontSize: '1.6rem', lineHeight: '1.4', marginBottom: '3rem', fontFamily: 'var(--font-display)' }}>{q.q}</h3>
            
            <div className="options-grid" style={{ display: 'grid', gap: '1.25rem' }}>
              {q.options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => setAnswers({...answers, [currentIdx]: opt})}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: `1px solid ${answers[currentIdx] === opt ? levelColor : 'rgba(255,255,255,0.1)'}`,
                    background: answers[currentIdx] === opt ? `${levelColor}15` : 'rgba(255,255,255,0.02)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'inherit',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    fontSize: '1.1rem'
                  }}
                >
                  <div style={{ 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    border: `2px solid ${answers[currentIdx] === opt ? levelColor : 'rgba(255,255,255,0.3)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {answers[currentIdx] === opt && <div style={{ width: '14px', height: '14px', background: levelColor, borderRadius: '50%' }} />}
                  </div>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <footer style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              className="btn btn-outline" 
              onClick={() => toggleMarkForReview(currentIdx)} 
              style={{ 
                borderColor: markedForReview.has(currentIdx) ? '#D4AF37' : 'rgba(255,255,255,0.2)', 
                color: markedForReview.has(currentIdx) ? '#D4AF37' : 'inherit',
                background: markedForReview.has(currentIdx) ? '#D4AF3710' : 'transparent'
              }}
            >
              {markedForReview.has(currentIdx) ? '✨ Marked for Review' : 'Mark for Review'}
            </button>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-outline" disabled={currentIdx === 0} onClick={() => setCurrentIdx(prev => prev - 1)}>Previous</button>
              {currentIdx === questions.length - 1 ? (
                <button className="btn btn-primary" onClick={finishExam} style={{ background: '#30C88A', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>FINISH EXAM</button>
              ) : (
                <button className="btn btn-primary" onClick={() => setCurrentIdx(prev => prev + 1)} style={{ background: levelColor, paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Next Question</button>
              )}
            </div>
          </footer>
        </div>

        {/* Question Palette Sidebar */}
        <aside className="cbt-sidebar" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Exam Dashboard</h4>
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem', marginBottom: '2rem' }}>
              {questions.map((_, idx) => {
                let bgColor = 'rgba(255,255,255,0.05)';
                let borderColor = 'rgba(255,255,255,0.05)';
                let color = 'rgba(255,255,255,0.4)';
                
                if (currentIdx === idx) {
                  borderColor = levelColor;
                  bgColor = `${levelColor}20`;
                  color = 'white';
                } else if (markedForReview.has(idx)) {
                  bgColor = '#D4AF3744';
                  color = 'white';
                } else if (answers[idx]) {
                  bgColor = '#30C88A44';
                  color = 'white';
                }

                return (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIdx(idx)}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '10px',
                      border: `2px solid ${borderColor}`,
                      background: bgColor,
                      color: color,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="palette-legend" style={{ fontSize: '0.85rem', display: 'grid', gap: '0.75rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', background: '#30C88A44', borderRadius: '3px' }} /> Answered
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', background: '#D4AF3744', borderRadius: '3px' }} /> Marked for Review
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }} /> Not Answered
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
