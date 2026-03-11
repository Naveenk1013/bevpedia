import { useState } from 'react';
import { techniques, glassware } from '../data/techniques.js';

const TABS = ['techniques', 'glassware'];

export default function TechniquesPage() {
  const [tab, setTab] = useState('techniques');
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="page-hero" style={{ textAlign: 'left', paddingLeft: 0 }}>
        <h1>⚗️ Techniques &amp; Glassware</h1>
        <p className="page-hero-subtitle">Professional bartending methods with step-by-step instructions, plus the complete glassware guide.</p>
      </div>

      {/* Tabs */}
      <div className="filter-bar" style={{ marginBottom: '1.5rem' }}>
        <button className={`filter-pill ${tab === 'techniques' ? 'active' : ''}`} onClick={() => setTab('techniques')}>⚗️ Techniques ({techniques.length})</button>
        <button className={`filter-pill ${tab === 'glassware' ? 'active' : ''}`} onClick={() => setTab('glassware')}>🥃 Glassware ({glassware.length})</button>
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
    </div>
  );
}
