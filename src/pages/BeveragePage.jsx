import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { cocktails } from '../data/cocktails.js';
import { mocktails } from '../data/mocktails.js';
import drinkImages from '../data/drink-images.json';
import BeverageModal from '../components/BeverageModal';
import SEO from '../components/SEO';
import { cocktailSchema } from '../schemas/index.js';

const ALL = [...cocktails, ...mocktails];
const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'cocktail', label: '🍸 Cocktails' },
  { key: 'mocktail', label: '🥤 Mocktails' },
  { key: 'vodka', label: 'Vodka' },
  { key: 'gin', label: 'Gin' },
  { key: 'rum', label: 'Rum' },
  { key: 'tequila', label: 'Tequila' },
  { key: 'whiskey', label: 'Whiskey' },
  { key: 'brandy', label: 'Brandy' },
  { key: 'sparkling', label: 'Sparkling' },
  { key: 'mezcal', label: 'Mezcal' },
  { key: 'liqueur', label: 'Liqueur' },
  { key: 'multi-spirit', label: 'Multi-Spirit' },
];

const CAT_KEYS = CATEGORIES.map(c => c.key);

// Helper to generate slug for comparison
const getSlug = (name) => name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const DIFFICULTIES = [
  { key: 0, label: 'Any Level' },
  { key: 1, label: '⭐ Easy' },
  { key: 2, label: '⭐⭐ Medium' },
  { key: 3, label: '⭐⭐⭐ Advanced' },
];

function Stars({ n }) {
  return (
    <div className="difficulty-stars" title={`Difficulty: ${n}/5`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`star ${i <= n ? '' : 'empty'}`}>★</span>
      ))}
    </div>
  );
}

function BeverageCard({ bev, onClick, toggleFavourite, isFavourite }) {
  const cat = bev.category || 'cocktail';
  const fav = isFavourite(bev.id);
  const thumbUrl = drinkImages[bev.name];
  return (
    <article className={`bev-card ${cat} ${thumbUrl ? 'has-thumb' : ''} animate-fade-up`} onClick={() => onClick(bev)}>
      <button
        className={`fav-btn ${fav ? 'active' : ''}`}
        onClick={e => { e.stopPropagation(); toggleFavourite(bev.id); }}
        aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
      >
        {fav ? '❤️' : '🤍'}
      </button>
      {thumbUrl ? (
        <div className="bev-card-thumb">
          <img src={thumbUrl} alt={bev.name} loading="lazy" />
        </div>
      ) : (
        <div className="bev-card-icon">{cat === 'mocktail' ? '🥤' : '🍸'}</div>
      )}
      <div className="bev-card-name">{bev.name}</div>
      <div className="bev-card-flavour">{bev.flavour}</div>
      <div className="bev-card-meta">
        <span className={`badge badge-${cat}`}>{bev.spirit || cat}</span>
        <span className="bev-card-abv">{bev.abv}</span>
        {bev.difficulty && <Stars n={bev.difficulty} />}
      </div>
    </article>
  );
}

