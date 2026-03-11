import { useState, useEffect } from 'react';
import { quizQuestions } from '../data/index.js';

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

const QUIZ_LENGTH = 10;
const CATEGORIES = ['All', 'cocktails', 'spirits', 'wine', 'beer', 'techniques', 'glossary'];

export default function QuizPage() {
  const [catFilter, setCatFilter] = useState('All');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const startQuiz = () => {
    const pool = catFilter === 'All' ? quizQuestions : quizQuestions.filter(q => q.category === catFilter);
    const shuffled = shuffle(pool).slice(0, Math.min(QUIZ_LENGTH, pool.length));
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
        <div className="page-hero" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h1>🎓 Beverage Quiz</h1>
          <p className="page-hero-subtitle">Test your knowledge of cocktails, spirits, wine, beer, techniques and terminology.</p>
        </div>
        <div className="quiz-score-card">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍸</div>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>Ready to Test Yourself?</h2>
          <p style={{ color: 'var(--clr-text-muted)', marginBottom: '1.5rem' }}>
            Choose a category, or select "All" for a mixed quiz covering all beverage topics.
          </p>
          <div className="filter-bar" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
            {CATEGORIES.map(c => (
              <button key={c} className={`filter-pill ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
            {catFilter === 'All' ? quizQuestions.length : quizQuestions.filter(q => q.category === catFilter).length} questions available. Quiz is {QUIZ_LENGTH} questions.
          </p>
          <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem' }} onClick={startQuiz}>
            Start Quiz 🚀
          </button>
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
          <p className="text-muted" style={{ marginBottom: '2rem' }}>You scored {pct}%</p>
          <div style={{ background: 'var(--clr-surface2)', borderRadius: 'var(--radius-md)', height: '12px', marginBottom: '2rem', overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: pct >= 70 ? 'var(--clr-accent3)' : 'var(--clr-accent)', borderRadius: 'var(--radius-full)', transition: 'width 1s ease' }} />
          </div>

          {/* Answer Review */}
          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Review Your Answers</h3>
            {answers.map((a, i) => (
              <div key={i} style={{ marginBottom: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: a.right ? 'rgba(48,200,138,0.08)' : 'rgba(224,92,92,0.07)', border: `1px solid ${a.right ? 'var(--clr-accent3)' : 'var(--clr-danger)'}22` }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{a.right ? '✅' : '❌'} {a.q}</p>
                {!a.right && <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', marginTop: '2px' }}>Correct: <strong>{a.correct}</strong></p>}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={startQuiz}>Try Again 🔄</button>
            <button className="btn btn-outline" onClick={() => setStarted(false)}>Change Category</button>
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
        <span className="badge badge-cocktail">{q.category}</span>
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
        <p style={{ marginTop: '1rem', textAlign: 'center', color: selected === q.a ? 'var(--clr-accent3)' : 'var(--clr-danger)', fontWeight: 600 }}>
          {selected === q.a ? '✅ Correct!' : `❌ The answer is: ${q.a}`}
        </p>
      )}
    </div>
  );
}
