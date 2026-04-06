import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  BookText, 
  FileText, 
  Timer, 
  ClipboardList, 
  ArrowLeft, 
  School, 
  BarChart3, 
  Calculator, 
  Apple, 
  ChefHat, 
  Wine, 
  Bed, 
  Hotel, 
  Brain, 
  Library,
  Award,
  CheckCircle,
  XCircle,
  MinusCircle,
  Search,
  Book,
  Download,
  Check
} from 'lucide-react';
import { nchmct_jee_info, jee_questions } from '../data/nchmct_jee';
import { nhtet_info, nhtet_questions, nhtet_subject_materials } from '../data/nhtet';
import SEO from '../components/SEO';

const SUBJECT_ICON_MAP = {
  '📚': Library,
  '📊': BarChart3,
  '💰': Calculator,
  '🍎': Apple,
  '👨‍🍳': ChefHat,
  '🍷': Wine,
  '🛏️': Bed,
  '🏨': Hotel,
  '🧠': Brain,
  '📖': BookText
};

const NCHMCTPage = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('select-exam'); // 'select-exam', 'dashboard', 'mock-test', 'results'
  const [selectedExam, setSelectedExam] = useState(null); // 'jee' or 'nhtet'
  const [activeSection, setActiveSection] = useState('info'); // 'info', 'materials', 'papers', 'mock'
  const [materialSubject, setMaterialSubject] = useState(null);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  
  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizResult, setQuizResult] = useState(null);
  const [isPaletteExpanded, setIsPaletteExpanded] = useState(false);

  const examData = selectedExam === 'jee' ? nchmct_jee_info : nhtet_info;
  const examQuestions = selectedExam === 'jee' ? jee_questions : nhtet_questions;

  // Timer Effect
  useEffect(() => {
    let timer;
    if (phase === 'mock-test' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const handleSelectExam = (type) => {
    setSelectedExam(type);
    setPhase('dashboard');
    setActiveSection('info');
  };

  const startMockTest = (testConfig) => {
    // Shuffle the question pool
    let pool = [...examQuestions];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    // Limit to the requested test configuration number
    const selectedQuestions = pool.slice(0, testConfig.questions || pool.length);

    setQuizQuestions(selectedQuestions);
    setTimeLeft(testConfig.time * 60);
    setUserAnswers({});
    setFlags({});
    setCurrentIdx(0);
    setPhase('mock-test');
  };

  const finishQuiz = useCallback(() => {
    const questions = quizQuestions;
    let correct = 0;
    let totalMarks = 0;
    let scoredMarks = 0;
    let attempted = 0;

    questions.forEach((q, idx) => {
      totalMarks += q.marks;
      const ans = userAnswers[idx];
      if (ans !== undefined && ans !== null) {
        attempted++;
        if (ans === q.ans) {
          correct++;
          scoredMarks += q.marks;
        } else {
          if (selectedExam === 'jee') {
            scoredMarks -= 1;
          }
        }
      }
    });

    setQuizResult({
      total: questions.length,
      correct,
      attempted,
      totalMarks,
      scoredMarks,
      pct: Math.max(0, Math.round((scoredMarks / totalMarks) * 100)),
      timeTaken: timeLeft 
    });
    setPhase('results');
  }, [quizQuestions, userAnswers, selectedExam, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const renderSelection = () => (
    <div className="nchm-container">
      <div className="nchm-text-center nchm-mb-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="nchm-badge">
          NCHMCT Academic Hub
        </motion.div>
        <h1 className="nchm-title">Choose Your <span style={{color:'#10B981'}}>Path</span></h1>
        <p className="nchm-subtitle">Select a program to access study materials, previous papers, and simulated mock examinations.</p>
      </div>

      <div className="nchm-grid">
        {[
          { id: 'jee', ...nchmct_jee_info, icon: GraduationCap },
          { id: 'nhtet', ...nhtet_info, icon: BookOpen }
        ].map((exam) => (
          <motion.div 
            key={exam.id}
            whileHover={{ y: -5 }}
            onClick={() => handleSelectExam(exam.id)}
            className="nchm-card"
          >
            <div className="nchm-card-icon">
              <exam.icon size={40} color="#10B981" strokeWidth={1.5} />
            </div>
            <h3 className="nchm-card-title">{exam.title}</h3>
            <p className="nchm-card-desc">{exam.subtitle}</p>
            <button className="nchm-btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Enter Hub <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="nchm-container">
      <div className="nchm-dash-header">
        <div>
          <button onClick={() => setPhase('select-exam')} className="nchm-back-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#10B981', cursor: 'pointer', marginBottom: '16px' }}>
            <ArrowLeft size={16} /> Back to Selection
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <School size={28} color="#10B981" />
            <h2 className="nchm-dash-title" style={{ margin: 0 }}>{examData.title} <span style={{color:'white'}}>Academic Center</span></h2>
          </div>
          <p className="nchm-subtitle" style={{margin:'8px 0', textAlign:'left'}}>{examData.overview}</p>
        </div>
        <div className="nchm-tab-bar">
          {[
            { id: 'info', icon: BookText, label: 'INFO' },
            { id: 'materials', icon: Library, label: 'MATERIALS' },
            { id: 'papers', icon: FileText, label: 'PAPERS' },
            { id: 'mock', icon: ClipboardList, label: 'MOCK' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`nchm-tab ${activeSection === tab.id ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeSection === 'info' && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="nchm-section-grid">
          <div className="nchm-info-card">
            <h4 className="nchm-info-header">📊 Exam Pattern & Layout</h4>
            <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
               {selectedExam === 'jee' ? (
                 <>
                   <div className="nchm-item-row"><span className="nchm-item-label">Duration</span><span className="nchm-item-value">{examData.pattern.duration}</span></div>
                   <div className="nchm-item-row"><span className="nchm-item-label">Total Questions</span><span className="nchm-item-value">{examData.pattern.totalQuestions}</span></div>
                   <div className="nchm-item-row"><span className="nchm-item-label">Marking Scheme</span><span className="nchm-item-value" style={{color:'#10B981'}}>{examData.pattern.marking}</span></div>
                 </>
               ) : (
                examData.pattern.papers.map(p => (
                  <div key={p.id} className="nchm-item-row">
                    <span className="nchm-item-label">Paper {p.id}: {p.name}</span>
                    <span className="nchm-item-value">{p.questions} Qs | {p.duration}</span>
                  </div>
                ))
               )}
            </div>
          </div>
          <div className="nchm-info-card">
             <h4 className="nchm-info-header">💡 Quick Tips</h4>
             <ul className="nchm-list">
               <li className="nchm-list-item"><span>&bull;</span> Focus on Numerical Ability and English for high scoring.</li>
               <li className="nchm-list-item"><span>&bull;</span> Practice at least 5 full-length mock tests before the actual exam.</li>
               <li className="nchm-list-item"><span>&bull;</span> The "Service Sector" section is unique to NCHMCT – study hospitality protocols.</li>
               <li className="nchm-list-item"><span>&bull;</span> Effective time management is key: 200 questions in 180 minutes.</li>
             </ul>
          </div>
        </motion.div>
      )}

      {activeSection === 'materials' && selectedExam === 'nhtet' && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}}>
          {!materialSubject ? (
            <>
              <div style={{marginBottom:'24px'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Library size={24} color="#10B981" />
                  <h3 className="nhtet-mat-heading" style={{ margin: 0 }}>Subject-Wise Study Material</h3>
                </div>
                <p className="nhtet-mat-subtext">Select a subject to practice questions from the NHTET question bank.</p>
              </div>
              <div className="nhtet-subject-grid">
                {nhtet_subject_materials.map((subject, idx) => {
                  const Icon = SUBJECT_ICON_MAP[subject.icon] || Book;
                  return (
                    <motion.div
                      key={idx}
                      className="nhtet-subject-card"
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setMaterialSubject(subject); setRevealedAnswers({}); setShowAnswers({}); setSelectedOptions({}); }}
                    >
                      <div className="nhtet-subject-icon">
                        <Icon size={32} color="#10B981" />
                      </div>
                      <h4 className="nhtet-subject-name">{subject.name}</h4>
                      <span className="nhtet-subject-count">{subject.totalQuestions} Questions</span>
                      <div className="nhtet-subject-bar">
                        <div className="nhtet-subject-bar-fill" style={{width: `${Math.min(100, (subject.totalQuestions / 7) )}%`}} />
                      </div>
                      <span className="nhtet-subject-cta" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Study Now <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="nhtet-detail-view">
              <div className="nhtet-detail-header">
                <button className="nchm-back-btn" onClick={() => setMaterialSubject(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ArrowLeft size={16} /> All Subjects
                </button>
                <div className="nhtet-detail-title-row">
                  <div className="nhtet-detail-icon">
                    {(() => {
                      const Icon = SUBJECT_ICON_MAP[materialSubject.icon] || Book;
                      return <Icon size={32} color="#10B981" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="nhtet-detail-title">{materialSubject.name}</h3>
                    <p className="nhtet-detail-meta">{materialSubject.totalQuestions} Questions &bull; NHTET Question Bank</p>
                  </div>
                </div>
              </div>
              <div className="nhtet-questions-list">
                {materialSubject.questions.map((q, i) => (
                  <motion.div
                    key={q.id}
                    className="nhtet-q-item"
                    initial={{opacity:0, y: 10}}
                    animate={{opacity:1, y:0}}
                    transition={{delay: Math.min(i * 0.02, 0.5)}}
                  >
                    <div className="nhtet-q-top" onClick={() => setRevealedAnswers(prev => ({...prev, [i]: !prev[i]}))}>
                      <span className="nhtet-q-num">Q{i + 1}</span>
                      <p className="nhtet-q-text">{q.question}</p>
                      <span className={`nhtet-q-toggle ${revealedAnswers[i] ? 'open' : ''}`}>▼</span>
                    </div>
                    {revealedAnswers[i] && (
                      <motion.div className="nhtet-q-body" initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}}>
                        <div className="nhtet-q-category-tag">{q.category}</div>
                        <div className="nhtet-q-options">
                          {q.options.map((opt, oi) => {
                            const isRevealed = showAnswers[i];
                            const isCorrect = opt === q.answer;
                            const isSelected = selectedOptions[i] === oi;
                            let optClass = 'nhtet-q-opt';
                            let letterClass = 'nhtet-q-opt-letter';
                            if (isRevealed && isCorrect) { optClass += ' correct'; letterClass += ' correct'; }
                            if (isRevealed && isSelected && !isCorrect) { optClass += ' wrong'; letterClass += ' wrong'; }
                            if (!isRevealed && isSelected) { optClass += ' selected'; letterClass += ' selected'; }
                            return (
                              <div
                                key={oi}
                                className={optClass}
                                onClick={() => { if (!isRevealed) setSelectedOptions(prev => ({...prev, [i]: oi})); }}
                                style={{ cursor: isRevealed ? 'default' : 'pointer' }}
                              >
                                <span className={letterClass}>
                                  {String.fromCharCode(65 + oi)}
                                </span>
                                <span className="nhtet-q-opt-text">{opt}</span>
                                {isRevealed && isCorrect && <span className="nhtet-q-correct-badge">✓ Correct</span>}
                                {isRevealed && isSelected && !isCorrect && <span className="nhtet-q-wrong-badge">✗ Wrong</span>}
                              </div>
                            );
                          })}
                        </div>
                        {!showAnswers[i] && (
                          <button
                            className="nhtet-show-answer-btn"
                            onClick={() => setShowAnswers(prev => ({...prev, [i]: true}))}
                          >
                            Show Answer
                          </button>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {activeSection === 'materials' && selectedExam === 'jee' && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="nchm-section-grid">
          {examData.studyMaterial.map((sec, idx) => (
            <div key={idx} className="nchm-info-card">
               <h4 className="nchm-info-header" style={{borderBottom:'1px solid rgba(16,185,129,0.3)', paddingBottom:'12px'}}>{sec.category}</h4>
               <div style={{display:'grid', gap:'12px', marginTop:'20px'}}>
                 {sec.items.map((item, i) => (
                   <a href={item.link} key={i} className="nchm-material-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                     <span className="nchm-material-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <FileText size={16} color="#10B981" />
                       {item.title}
                     </span>
                     <span className="nchm-material-dl" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                       <Download size={14} /> DOWNLOAD
                     </span>
                   </a>
                 ))}
               </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeSection === 'papers' && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="nchm-info-card" style={{maxWidth:'100%'}}>
          <div className="nchm-section-grid">
            {examData.samplePapers.map((paper, idx) => (
              <div key={idx} className="nchm-item-row" style={{padding:'20px', alignItems:'center'}}>
                <div style={{ color: '#10B981' }}><FileText size={24} /></div>
                <div style={{flexGrow:1, marginLeft:'16px'}}>
                   <div style={{fontSize:'10px', color:'#10B981', fontWeight:'700'}}>{paper.year}</div>
                   <div style={{color:'white', fontWeight:'500'}}>{paper.title}</div>
                </div>
                <button 
                  onClick={() => window.open(paper.link, '_blank')}
                  className="nchm-btn-primary" 
                  style={{width:'auto', padding:'8px 16px', fontSize:'10px', display: 'flex', alignItems: 'center', gap: '8px'}}
                >
                  <Search size={12} /> VIEW
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeSection === 'mock' && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="nchm-section-grid">
          {examData.mockTests.map((test) => (
            <div key={test.id} className="nchm-mock-card">
               <div className="nchm-mock-tag">Simulated CBT</div>
               <h4 className="nchm-mock-title">{test.name}</h4>
               <div className="nchm-mock-meta">
                 <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Timer size={14} color="#10B981" /> {test.time} Mins</span>
                 <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ClipboardList size={14} color="#10B981" /> {test.questions} Questions</span>
               </div>
               <button 
                 onClick={() => startMockTest(test)}
                 className="nchm-btn-primary"
                 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
               >
                 <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} /> START MOCK TEST
               </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );

  const renderCBT = () => {
    const q = quizQuestions[currentIdx];
    if (!q) return null;

    return (
      <div className="nchm-cbt-overlay">
        <div className="nchm-topbar">
          <h2 style={{fontSize:'1.25rem', fontFamily:'var(--font-display)', color:'#0f172a'}}>NCHMCT <span style={{color:'#2563eb'}}>Mock Exam</span></h2>
          <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
            <div className="nchm-timer-box" style={timeLeft < 300 ? {background:'#fee2e2', borderColor:'#fecaca'} : {}}>
              <span className="nchm-timer-label">Time Left:</span>
              <span className="nchm-timer-val" style={timeLeft < 300 ? {color:'#dc2626'} : {}}>{formatTime(timeLeft)}</span>
            </div>
            <button
               onClick={() => {if(window.confirm('End exam now?')) finishQuiz()}}
               className="nchm-btn-finish"
            >
              Finish Exam
            </button>
          </div>
        </div>

        <div className="nchm-layout">
          <div className="nchm-sidebar">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
              <h3 style={{fontSize:'10px', fontWeight:'700', color:'#94a3b8', textTransform:'uppercase', letterSpacing:'1px', margin:0}}>Question Palette</h3>
              <button 
                className="nchm-palette-toggle" 
                onClick={() => setIsPaletteExpanded(!isPaletteExpanded)}
              >
                {isPaletteExpanded ? 'Hide Palette ↑' : 'Show Palette ↓'}
              </button>
            </div>
            
            <div className={`nchm-palette-content ${isPaletteExpanded ? 'expanded' : ''}`}>
              <div className="palette-grid">
                {quizQuestions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIdx(i);
                      setIsPaletteExpanded(false); // Auto-close on selection on mobile
                    }}
                    className={`palette-btn ${currentIdx === i ? 'current' : ''} ${userAnswers[i] !== undefined ? 'answered' : ''} ${flags[i] ? 'flagged' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <div style={{marginTop:'auto', paddingTop:'24px', borderTop:'1px solid #f1f5f9', display:'grid', gap:'12px'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#0f172a'}}>
                  <span style={{display:'flex', alignItems:'center', gap:'8px'}}><div style={{width:'12px', height:'12px', background:'#10b981', borderRadius:'3px'}}></div> Answered</span>
                  <span style={{fontWeight:'700'}}>{Object.keys(userAnswers).length}</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#0f172a'}}>
                  <span style={{display:'flex', alignItems:'center', gap:'8px'}}><div style={{width:'12px', height:'12px', background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'3px'}}></div> Not Answered</span>
                  <span style={{fontWeight:'700'}}>{quizQuestions.length - Object.keys(userAnswers).length}</span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', color:'#0f172a'}}>
                  <span style={{display:'flex', alignItems:'center', gap:'8px'}}><div style={{width:'12px', height:'12px', background:'#f59e0b', borderRadius:'3px'}}></div> Flagged</span>
                  <span style={{fontWeight:'700'}}>{Object.keys(flags).filter(k => flags[k]).length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="nchm-main">
             <div className="nchm-q-card">
                <div className="nchm-q-header">
                   <div style={{display:'flex', gap:'12px'}}>
                      <span style={{padding:'4px 12px', background:'#2563eb', color:'white', fontSize:'10px', fontWeight:'700', borderRadius:'4px'}}>QUESTION {currentIdx + 1}</span>
                      <span style={{padding:'4px 12px', background:'#f1f5f9', color:'#64748b', fontSize:'10px', fontWeight:'700', borderRadius:'4px'}}>{q.section}</span>
                   </div>
                   <div style={{fontSize:'12px', fontWeight:'600', color:'#94a3b8'}}>Correct: <span style={{color:'#10b981'}}>+{q.marks}</span> | Wrong: <span style={{color:'#ef4444'}}>{selectedExam === 'jee' ? '-1' : '0'}</span></div>
                </div>

                <div className="nchm-q-body">
                   <p className="nchm-q-text">{q.text}</p>
                   <div style={{display:'grid', gap:'16px'}}>
                      {q.opts.map((opt, i) => (
                        <div 
                          key={i}
                          onClick={() => setUserAnswers(prev => ({...prev, [currentIdx]: i}))}
                          className={`nchm-opt ${userAnswers[currentIdx] === i ? 'selected' : ''}`}
                        >
                           <div style={{
                             width:'24px', height:'24px', borderRadius:'101%', border:'2px solid #cbd5e1', 
                             display:'flex', alignItems:'center', justifyContent:'center', marginRight:'16px', flexShrink: 0,
                             background: userAnswers[currentIdx] === i ? '#2563eb' : 'transparent',
                             borderColor: userAnswers[currentIdx] === i ? '#2563eb' : '#cbd5e1',
                             color: userAnswers[currentIdx] === i ? 'white' : '#64748b',
                             fontSize:'10px', fontWeight:'700'
                           }}>
                              {String.fromCharCode(65+i)}
                           </div>
                           <span style={{fontSize:'1rem', fontWeight:'500', color:'#0f172a'}}>{opt}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="nchm-q-footer">
                   <div className="nchm-action-btns">
                      <button 
                        onClick={() => setFlags(prev => ({...prev, [currentIdx]: !prev[currentIdx]}))}
                        className={`nchm-btn-flag ${flags[currentIdx] ? 'active' : ''}`}
                      >
                        {flags[currentIdx] ? 'Flagged' : 'Flag for Review'}
                      </button>
                      <button 
                        onClick={() => setUserAnswers(prev => {
                          const n = {...prev};
                          delete n[currentIdx];
                          return n;
                        })}
                        className="nchm-btn-clear"
                      >
                        Clear Response
                      </button>
                   </div>
                   <div className="nchm-nav-btns">
                       <button 
                         disabled={currentIdx === 0}
                         onClick={() => setCurrentIdx(c => c - 1)}
                         className="nchm-btn-prev"
                         style={{opacity: currentIdx === 0 ? 0.3 : 1}}
                       >
                         Previous
                       </button>
                       <button 
                         onClick={() => {
                           if (currentIdx === quizQuestions.length - 1) finishQuiz();
                           else setCurrentIdx(c => c + 1);
                         }}
                         className="nchm-btn-next"
                       >
                         {currentIdx === quizQuestions.length - 1 ? 'Save & Submit' : 'Save & Next'}
                       </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!quizResult) return null;
    const res = quizResult;
    return (
      <div className="nchm-cbt-overlay" style={{overflowY:'auto'}}>
        <div className="nchm-topbar" style={{position:'sticky', top:0, zIndex:10}}>
          <h2 style={{fontSize:'1.25rem', fontFamily:'var(--font-display)', color:'#0f172a'}}>Exam <span style={{color:'#10b981'}}>Report Card</span></h2>
          <button onClick={() => setPhase('dashboard')} className="nchm-btn-finish">Return to Dashboard</button>
        </div>

        <div style={{maxWidth:'900px', margin:'0 auto', padding:'48px 24px', width:'100%'}}>
           <div className="nchm-result-header">
              <div style={{
                display:'inline-block', padding:'6px 16px', borderRadius:'99px', fontSize:'10px', fontWeight:'700', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'32px',
                background: res.pct >= 50 ? '#dcfce7' : '#fee2e2',
                color: res.pct >= 50 ? '#15803d' : '#b91c1c'
              }}>
                Result Status: {res.pct >= 50 ? 'Exam Passed' : 'Exam Failed'}
              </div>

              <div className="nchm-score-circle">
                <svg width="180" height="180" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="58" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                  <circle 
                    cx="70" cy="70" r="58" fill="none" stroke={res.pct >= 50 ? '#10b981' : '#ef4444'} 
                    strokeWidth="12" strokeDasharray="364.42" 
                    strokeDashoffset={364.42 * (1 - res.pct / 100)} 
                    strokeLinecap="round" style={{transition:'stroke-dashoffset 1s ease-out'}}
                  />
                </svg>
                <div style={{position:'absolute', display:'flex', flexDirection:'column', alignItems:'center'}}>
                   <span style={{fontSize:'3rem', fontWeight:'700', fontFamily:'var(--font-display)', color:'#0f172a'}}>{res.pct}%</span>
                   <span style={{fontSize:'9px', fontWeight:'700', color:'#94a3b8', textTransform:'uppercase'}}>Aggregate</span>
                </div>
              </div>

              <h3 style={{fontSize:'2.5rem', fontFamily:'var(--font-display)', marginBottom:'8px', color:'#0f172a'}}>{examData.title} <span style={{color:'#10b981'}}>Practice Session</span></h3>
              <p style={{color:'#64748b'}}>Session completed on {new Date().toLocaleDateString()}</p>
           </div>

           <div className="nchm-tile-grid">
              <div className="result-tile">
                <div className="result-val" style={{color:'#10b981', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'}}>
                  <CheckCircle size={20} /> {res.correct}
                </div>
                <div className="result-lbl">Correct</div>
              </div>
              <div className="result-tile">
                <div className="result-val" style={{color:'#ef4444', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'}}>
                  <XCircle size={20} /> {res.attempted - res.correct}
                </div>
                <div className="result-lbl">Wrong</div>
              </div>
              <div className="result-tile">
                <div className="result-val" style={{color:'#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'}}>
                  <MinusCircle size={20} /> {res.total - res.attempted}
                </div>
                <div className="result-lbl">Skipped</div>
              </div>
              <div className="result-tile">
                <div className="result-val" style={{color:'#2563eb', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'}}>
                  <Award size={20} /> {res.scoredMarks} / {res.totalMarks}
                </div>
                <div className="result-lbl">Marks</div>
              </div>
              <div className="result-tile">
                <div className="result-val" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <ClipboardList size={20} color="#10B981" /> {res.attempted}
                </div>
                <div className="result-lbl">Attempted</div>
              </div>
              <div className="result-tile">
                <div className="result-val" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <FileText size={20} color="#10B981" /> {res.total}
                </div>
                <div className="result-lbl">Total Qs</div>
              </div>
           </div>

           <div className="nchm-review-box">
              <div className="nchm-review-head">Review Your Answers</div>
              <div>
                 {quizQuestions.map((q, i) => {
                    const status = userAnswers[i] === undefined ? 'skipped' : userAnswers[i] === q.ans ? 'correct' : 'wrong';
                    return (
                        <div key={i} className="nchm-review-q">
                           <div style={{display:'flex', gap:'16px', marginBottom:'24px'}}>
                              <span style={{
                                width:'32px', height:'32px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', flexShrink: 0,
                                background: status === 'correct' ? '#dcfce7' : status === 'wrong' ? '#fee2e2' : '#f1f5f9',
                                color: status === 'correct' ? '#15803d' : status === 'wrong' ? '#b91c1c' : '#64748b'
                              }}>
                                 {i + 1}
                              </span>
                              <p style={{fontSize:'1.1rem', fontWeight:'500', lineHeight:'1.5', color:'#0f172a'}}>{q.text}</p>
                           </div>
                           <div style={{marginLeft:'48px', display:'grid', gap:'12px'}}>
                              <div style={{padding:'16px', borderRadius:'12px', border:'2px solid', display:'flex', justifyContent:'space-between', alignItems:'center',
                                borderColor: status === 'correct' ? '#10b981' : status === 'wrong' ? '#ef4444' : '#e2e8f0',
                                background: status === 'correct' ? '#f0fdf4' : status === 'wrong' ? '#fef2f2' : '#f8fafc',
                                color: status === 'correct' ? '#15803d' : status === 'wrong' ? '#b91c1c' : '#94a3b8'
                              }}>
                                 <span style={{fontWeight:'600'}}>{userAnswers[i] !== undefined ? q.opts[userAnswers[i]] : 'No selection made'}</span>
                                 <span>{status === 'correct' ? '✓ Correct' : status === 'wrong' ? '✗ Incorrect' : '• Skipped'}</span>
                              </div>
                              {status !== 'correct' && (
                                <div style={{padding:'16px', borderRadius:'12px', background:'#f0fdf4', border:'1px solid #dcfce7', color:'#15803d'}}>
                                  <span style={{fontSize:'10px', fontWeight:'700', textTransform:'uppercase', display:'block', marginBottom:'4px'}}>Correct Answer:</span>
                                  <span style={{fontWeight:'600'}}>{q.opts[q.ans]}</span>
                                </div>
                              )}
                           </div>
                        </div>
                    );
                 })}
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{minHeight:'100vh', background:'#050505', color:'white', paddingTop:'80px'}}>
      <SEO 
        title={`${selectedExam ? selectedExam.toUpperCase() : 'NCHMCT'} Professional Academic Hub`}
        description="The definitive study portal for hotel management aspirants. Access comprehensive NCHMCT JEE and NHTET resources, including previous year papers, study guides, and simulated CBT mock exams."
      />
      <AnimatePresence mode="wait">
        {phase === 'select-exam' && renderSelection()}
        {phase === 'dashboard' && renderDashboard()}
        {phase === 'mock-test' && renderCBT()}
        {phase === 'results' && renderResults()}
      </AnimatePresence>
    </div>
  );
};

export default NCHMCTPage;
