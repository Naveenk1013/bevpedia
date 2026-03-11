import { useState, useMemo } from 'react';
import { glossary } from '../data/glossary.js';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return glossary
      .filter(g =>
        (!letter || g.term.toUpperCase().startsWith(letter)) &&
        (!q || g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q))
      )
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [query, letter]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="page-hero" style={{ textAlign: 'left', paddingLeft: 0 }}>
        <h1>📖 Bar &amp; Beverage Glossary</h1>
        <p className="page-hero-subtitle">{glossary.length}+ professional terms — from ABV to Zest. Essential for every hospitality student and practitioner.</p>
      </div>

      {/* Search */}
      <div className="search-wrapper" style={{ marginBottom: '1rem' }}>
        <span className="search-icon">🔍</span>
        <input className="search-input" placeholder="Search terms or definitions…" value={query} onChange={e => { setQuery(e.target.value); setLetter(''); }} aria-label="Search glossary" />
      </div>

      {/* A–Z jump */}
      <div className="alpha-jump">
        <button className={`alpha-btn ${!letter ? 'active' : ''}`} onClick={() => setLetter('')} style={!letter ? { borderColor: 'var(--clr-accent)', color: 'var(--clr-accent)' } : {}}>All</button>
        {ALPHABET.map(l => {
          const has = glossary.some(g => g.term.toUpperCase().startsWith(l));
          return (
            <button
              key={l}
              className={`alpha-btn ${letter === l ? 'active' : ''}`}
              style={!has ? { opacity: 0.25 } : letter === l ? { borderColor: 'var(--clr-accent)', color: 'var(--clr-accent)' } : {}}
              onClick={() => has && setLetter(l === letter ? '' : l)}
              disabled={!has}
            >{l}</button>
          );
        })}
      </div>

      <p className="text-muted" style={{ marginBottom: '1rem' }}>Showing {filtered.length} of {glossary.length} terms</p>

      <div className="glossary-list">
        {filtered.map(g => (
          <div key={g.term} className="glossary-item animate-fade-up">
            <div className="glossary-term">{g.term}</div>
            <div className="glossary-def">{g.definition}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔤</div>
            <p>No terms found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
