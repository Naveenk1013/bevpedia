import { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { techniques, glassware } from '../data/techniques.js';
import { glossary } from '../data/glossary.js';
import SEO from '../components/SEO';   
import { techniqueSchema } from '../schemas/index.js';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Helper to generate slug for comparison
const getSlug = (name) => name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

export default function TechniquesPage() {
  const { slug } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'techniques';

  const [tab, setTab] = useState(initialTab);
  const [expanded, setExpanded] = useState(null);
  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState('');

  // Sync with URL params
  useEffect(() => {
    if (slug) {
      const found = techniques.find(t => t.slug === slug || getSlug(t.name) === slug);
      if (found) {
        setExpanded(found.id);
        setTab('techniques');
      }
    }
  }, [slug]);

  const filteredGlossary = useMemo(() => {
    const q = query.toLowerCase();
    return glossary
      .filter(g =>
        (!letter || g.term.toUpperCase().startsWith(letter)) &&
        (!q || g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q))
      )
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [query, letter]);

  // SEO logic
  const selectedTech = useMemo(() => {
    if (!slug) return null;
    return techniques.find(t => t.slug === slug || getSlug(t.name) === slug);
  }, [slug]);

  const seoProps = useMemo(() => {
    if (selectedTech) {
      return {
        title: `${selectedTech.name} Technique - Pro Bartending Guide`,
        description: selectedTech.description || `Master the ${selectedTech.name} technique with our professional step-by-step guide and expert tips.`,
        keywords: `${selectedTech.name}, bar technique, bartending, mixology`,
        structuredData: techniqueSchema(selectedTech)
      };
    }
    return {
      title: "Bar Techniques & Glassware Guide",
      description: "Master professional bartending techniques, explore our complete glassware guide, and browse the A-Z beverage glossary."
    };
  }, [selectedTech]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <SEO {...seoProps} />
      <div className="page-hero" style={{ textAlign: 'left', paddingLeft: 0 }}>
        <h1>⚗️ Techniques &amp; Glassware</h1>
        <p className="page-hero-subtitle">Professional bartending methods with step-by-step instructions, plus the complete glassware guide and glossary.</p>
      </div>

      {/* Tabs */}
      <div className="filter-bar" style={{ marginBottom: '1.5rem' }}>
        <button className={`filter-pill ${tab === 'techniques' ? 'active' : ''}`} onClick={() => setTab('techniques')}>⚗️ Techniques ({techniques.length})</button>
        <button className={`filter-pill ${tab === 'glassware' ? 'active' : ''}`} onClick={() => setTab('glassware')}>🥃 Glassware ({glassware.length})</button>
        <button className={`filter-pill ${tab === 'glossary' ? 'active' : ''}`} onClick={() => setTab('glossary')}>📖 Glossary ({glossary.length})</button>
      </div>

      {tab === 'techniques' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {techniques.map(t => (
            <div key={t.id} className="technique-card animate-fade-up">
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}
                onClick={() => setExpanded(expanded === t.id ? null : t.id)}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>{t.name}</h3>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.88rem', marginTop: '4px', lineHeight: '1.5' }}>{t.description}</p>
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {t.drinks?.map(d => <span key={d} className="equip-tag">🍸 {d}</span>)}
                  </div>
                </div>
                <button className="btn-icon" style={{ flexShrink: 0, marginLeft: '1rem' }} aria-label={expanded === t.id ? 'Collapse' : 'Expand'}>
                  {expanded === t.id ? '▲' : '▼'}
                </button>
              </div>

              {expanded === t.id && (
                <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--clr-border)', paddingTop: '1.25rem' }}>
                  <div className="modal-section-title" style={{ marginBottom: '0.75rem' }}>Step-by-Step</div>
                  <div className="technique-steps">
                    {t.steps.map((step, i) => (
                      <div key={i} className="technique-step">
                        <span className="step-num">{i + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                  {t.tips && (
                    <div className="fact-box" style={{ marginTop: '1rem' }}>
                      💡 <strong>Pro Tip:</strong> {t.tips}
                    </div>
                  )}
                  <div style={{ marginTop: '1rem' }}>
                    <div className="modal-section-title">Equipment Needed</div>
                    <div className="technique-equipment">
                      {t.equipment?.map(e => <span key={e} className="equip-tag">🔧 {e}</span>)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'glassware' && (
        <div className="glass-grid">
          {glassware.map(g => (
            <div key={g.id} className="glass-card animate-fade-up" title={g.description}>
              <div className="glass-icon">{g.icon}</div>
              <div className="glass-name">{g.name}</div>
              <div className="glass-volume text-muted">{g.volume}</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--clr-text-muted)', marginTop: '0.5rem', lineHeight: '1.5' }}>
                {g.description?.substring(0, 90)}
              </p>
              <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'center' }}>
                {g.used?.slice(0, 3).map(u => <span key={u} className="equip-tag" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>{u}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'glossary' && (
        <div className="animate-fade-in">
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

          <p className="text-muted" style={{ marginBottom: '1rem' }}>Showing {filteredGlossary.length} of {glossary.length} terms</p>

          <div className="glossary-list">
            {filteredGlossary.map(g => (
              <div key={g.term} className="glossary-item animate-fade-up">
                <div className="glossary-term">{g.term}</div>
                <div className="glossary-def">{g.definition}</div>
              </div>
            ))}
            {filteredGlossary.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">🔤</div>
                <p>No terms found. Try a different search.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
