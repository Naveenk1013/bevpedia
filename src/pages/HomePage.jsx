import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Martini, 
  CupSoda, 
  Wine, 
  Beer, 
  ChefHat, 
  BookText, 
  GraduationCap, 
  Sparkles, 
  Trophy, 
  Gem, 
  School,
  CheckSquare,
  Droplets,
  PenTool,
  Library,
  ChefHat as FoodIcon
} from 'lucide-react';
import LightPillar from '../components/LightPillar';
import ShinyText from '../components/ShinyText';
import ContributorsMarquee from '../components/ContributorsMarquee';

const CATEGORY_CARDS = [
  { icon: Martini, name: 'Cocktails', path: '/beverages?cat=cocktail', count: '150+', colour: '#7c5cfc', desc: 'Classic & modern cocktail recipes' },
  { icon: CupSoda, name: 'Mocktails', path: '/beverages?cat=mocktail', count: '20+', colour: '#30c88a', desc: 'Non-alcoholic beverages' },
  { icon: Droplets, name: 'Spirits', path: '/spirits', count: '20+', colour: '#c9963a', desc: 'Vodka, gin, rum, whisky & more' },
  { icon: Wine, name: 'Wine', path: '/wine', count: '15+', colour: '#c0407a', desc: 'Red, white, rosé, sparkling, fortified' },
  { icon: Beer, name: 'Beer', path: '/beer', count: '12+', colour: '#d97b30', desc: 'Ales, lagers, stouts, IPAs & sours' },
  { icon: ChefHat, name: 'Techniques', path: '/techniques', count: '15', colour: '#3a9fd6', desc: 'Professional bartending methods' },
  { icon: BookText, name: 'Glossary', path: '/glossary', count: '80+', colour: '#8891a4', desc: 'A–Z bar & beverage terminology' },
  { icon: 'https://nchm.gov.in/themes/nchmct/images/logo.png', name: 'NCHMCT', path: '/nchmct', count: 'JEE/NHTET', colour: '#30c88a', desc: 'Academic guidance & mock testing' },
  { icon: Library, name: 'Student Hub', path: '/students', count: 'New', colour: '#c9963a', desc: 'Global syllabus & academic notes' },
  { icon: FoodIcon, name: 'Food Production', path: '/food-production', count: 'Library', colour: '#f59e0b', desc: 'Practical video gallery & study material' },
  { icon: PenTool, name: 'Scholar Notebook', path: '/notebook', count: 'Tool', colour: '#06b6d4', desc: 'Architect academic research & reports' },
  { icon: Sparkles, name: 'SATHI AI', path: '/sathi', count: '24/7 AI', colour: '#f0a113', desc: 'Interactive holographic beverage expert & study companion' },
  { icon: GraduationCap, name: 'Quiz', path: '/quiz', count: '20 Qs', colour: '#e05c5c', desc: 'Test your beverage knowledge' },
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
        
        <div className="hero-badge" style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GraduationCap size={16} color="var(--clr-accent)" />
          <ShinyText
            text="For Hotel Management & Bar Professionals"
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
          <button className="btn btn-primary" onClick={() => navigate('/beverages')} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <Martini size={20} /> Explore Beverages
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/quiz')} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <CheckSquare size={20} /> Take the Quiz
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
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div className="hero-marquee-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={16} className="text-gradient" />
                  <ShinyText text="NEW: WSET Mock examination now available!" speed={3} color="var(--clr-text)" shineColor="var(--clr-accent)" />
                </div>
                <div className="hero-marquee-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <GraduationCap size={16} className="text-gradient" />
                  <ShinyText text="NHTET CBT Mock test available now" speed={3} color="var(--clr-text)" shineColor="var(--clr-accent)" />
                </div>
                <div className="hero-marquee-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Trophy size={16} className="text-gradient" />
                  <ShinyText text="NCHMCT JEE 2024 Official Paper and CBT Mock test available now" speed={3} color="var(--clr-text)" shineColor="var(--clr-accent)" />
                </div>
              </div>
            ))}
          </div>
        </Link>
      </section>

      {/* ── Contributors Spotlight (Temporary) ── */}
      <ContributorsMarquee />

      <section className="sponsorship-preview" style={{ 
        padding: '3rem 0 0 0', 
        background: 'linear-gradient(90deg, rgba(124, 92, 252, 0.05), rgba(48, 200, 138, 0.05))',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="container" style={{ marginBottom: '3rem' }}>
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
              <div style={{ color: '#30c88a', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.5rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gem size={14} /> GLOBAL INDUSTRY SOLUTIONS
              </div>
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
                style={{ background: '#30c88a', padding: '1rem 2.5rem', fontWeight: 'bold', boxShadow: '0 0 20px rgba(48, 200, 138, 0.2)', width: '100%', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}
              >
                <Trophy size={18} /> Sponsor & Fund
              </button>
            </div>
          </div>
        </div>

        <Link to="/sponsors" className="hero-marquee-wrapper" style={{ position: 'relative', textDecoration: 'none', cursor: 'pointer', display: 'block', borderTop: '1px solid rgba(48, 200, 138, 0.1)', background: 'rgba(0,0,0,0.2)' }}>
          <div className="hero-marquee-content">
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div className="hero-marquee-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Gem size={16} className="text-gradient" style={{ color: '#30c88a' }} />
                  <ShinyText text="Be a part of Bevpedia and give yourself a chance to be highlighted!" speed={3} color="var(--clr-text)" shineColor="#30c88a" />
                </div>
                <div className="hero-marquee-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={16} className="text-gradient" style={{ color: '#30c88a' }} />
                  <ShinyText text="Want your brand recognized? Run your ads and products here." speed={3} color="var(--clr-text)" shineColor="#30c88a" />
                </div>
                <div className="hero-marquee-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Trophy size={16} className="text-gradient" style={{ color: '#30c88a' }} />
                  <ShinyText text="Your niche is here! Our sponsors get the special place they deserve." speed={3} color="var(--clr-text)" shineColor="#30c88a" />
                </div>
              </div>
            ))}
          </div>
        </Link>
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
            {CATEGORY_CARDS.map(cat => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.name}
                  className="cat-card animate-fade-up"
                  onClick={() => navigate(cat.path)}
                  style={{ '--cat-colour': cat.colour }}
                >
                  <div className="cat-card-icon">
                    {typeof IconComponent === 'string' ? (
                      <img src={IconComponent} alt={cat.name} style={{ height: '2.5rem', margin: '0 auto', objectFit: 'contain' }} />
                    ) : (
                      <IconComponent size={32} strokeWidth={1.5} color={cat.colour} />
                    )}
                  </div>
                  <div className="cat-card-name" style={{ color: cat.colour }}>{cat.name}</div>
                  <div className="cat-card-count text-muted">
                    {cat.count}{(!isNaN(parseInt(cat.count)) || cat.count.includes('+')) && ' entries'}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', marginTop: '6px' }}>{cat.desc}</p>
                </button>
              );
            })}
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
              <div style={{ color: 'var(--clr-accent)', background: 'rgba(124, 92, 252, 0.1)', padding: '1rem', borderRadius: '15px' }}>
                <School size={32} />
              </div>
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
