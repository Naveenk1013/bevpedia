import { useState, useMemo } from 'react';
import { beers } from '../data/beers.js';
import BeverageModal from '../components/BeverageModal';
import SEO from '../components/SEO';

const BEER_TYPES = ['all', 'lager', 'ale'];
const TYPE_COLOURS = { lager: '#c9963a', ale: '#d97b30' };

export default function BeerPage({ toggleFavourite, isFavourite }) {
  const [beerType, setBeerType] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => beers.filter(b =>
    (beerType === 'all' || b.type === beerType) &&
    (!query || b.name.toLowerCase().includes(query.toLowerCase()) || b.origin.toLowerCase().includes(query.toLowerCase()))
  ), [beerType, query]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <SEO 
        title="Beer Guide" 
        description="Detailed beer guide exploring lagers, ales, IPAs, stouts, and more. Learn about beer styles, IBU, ABV, historical contexts, and perfect food pairings."
      />
      <div className="page-hero" style={{ textAlign: 'left', paddingLeft: 0 }}>
        <h1>🍺 Beer Guide</h1>
        <p className="page-hero-subtitle">Lagers, IPAs, stouts, wheat beers, Belgians, sours & more — styles, IBU, ABV, history & food pairings.</p>

        <div className="fact-box" style={{ marginTop: '1.5rem', background: 'var(--clr-surface)', borderColor: 'var(--clr-border)', color: 'var(--clr-text)', textAlign: 'left' }}>
          <p style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.25rem'}}><strong>Beer</strong> <span className="text-muted" style={{fontSize: '0.9rem'}}>noun</span></p>
          <p style={{fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--clr-text-muted)'}}>
            "An alcoholic drink made from yeast-fermented malt flavoured with hops." <br/>
            — <strong>Oxford English Dictionary</strong>
          </p>
          <p style={{fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--clr-text-muted)', marginTop: '0.5rem'}}>
            "A fermented alcoholic beverage largely composed of water, malted barley (or other grains), hops, and yeast." <br/>
            — <strong>Master Brewers Association of the Americas</strong>
          </p>
        </div>
      </div>

      <div className="filter-bar">
        {BEER_TYPES.map(t => (
          <button key={t} className={`filter-pill ${beerType === t ? 'active' : ''}`} onClick={() => setBeerType(t)}>
            {t === 'all' ? 'All Styles' : t === 'lager' ? '🍺 Lager' : '🍻 Ale'}
          </button>
        ))}
      </div>

      <div className="search-wrapper" style={{ marginBottom: '1rem' }}>
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search beer styles or origins…" value={query} onChange={e => setQuery(e.target.value)} aria-label="Search beer" />
      </div>
      <p className="text-muted" style={{ marginBottom: '1.25rem' }}>Showing {filtered.length} of {beers.length} styles</p>

      <div className="card-grid">
        {filtered.map(beer => (
          <article
            key={beer.id}
            className="detail-card animate-fade-up"
            style={{ cursor: 'pointer', borderTop: `3px solid ${TYPE_COLOURS[beer.type] || 'var(--clr-accent)'}` }}
            onClick={() => setSelected(beer)}
          >
            <div className="detail-card-header">
              <div>
                <span className="badge badge-beer" style={{ marginBottom: '6px', display: 'inline-flex' }}>{beer.type}</span>
                <h3 style={{ fontFamily: 'var(--font-display)' }}>{beer.name}</h3>
                <p className="text-muted" style={{ fontSize: '0.82rem', marginTop: '2px' }}>📍 {beer.origin?.substring(0, 50)}</p>
              </div>
              <button
                className={`fav-btn ${isFavourite(beer.id) ? 'active' : ''}`}
                style={{ position: 'static', opacity: 1 }}
                onClick={e => { e.stopPropagation(); toggleFavourite(beer.id); }}
              >{isFavourite(beer.id) ? '❤️' : '🤍'}</button>
            </div>
            <div className="detail-card-body">
              <div className="detail-meta">
                <div className="detail-meta-item"><div className="detail-meta-label">ABV</div><div className="detail-meta-value">{beer.abv?.split(' ')[0]}</div></div>
                <div className="detail-meta-item"><div className="detail-meta-label">IBU</div><div className="detail-meta-value">{beer.ibu}</div></div>
                <div className="detail-meta-item"><div className="detail-meta-label">Serve at</div><div className="detail-meta-value">{beer.servingTemp}</div></div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)', lineHeight: '1.6', marginTop: '0.75rem' }}>
                {beer.tastingNotes?.substring(0, 110)}…
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                {beer.glassware?.split(', ').map(g => <span key={g} className="equip-tag">{g}</span>)}
              </div>
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