export default function BeveragePage({ toggleFavourite, isFavourite }) {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  
  const initCat = searchParams.get('cat') || (CAT_KEYS.includes(slug) ? slug : 'all');
  const initQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initQ);
  const [category, setCategory] = useState(initCat);
  const [difficulty, setDifficulty] = useState(0);
  const [selected, setSelected] = useState(null);

  // Sync with URL params
  useEffect(() => {
    if (slug && !CAT_KEYS.includes(slug)) {
      const found = ALL.find(b => b.slug === slug || getSlug(b.name) === slug);
      if (found) setSelected(found);
    }
  }, [slug]);

  const filtered = useMemo(() => {
    return ALL.filter(b => {
      const matchCat = category === 'all' || b.category === category || b.spirit === category;
      const matchQ = !query || b.name.toLowerCase().includes(query.toLowerCase()) || (b.flavour || '').toLowerCase().includes(query.toLowerCase()) || (b.ingredients || []).some(i => i.item.toLowerCase().includes(query.toLowerCase()));
      const matchDiff = !difficulty || b.difficulty <= difficulty;
      return matchCat && matchQ && matchDiff;
    });
  }, [category, query, difficulty]);

  // SEO logic
  const seoProps = useMemo(() => {
    if (selected) {
      return {
        title: selected.name,
        description: selected.description || `Learn how to make the perfect ${selected.name}. Professional recipe, ingredients, and expert tips from Bevpedia.`,
        image: drinkImages[selected.name],
        keywords: `${selected.name}, cocktail recipe, ${selected.spirit || ''}, mixology`,
        structuredData: cocktailSchema(selected)
      };
    }
    return {
      title: "Mixology & Beverage Library | Classic & Modern Recipes",
      description: "Master the art of the bar with our curated collection of cocktails and mocktails. Professional recipes, historical context, and step-by-step mixology guides."
    };
  }, [selected]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <SEO {...seoProps} />
      <div className="page-hero" style={{ textAlign: 'left', paddingLeft: 0 }}>
        <h1>🍸 Cocktails &amp; Mocktails</h1>
        <p className="page-hero-subtitle">
          {ALL.length} beverages — from pre-Prohibition classics to modern craft creations and zero-proof mocktails.
        </p>
        
        <div className="fact-box" style={{ marginTop: '1.5rem', background: 'var(--clr-surface)', borderColor: 'var(--clr-border)', color: 'var(--clr-text)', textAlign: 'left' }}>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.25rem'}}><strong>Cocktail</strong> <span className="text-muted" style={{fontSize: '0.9rem'}}>noun</span></p>
            <p style={{fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--clr-text-muted)'}}>
              "An alcoholic drink consisting of a spirit or spirits mixed with other ingredients, such as fruit juice or cream." <br/>
              — <strong>Oxford English Dictionary</strong>
            </p>
            <p style={{fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--clr-text-muted)', marginTop: '0.5rem'}}>
              "A stimulating liquor, composed of spirits of any kind, sugar, water, and bitters." <br/>
              — <strong>The Balance and Columbian Repository (May 13, 1806)</strong>
            </p>
          </div>
          <div>
            <p style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.25rem'}}><strong>Mocktail</strong> <span className="text-muted" style={{fontSize: '0.9rem'}}>noun</span></p>
            <p style={{fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--clr-text-muted)'}}>
              "A non-alcoholic drink consisting of a mixture of fruit juices or other soft drinks." <br/>
              — <strong>Oxford English Dictionary</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-wrapper" style={{ marginBottom: '1.25rem' }}>
        <span className="search-icon">🔍</span>
        <input
          id="beverage-search"
          className="search-input"
          placeholder="Search by name, flavour, or ingredient…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search beverages"
        />
      </div>

      {/* Category filter */}
      <div className="filter-bar" role="group" aria-label="Filter by category">
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            className={`filter-pill ${category === c.key ? 'active' : ''}`}
            onClick={() => setCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Difficulty filter */}
      <div className="filter-bar" role="group" aria-label="Filter by difficulty">
        {DIFFICULTIES.map(d => (
          <button
            key={d.key}
            className={`filter-pill ${difficulty === d.key ? 'active' : ''}`}
            onClick={() => setDifficulty(d.key)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <p className="text-muted" style={{ marginBottom: '1.25rem' }}>
        Showing <strong>{filtered.length}</strong> of {ALL.length} beverages
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="card-grid">
          {filtered.map(bev => (
            <BeverageCard
              key={bev.id}
              bev={bev}
              onClick={setSelected}
              toggleFavourite={toggleFavourite}
              isFavourite={isFavourite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🍹</div>
          <p>No beverages match your search. Try a different keyword or filter.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <BeverageModal
          item={selected}
          onClose={() => setSelected(null)}
          toggleFavourite={toggleFavourite}
          isFavourite={isFavourite}
        />
      )}
    </div>
  );
}
