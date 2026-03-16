import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LightPillar from '../components/LightPillar';
import ShinyText from '../components/ShinyText';

const CATEGORY_CARDS = [
  { icon: '🍸', name: 'Cocktails', path: '/beverages?cat=cocktail', count: '50+', colour: '#7c5cfc', desc: 'Classic & modern cocktail recipes' },
  { icon: '🥤', name: 'Mocktails', path: '/beverages?cat=mocktail', count: '20+', colour: '#30c88a', desc: 'Non-alcoholic beverages' },
  { icon: '🥃', name: 'Spirits', path: '/spirits', count: '20+', colour: '#c9963a', desc: 'Vodka, gin, rum, whisky & more' },
  { icon: '🍷', name: 'Wine', path: '/wine', count: '15+', colour: '#c0407a', desc: 'Red, white, rosé, sparkling, fortified' },
  { icon: '🍺', name: 'Beer', path: '/beer', count: '12+', colour: '#d97b30', desc: 'Ales, lagers, stouts, IPAs & sours' },
  { icon: '🔪', name: 'Techniques', path: '/techniques', count: '15', colour: '#3a9fd6', desc: 'Professional bartending methods' },
  { icon: '📖', name: 'Glossary', path: '/glossary', count: '80+', colour: '#8891a4', desc: 'A–Z bar & beverage terminology' },
  { icon: '🏛️', name: 'NCHMCT', path: '/nchmct', count: 'JEE/NHTET', colour: '#30c88a', desc: 'Academic guidance & mock testing' },
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
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.6 }}>
          <LightPillar
            topColor="#3a1b99"
            bottomColor="#850980"
            intensity={1.0}
            rotationSpeed={0.3}
            glowAmount={0.001}
            pillarWidth={3.5}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="lighten"
            quality="high"
          />
        </div>
        <div className="hero-bg" style={{ zIndex: 1, position: 'absolute', background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 15, 0.8) 100%)' }} />
        
        <div className="hero-badge" style={{ position: 'relative', zIndex: 2 }}>
          <ShinyText
            text="🎓 For Hotel Management & Bar Professionals"
            speed={3}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={true}
            pauseOnHover={false}
            disabled={false}
          />
        </div>
        <h1 className="hero-title animate-fade-up" style={{ position: 'relative', zIndex: 2 }}>
          The Complete<br /><span>Beverage Encyclopedia</span>
        </h1>
        <p className="hero-subtitle animate-fade-up" style={{ position: 'relative', zIndex: 2 }}>
          Your definitive reference for cocktails, mocktails, spirits, wine, beer, bartending
          techniques and professional terminology — all in one place.
        </p>
        <div className="hero-actions animate-fade-up" style={{ position: 'relative', zIndex: 2 }}>
          <button className="btn btn-primary" onClick={() => navigate('/beverages')}>
            🍹 Explore Beverages
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/quiz')}>
            🎓 Take the Quiz
          </button>
        </div>
        <div className="hero-stats animate-fade-in" style={{ position: 'relative', zIndex: 2 }}>
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

        <Link to="/wset" className="hero-marquee-wrapper" style={{ textDecoration: 'none', cursor: 'pointer', display: 'block', marginTop: 'auto' }}>
          <div className="hero-marquee-content">
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: 'flex' }}>
                <div className="hero-marquee-item">
                  <ShinyText text="✨ NEW: WSET Mock examination now available!" speed={3} color="var(--clr-text)" shineColor="var(--clr-accent)" />
                </div>
                <div className="hero-marquee-item">
                  <ShinyText text="🎓 CAREER: Boost your career with professional certifications" speed={3} color="var(--clr-text)" shineColor="var(--clr-accent)" />
                </div>
                <div className="hero-marquee-item">
                  <ShinyText text="🏆 COMPETENCY: Test your knowledge in our professional CBT environment" speed={3} color="var(--clr-text)" shineColor="var(--clr-accent)" />
                </div>
              </div>
            ))}
          </div>
        </Link>
      </section>

      <section className="sponsorship-preview" style={{ 
        padding: '3rem 0', 
        background: 'linear-gradient(90deg, rgba(124, 92, 252, 0.05), rgba(48, 200, 138, 0.05))',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container">
          <div className="detail-card sponsorship-card" style={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '2.5rem 3rem',
            gap: '2rem',
            border: '1px solid rgba(48, 200, 138, 0.2)',
            background: 'rgba(48, 200, 138, 0.03)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <div className="sponsorship-content" style={{ maxWidth: '750px' }}>
              <div style={{ color: '#30c88a', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>GLOBAL INDUSTRY SOLUTIONS</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '1rem' }}>Support the Future of Beverage Education</h2>
              <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                We are bridging the hospitality talent gap with technology. Join us as a professional partner to support our 
                sustainability and gain exclusive access to our certified candidate pool.
              </p>
            </div>
            <div className="sponsorship-action" style={{ flexShrink: 0 }}>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate('/sponsors')}
                style={{ background: '#30c88a', padding: '1rem 2.5rem', fontWeight: 'bold', boxShadow: '0 0 20px rgba(48, 200, 138, 0.2)', width: '100%' }}
              >
                💎 Sponsor & Fund
              </button>
            </div>
          </div>
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
