import { useState, useMemo } from 'react';
import { wines } from '../data/wines.js';
import BeverageModal from '../components/BeverageModal';
import WineRegionMap from '../components/wine/WineRegionMap';
import { Globe } from 'lucide-react';

const WINE_TYPES = ['all', 'red', 'white', 'rosé', 'sparkling', 'fortified'];
const TYPE_ICONS = { red:'🍷', white:'🥂', rosé:'🌸', sparkling:'✨', fortified:'🍾', all:'🍷' };
const TYPE_COLOURS = { red:'#c0407a', white:'#c9963a', rosé:'#e8607a', sparkling:'#7c5cfc', fortified:'#d97b30' };

export default function WinePage({ toggleFavourite, isFavourite }) {
  const [type, setType] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => wines.filter(w =>
    (type === 'all' || w.type === type) &&
    (!query || w.name.toLowerCase().includes(query.toLowerCase()) || w.origin.toLowerCase().includes(query.toLowerCase()) || w.grapeVariety.toLowerCase().includes(query.toLowerCase()))
  ), [type, query]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="page-hero" style={{ textAlign: 'left', paddingLeft: 0 }}>
        <h1>🍷 Wine Guide</h1>
        <p className="page-hero-subtitle">Red, white, rosé, sparkling & fortified — grape varieties, regions, tasting notes, food pairing &amp; winemaking.</p>

        <div className="fact-box" style={{ marginTop: '1.5rem', background: 'var(--clr-surface)', borderColor: 'var(--clr-border)', color: 'var(--clr-text)', textAlign: 'left' }}>
          <p style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.25rem'}}><strong>Wine</strong> <span className="text-muted" style={{fontSize: '0.9rem'}}>noun</span></p>
          <p style={{fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--clr-text-muted)'}}>
            "An alcoholic drink made from fermented grape juice." <br/>
            — <strong>Oxford English Dictionary</strong>
          </p>
          <p style={{fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--clr-text-muted)', marginTop: '0.5rem'}}>
            "The product obtained exclusively from the total or partial alcoholic fermentation of fresh grapes, whether or not crushed, or of grape must." <br/>
            — <strong>International Organisation of Vine and Wine (OIV)</strong>
          </p>
        </div>
      </div>

      {/* Global Terroir Map Section */}
      <section className="animate-fade-up" style={{ marginBottom: '3rem' }}>
        <div className="section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span className="section-eyebrow">Interactive Exploration</span>
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe className="text-accent" /> Global Wine Regions
            </h2>
            <p className="section-subtitle">Navigate the world's most prestigious terroirs. Discover coordinates, soil types, and climate profiles in real-time.</p>
          </div>
          <div className="text-muted" style={{ fontSize: '0.8rem', textAlign: 'right' }}>
            Powered by <strong>mapcn</strong>
          </div>
        </div>
        <WineRegionMap />
      </section>
      
      {/* Partner Banner */}
      <a 
        href="https://wofw.netlify.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="wine-partner-banner animate-fade-up"
        style={{
          display: 'block',
          textDecoration: 'none',
          marginTop: '1.5rem',
          marginBottom: '2rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #c0407a 0%, #722f37 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(192, 64, 122, 0.25)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🌍</span>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'white', fontFamily: 'var(--font-display)' }}>World of Wine</h2>
          </div>
          <p style={{ margin: 0, opacity: 0.95, lineHeight: '1.5', fontSize: '0.95rem', maxWidth: '600px' }}>
            Dive deep into wine and the world of wines with interactive and in-depth detailed oriented content.
          </p>
          <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px' }}>
            Explore Now ↗
          </div>
        </div>
        {/* Decorative background element */}
        <div style={{ 
          position: 'absolute', 
          right: '-20px', 
          bottom: '-20px', 
          fontSize: '8rem', 
          opacity: 0.1, 
          transform: 'rotate(-15deg)',
          pointerEvents: 'none'
        }}>🍷</div>
      </a>

      {/* Wine type tabs */}
      <div className="filter-bar">
        {WINE_TYPES.map(t => (
          <button key={t} className={`filter-pill ${type === t ? 'active' : ''}`} onClick={() => setType(t)}>
            {TYPE_ICONS[t]} {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="search-wrapper" style={{ marginBottom: '1rem' }}>
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search by grape, region, or name…" value={query} onChange={e => setQuery(e.target.value)} aria-label="Search wines" />
      </div>
      <p className="text-muted" style={{ marginBottom: '1.25rem' }}>Showing {filtered.length} of {wines.length} entries</p>

      <div className="card-grid">
        {filtered.map(wine => (
          <article
            key={wine.id}
            className="detail-card animate-fade-up"
            style={{ cursor: 'pointer', borderTop: `3px solid ${TYPE_COLOURS[wine.type] || 'var(--clr-accent)'}` }}
            onClick={() => setSelected(wine)}
          >
            <div className="detail-card-header" style={{ paddingBottom: '1rem' }}>
              <div>
                <span className="badge" style={{ background: `${TYPE_COLOURS[wine.type]}20`, color: TYPE_COLOURS[wine.type], marginBottom: '6px', display: 'inline-flex' }}>
                  {TYPE_ICONS[wine.type]} {wine.type}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)' }}>{wine.name}</h3>
                <p className="text-muted" style={{ fontSize: '0.82rem', marginTop: '2px' }}>🍇 {wine.grapeVariety}</p>
                <p className="text-muted" style={{ fontSize: '0.82rem' }}>📍 {wine.origin}</p>
              </div>
              <button
                className={`fav-btn ${isFavourite(wine.id) ? 'active' : ''}`}
                style={{ position: 'static', opacity: 1 }}
                onClick={e => { e.stopPropagation(); toggleFavourite(wine.id); }}
              >{isFavourite(wine.id) ? '❤️' : '🤍'}</button>
            </div>
            <div className="detail-card-body" style={{ paddingTop: 0 }}>
              <div className="detail-meta">
                <div className="detail-meta-item"><div className="detail-meta-label">ABV</div><div className="detail-meta-value">{wine.abv}</div></div>
                <div className="detail-meta-item"><div className="detail-meta-label">Serve at</div><div className="detail-meta-value">{wine.servingTemp}</div></div>
                <div className="detail-meta-item"><div className="detail-meta-label">Glass</div><div className="detail-meta-value" style={{ fontSize: '0.72rem' }}>{wine.glassType}</div></div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)', lineHeight: '1.6', marginTop: '0.5rem' }}>
                {wine.tastingNotes?.substring(0, 110)}…
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)', marginTop: '0.5rem' }}>
                🍽️ {wine.foodPairing?.substring(0, 70)}…
              </p>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <BeverageModal item={selected} onClose={() => setSelected(null)} toggleFavourite={toggleFavourite} isFavourite={isFavourite} />
      )}
    </div>
  );
}
