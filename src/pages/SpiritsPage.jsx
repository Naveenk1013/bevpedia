import { useState, useMemo } from 'react';
import { spirits } from '../data/spirits.js';
import BeverageModal from '../components/BeverageModal';

const SUBTYPES = ['all', 'vodka', 'gin', 'rum', 'tequila', 'mezcal', 'whisky', 'whiskey', 'brandy', 'absinthe', 'liqueur'];

export default function SpiritsPage({ toggleFavourite, isFavourite }) {
  const [query, setQuery] = useState('');
  const [subtype, setSubtype] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => spirits.filter(s => {
    const matchType = subtype === 'all' || s.subtype === subtype;
    const matchQ = !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.origin.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQ;
  }), [query, subtype]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="page-hero" style={{ textAlign: 'left', paddingLeft: 0 }}>
        <h1>🥃 Spirits Encyclopedia</h1>
        <p className="page-hero-subtitle">
          Vodka, Gin, Rum, Tequila, Whisky, Brandy, Absinthe, Liqueurs — production methods, history & tasting notes.
        </p>

        <div className="fact-box" style={{ marginTop: '1.5rem', background: 'var(--clr-surface)', borderColor: 'var(--clr-border)', color: 'var(--clr-text)', textAlign: 'left' }}>
          <p style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.25rem'}}><strong>Spirit / Liquor</strong> <span className="text-muted" style={{fontSize: '0.9rem'}}>noun</span></p>
          <p style={{fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--clr-text-muted)'}}>
            "Strong alcoholic liquor produced by distillation, typically after fermentation." <br/>
            — <strong>Oxford English Dictionary</strong>
          </p>
          <p style={{fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--clr-text-muted)', marginTop: '0.5rem'}}>
            "An alcoholic beverage with an ABV of at least 15% that is produced by distilling ethanol produced by means of fermenting agricultural products." <br/>
            — <strong>European Union Spirit Drinks Regulation</strong>
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrapper" style={{ marginBottom: '1.25rem' }}>
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search spirits…" value={query} onChange={e => setQuery(e.target.value)} aria-label="Search spirits" />
      </div>

      {/* Subtype filter */}
      <div className="filter-bar">
        {SUBTYPES.map(t => (
          <button key={t} className={`filter-pill ${subtype === t ? 'active' : ''}`} onClick={() => setSubtype(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <p className="text-muted" style={{ marginBottom: '1.25rem' }}>Showing {filtered.length} of {spirits.length} spirit families</p>

      {/* Grid */}
      <div className="card-grid">
        {filtered.map(spirit => (
          <article key={spirit.id} className="detail-card animate-fade-up" style={{ cursor: 'pointer' }} onClick={() => setSelected(spirit)}>
            <div className="detail-card-header">
              <div>
                <span className="badge badge-spirit" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>{spirit.subtype}</span>
                <h3 style={{ fontFamily: 'var(--font-display)' }}>{spirit.name}</h3>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '2px' }}>📍 {spirit.origin}</p>
              </div>
              <button
                className={`fav-btn ${isFavourite(spirit.id) ? 'active' : ''}`}
                style={{ position: 'static', opacity: 1 }}
                onClick={e => { e.stopPropagation(); toggleFavourite(spirit.id); }}
              >{isFavourite(spirit.id) ? '❤️' : '🤍'}</button>
            </div>
            <div className="detail-card-body">
              <div className="detail-meta">
                <div className="detail-meta-item"><div className="detail-meta-label">ABV</div><div className="detail-meta-value">{spirit.abv}</div></div>
                <div className="detail-meta-item"><div className="detail-meta-label">Base</div><div className="detail-meta-value" style={{ fontSize: '0.75rem' }}>{spirit.baseMaterial?.split(',')[0]}</div></div>
                <div className="detail-meta-item"><div className="detail-meta-label">Colour</div><div className="detail-meta-value" style={{ fontSize: '0.75rem' }}>{spirit.colour?.split(',')[0]}</div></div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--clr-text-muted)', lineHeight: '1.6' }}>
                {spirit.tastingNotes?.substring(0, 120)}…
              </p>
              {spirit.funFact && <div className="fact-box" style={{ marginTop: '0.75rem', fontSize: '0.82rem' }}>💡 {spirit.funFact.substring(0, 100)}…</div>}
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
