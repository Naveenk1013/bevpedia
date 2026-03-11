import { useEffect } from 'react';

export default function BeverageModal({ item, onClose, toggleFavourite, isFavourite }) {
  const fav = isFavourite(item.id);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  // Determine category colour
  const catColour = {
    cocktail: 'var(--clr-cocktail)',
    mocktail: 'var(--clr-mocktail)',
    spirit:   'var(--clr-spirit)',
    wine:     'var(--clr-wine)',
    beer:     'var(--clr-beer)',
  }[item.category] || 'var(--clr-accent)';

  const printCard = () => {
    const w = window.open('', '_blank');
    w.document.write(`<html><head><title>${item.name}</title></head><body style="font-family:Georgia,serif;max-width:480px;margin:2rem auto">
      <h1 style="color:#c9963a">${item.name}</h1>
      ${item.glass ? `<p><b>Glass:</b> ${item.glass}</p>` : ''}
      ${item.method ? `<p><b>Method:</b> ${item.method}</p>` : ''}
      ${item.garnish ? `<p><b>Garnish:</b> ${item.garnish}</p>` : ''}
      ${item.abv ? `<p><b>ABV:</b> ${item.abv}</p>` : ''}
      ${item.flavour ? `<p><b>Flavour:</b> ${item.flavour}</p>` : ''}
      ${item.ingredients?.length ? `<h3>Ingredients</h3><ul>${item.ingredients.map(i=>`<li>${i.qty} ${i.item}</li>`).join('')}</ul>` : ''}
      ${item.history ? `<h3>History</h3><p style="color:#666;font-style:italic">${item.history}</p>` : ''}
      ${item.note ? `<p><i><b>Note:</b> ${item.note}</i></p>` : ''}
    </body></html>`);
    w.document.close(); w.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.name}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {/* Accent line */}
        <div style={{ height: '4px', background: catColour }} />

        {/* Header */}
        <div className="modal-header" style={{ position: 'relative' }}>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <span className={`badge badge-${item.category}`}>{item.spirit || item.type || item.category}</span>
            {item.abv && <span className="text-muted" style={{ fontSize: '0.85rem' }}>ABV: {item.abv}</span>}
          </div>
          <h2 className="modal-title">{item.name}</h2>
          {item.flavour && <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '4px' }}>{item.flavour}</p>}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              className={`btn btn-outline ${fav ? 'active' : ''}`}
              style={{ padding: '6px 16px', fontSize: '0.85rem' }}
              onClick={() => toggleFavourite(item.id)}
            >
              {fav ? '❤️ Saved' : '🤍 Save'}
            </button>
            <button
              className="btn btn-ghost"
              style={{ padding: '6px 16px', fontSize: '0.85rem' }}
              onClick={printCard}
            >
              🖨️ Print Card
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* Spec Grid (for cocktails / mocktails) */}
          {(item.glass || item.method || item.garnish) && (
            <div className="modal-section">
              <div className="modal-section-title">Recipe Spec</div>
              <div className="spec-grid">
                {item.glass && (
                  <div className="spec-item">
                    <div className="spec-label">Glass</div>
                    <div className="spec-value">🥃 {item.glass}</div>
                  </div>
                )}
                {item.method && (
                  <div className="spec-item">
                    <div className="spec-label">Method</div>
                    <div className="spec-value">⚗️ {item.method}</div>
                  </div>
                )}
                {item.garnish && (
                  <div className="spec-item">
                    <div className="spec-label">Garnish</div>
                    <div className="spec-value">🌿 {item.garnish}</div>
                  </div>
                )}
                {item.difficulty && (
                  <div className="spec-item">
                    <div className="spec-label">Difficulty</div>
                    <div className="spec-value">{'⭐'.repeat(item.difficulty)}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {item.ingredients?.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">Ingredients</div>
              <div className="ingredient-list">
                {item.ingredients.map((ing, i) => (
                  <div key={i} className="ingredient-item">
                    <span>{ing.item}</span>
                    {ing.qty && <span className="ingredient-qty">{ing.qty}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wine / Beer / Spirit specific fields */}
          {item.tastingNotes && (
            <div className="modal-section">
              <div className="modal-section-title">Tasting Notes</div>
              <div className="history-text" style={{ color: 'var(--clr-text)', fontStyle: 'normal' }}>{item.tastingNotes}</div>
            </div>
          )}
          {item.foodPairing && (
            <div className="modal-section">
              <div className="modal-section-title">Food Pairing</div>
              <p style={{ fontSize: '0.9rem' }}>🍽️ {item.foodPairing}</p>
            </div>
          )}
          {item.famousExpressions?.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">Famous Expressions</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {item.famousExpressions.map(e => (
                  <span key={e} className="equip-tag">{e}</span>
                ))}
              </div>
            </div>
          )}
          {item.famousBrands?.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">Famous Brands</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {item.famousBrands.map(b => (
                  <span key={b} className="equip-tag">{b}</span>
                ))}
              </div>
            </div>
          )}
          {item.famousRegions?.length > 0 && (
            <div className="modal-section">
              <div className="modal-section-title">Famous Regions</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {item.famousRegions.map(r => (
                  <span key={r} className="equip-tag">📍 {r}</span>
                ))}
              </div>
            </div>
          )}

          {/* History */}
          {item.history && (
            <div className="modal-section">
              <div className="modal-section-title">History &amp; Origin</div>
              <div className="history-text">{item.history}</div>
            </div>
          )}
          {item.funFact && (
            <div className="modal-section">
              <div className="modal-section-title">Did You Know?</div>
              <div className="fact-box">💡 {item.funFact}</div>
            </div>
          )}

          {/* Production (spirits) */}
          {item.productionMethod && (
            <div className="modal-section">
              <div className="modal-section-title">Production Method</div>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--clr-text-muted)' }}>{item.productionMethod}</p>
            </div>
          )}
          {item.ageing && (
            <div className="modal-section">
              <div className="modal-section-title">Ageing</div>
              <p style={{ fontSize: '0.9rem' }}>🪵 {item.ageing}</p>
            </div>
          )}

          {/* Notes (cocktails) */}
          {item.note && (
            <div className="modal-section">
              <div className="modal-section-title">Bartender's Note</div>
              <div className="fact-box" style={{ background: 'rgba(124,92,252,0.06)', borderColor: 'rgba(124,92,252,0.2)' }}>
                📝 {item.note}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
