import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CATEGORY_CARDS = [
  { icon: '🍸', name: 'Cocktails', path: '/beverages?cat=cocktail', count: '50+', colour: '#7c5cfc', desc: 'Classic & modern cocktail recipes' },
  { icon: '🥤', name: 'Mocktails', path: '/beverages?cat=mocktail', count: '20+', colour: '#30c88a', desc: 'Non-alcoholic beverages' },
  { icon: '🥃', name: 'Spirits', path: '/spirits', count: '20+', colour: '#c9963a', desc: 'Vodka, gin, rum, whisky & more' },
  { icon: '🍷', name: 'Wine', path: '/wine', count: '15+', colour: '#c0407a', desc: 'Red, white, rosé, sparkling, fortified' },
  { icon: '🍺', name: 'Beer', path: '/beer', count: '12+', colour: '#d97b30', desc: 'Ales, lagers, stouts, IPAs & sours' },
  { icon: '🔪', name: 'Techniques', path: '/techniques', count: '15', colour: '#3a9fd6', desc: 'Professional bartending methods' },
  { icon: '📖', name: 'Glossary', path: '/glossary', count: '80+', colour: '#8891a4', desc: 'A–Z bar & beverage terminology' },
  { icon: '🎓', name: 'Quiz', path: '/quiz', count: '20 Qs', colour: '#e05c5c', desc: 'Test your beverage knowledge' },
];

const FUN_FACTS = [
  'Champagne contains approximately 49 million bubbles per bottle — the pressure is 3× a car tyre.',
  'The word "cocktail" was first defined in print in 1806 in a New York newspaper.',
  'Tequila can only be produced in 5 Mexican states — Jalisco is the most famous.',
  'Absinthe was banned in most of Europe for nearly 100 years, based on exaggerated fears.',
  'A single Champagne cork travels at ~40 km/h when it leaves the bottle.',
  'Japan\'s whisky regulations only came into effect in 2021.',
  'Navy sailors in the British Royal Navy received a daily rum ration until July 31, 1970 — "Black Tot Day."',
  'The Negroni was invented in Florence in 1919 by Count Camillo Negroni.',
  'Lambic beer is still brewed today using wild fermentation — open to Brussels night air.',
  'Pilsner Urquell (1842) was the world\'s first clear, pale lager — revolutionary when dark beers dominated.',
];

export default function HomePage() {
  const navigate = useNavigate();
  const [factIdx, setFactIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFactIdx(i => (i + 1) % FUN_FACTS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-badge">🎓 For Hotel Management & Bar Professionals</div>
        <h1 className="hero-title animate-fade-up">
          The Complete<br /><span>Beverage Encyclopedia</span>
        </h1>
        <p className="hero-subtitle animate-fade-up">
          Your definitive reference for cocktails, mocktails, spirits, wine, beer, bartending
          techniques and professional terminology — all in one place.
        </p>
        <div className="hero-actions animate-fade-up">
          <button className="btn btn-primary" onClick={() => navigate('/beverages')}>
            🍹 Explore Beverages
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/quiz')}>
            🎓 Take the Quiz
          </button>
        </div>
        <div className="hero-stats animate-fade-in">
          {[
            { n: '130+', l: 'Beverages' },
            { n: '20+', l: 'Categories' },
            { n: '80+', l: 'Glossary Terms' },
            { n: '15', l: 'Techniques' },
          ].map(s => (
            <div key={s.l} className="hero-stat">
              <div className="hero-stat-number">{s.n}</div>
              <div className="hero-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fun Fact ── */}
      <div className="container">
        <div className="facts-ticker">
          <span key={factIdx} className="animate-fade-in">{FUN_FACTS[factIdx]}</span>
        </div>

        {/* ── Category Cards ── */}
        <section className="section">
          <div className="section-header">
            <div className="section-eyebrow">Explore</div>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">From classic cocktails to fine wines — everything a hospitality professional needs to know.</p>
          </div>
          <div className="category-grid">
            {CATEGORY_CARDS.map(cat => (
              <button
                key={cat.name}
                className="cat-card animate-fade-up"
                onClick={() => navigate(cat.path)}
                style={{ '--cat-colour': cat.colour }}
              >
                <div className="cat-card-icon">{cat.icon}</div>
                <div className="cat-card-name" style={{ color: cat.colour }}>{cat.name}</div>
                <div className="cat-card-count text-muted">{cat.count} entries</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', marginTop: '6px' }}>{cat.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* ── Quick Academic Note ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="detail-card">
            <div className="detail-card-header">
              <div>
                <div className="section-eyebrow">Academic Resource</div>
                <h3 style={{ fontFamily: 'var(--font-display)' }}>Designed for Hospitality Education</h3>
              </div>
              <span style={{ fontSize: '2.5rem' }}>🏨</span>
            </div>
            <div className="detail-card-body">
              <p style={{ color: 'var(--clr-text-muted)', lineHeight: '1.7' }}>
                This encyclopedia is built specifically for <strong>hotel management students</strong>, <strong>bar aspirants</strong>,
                <strong> sommeliers</strong>, <strong>WSET learners</strong>, and <strong>hospitality faculty</strong>.
                Each entry includes encyclopedic history, production methods, serving guidelines, food pairings, and professional notes — 
                everything you need for coursework, examinations, and professional service.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => navigate('/techniques')}>View Techniques</button>
                <button className="btn btn-outline" onClick={() => navigate('/glossary')}>Glossary A–Z</button>
                <button className="btn btn-outline" onClick={() => navigate('/quiz')}>Practice Quiz</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
