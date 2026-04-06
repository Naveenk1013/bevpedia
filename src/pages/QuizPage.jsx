import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizQuestions } from '../data/index.js';
import SEO from '../components/SEO';

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

const QUIZ_LENGTH = 10;
const CATEGORIES = ['All', 'cocktails', 'spirits', 'wine', 'beer', 'techniques', 'glossary'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Expert'];
const LIMITS = [5, 10, 15, 20];

export default function QuizPage() {
  const [catFilter, setCatFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [questionLimit, setQuestionLimit] = useState(10);
  
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const startQuiz = () => {
    let pool = quizQuestions;
    if (catFilter !== 'All') pool = pool.filter(q => q.category === catFilter);
    if (levelFilter !== 'All') pool = pool.filter(q => q.level === levelFilter);
    
    // Fallback if no questions match the specific combo
    if (pool.length === 0) {
      alert("No questions found for this specific combination! Starting with default categories.");
      pool = quizQuestions;
    }

    const shuffled = shuffle(pool).slice(0, Math.min(questionLimit, pool.length));
    setQuestions(shuffled);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setStarted(true);
  };

  const handleAnswer = (opt) => {
    if (selected) return;
    setSelected(opt);
    const correct = opt === questions[current].a;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { q: questions[current].q, chosen: opt, correct: questions[current].a, right: correct }]);
    setTimeout(() => {
      if (current + 1 >= questions.length) { setFinished(true); }
      else { setCurrent(c => c + 1); setSelected(null); }
    }, 1200);
  };

  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const grade = pct >= 90 ? '🏆 Excellent!' : pct >= 70 ? '🎓 Well Done!' : pct >= 50 ? '📚 Keep Studying' : '🍹 Keep Practising';

  if (!started) {
    return (
      <div className="quiz-wrapper">
        <SEO 
          title="Custom Beverage Quiz" 
          description="Test your knowledge of cocktails, spirits, wine, beer, and bar techniques. Personalize your quiz by difficulty and category to master the art of the bar."
        />
        <div className="page-hero" style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h1>🎓 Custom Beverage Quiz</h1>
          <p className="page-hero-subtitle">Scale your knowledge at your own pace. Personalize your session below.</p>
          
          <Link to="/wset" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '1.5rem',
            padding: '12px 20px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '12px',
            color: '#D4AF37',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }} className="wset-cta">
            🎓 Preparing for WSET? View the Guide →
          </Link>
        </div>

        <div className="quiz-score-card animate-fade-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: '2rem', textAlign: 'left' }}>
            
            {/* Limit Selector */}
            <section>
              <h3 style={{ marginBottom: '1rem', opacity: 0.9 }}>1. Question Count</h3>
              <div className="filter-bar" style={{ flexWrap: 'wrap' }}>
                {LIMITS.map(l => (
                  <button key={l} className={`filter-pill ${questionLimit === l ? 'active' : ''}`} onClick={() => setQuestionLimit(l)}>
                    {l} Questions
                  </button>
                ))}
              </div>
            </section>

            {/* Level Selector */}
            <section>
              <h3 style={{ marginBottom: '1rem', opacity: 0.9 }}>2. Difficulty Level</h3>
              <div className="filter-bar" style={{ flexWrap: 'wrap' }}>
                {LEVELS.map(l => (
                  <button key={l} className={`filter-pill ${levelFilter === l ? 'active' : ''}`} onClick={() => setLevelFilter(l)}>
                    {l}
                  </button>
                ))}
              </div>
            </section>

            {/* Category Selector */}
            <section>
              <h3 style={{ marginBottom: '1rem', opacity: 0.9 }}>3. Knowledge Area</h3>
              <div className="filter-bar" style={{ flexWrap: 'wrap' }}>
                {CATEGORIES.map(c => (
                  <button key={c} className={`filter-pill ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            </section>

            <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid var(--clr-border)' }}>
              <button 
                className="btn btn-primary" 
                style={{ fontSize: '1.25rem', padding: '1rem 4rem' }} 
                onClick={startQuiz}
              >
                Let's Go! 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="quiz-wrapper">
        <div className="quiz-score-card animate-fade-up">
          <div className="quiz-score-num">{score}/{questions.length}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', margin: '0.5rem 0' }}>{grade}</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>You completed a {levelFilter} {catFilter} quiz.</p>
          <div style={{ background: 'var(--clr-surface2)', borderRadius: 'var(--radius-md)', height: '12px', marginBottom: '2rem', overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: pct >= 70 ? 'var(--clr-accent3)' : 'var(--clr-accent)', borderRadius: 'var(--radius-full)', transition: 'width 1s ease' }} />
          </div>

          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Review Your Answers</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
              {answers.map((a, i) => (
                <div key={i} style={{ marginBottom: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: a.right ? 'rgba(48,200,138,0.08)' : 'rgba(224,92,92,0.07)', border: `1px solid ${a.right ? 'var(--clr-accent3)' : 'var(--clr-danger)'}22` }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{a.right ? '✅' : '❌'} {a.q}</p>
                  {!a.right && <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', marginTop: '2px' }}>Correct: <strong>{a.correct}</strong></p>}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={startQuiz}>Try Again 🔄</button>
            <button className="btn btn-outline" onClick={() => setStarted(false)}>Configure New Quiz</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div className="quiz-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span className="text-muted" style={{ fontSize: '0.85rem' }}>Question {current + 1} of {questions.length}</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.05)' }}>{q.level}</span>
          <span className="badge badge-cocktail">{q.category}</span>
        </div>
      </div>
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <h2 className="quiz-question animate-fade-up">{q.q}</h2>
      <div className="quiz-options">
        {q.options?.map(opt => {
          let cls = 'quiz-option';
          if (selected) {
            if (opt === q.a) cls += ' correct';
            else if (opt === selected && opt !== q.a) cls += ' wrong';
          }
          return (
            <button key={opt} className={cls} onClick={() => handleAnswer(opt)} disabled={!!selected}>
              {opt}
            </button>
          );
        })}
      </div>
      {selected && (
        <p className="animate-fade-in" style={{ marginTop: '1rem', textAlign: 'center', padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--clr-surface2)', color: selected === q.a ? 'var(--clr-accent3)' : 'var(--clr-danger)', fontWeight: 600 }}>
          {selected === q.a ? '✅ Correct!' : `❌ The correct answer is: ${q.a}`}
        </p>
      )}
    </div>
  );
}
