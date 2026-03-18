import React, { useState, useMemo } from 'react';
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from '../ui/map';
import {
  wineRegions,
  filterRegions,
  searchRegions,
  getUniqueValues,
  WORLD,
  COLOR,
  TASTE,
  NATURE,
} from '../../data/wineRegionsDB';
import {
  Search,
  Filter,
  Globe,
  MapPin,
  Wind,
  Sun,
  Layers,
  Wine,
  Grape,
  Star,
} from 'lucide-react';
import '../../styles/wine-map.css';

/* ─── color helpers ─── */
const OLD_COLOR = '#c9963a';
const NEW_COLOR = '#7c5cfc';

export default function WineRegionMap() {
  /* ─── state ─── */
  const [filters, setFilters] = useState({
    world: null,
    color: null,
    taste: null,
    nature: null,
    continent: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  /* ─── derived data ─── */
  const filteredRegions = useMemo(() => {
    let result = filterRegions(filters);
    if (searchQuery) {
      const searched = searchRegions(searchQuery);
      result = result.filter((r) => searched.some((s) => s.id === r.id));
    }
    return result;
  }, [filters, searchQuery]);

  const stats = useMemo(
    () => ({
      total: filteredRegions.length,
      oldWorld: filteredRegions.filter((r) => r.world === WORLD.OLD).length,
      newWorld: filteredRegions.filter((r) => r.world === WORLD.NEW).length,
    }),
    [filteredRegions]
  );

  /* ─── handlers ─── */
  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));

  const clearFilters = () => {
    setFilters({
      world: null,
      color: null,
      taste: null,
      nature: null,
      continent: null,
    });
    setSearchQuery('');
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== null
  ).length;

  /* ──────────────────────────────────────────────────────── */
  /*  RENDER                                                  */
  /* ──────────────────────────────────────────────────────── */
  return (
    <div className="wm-root">
      {/* ═══ MAP ═══ */}
      <Map center={[20, 30]} zoom={2} className="wm-canvas">
        <MapControls
          showZoom
          showLocate
          showFullscreen
          position="bottom-right"
        />

        {filteredRegions.map((region) => {
          const isOld = region.world === WORLD.OLD;
          const dotColor = isOld ? OLD_COLOR : NEW_COLOR;

          return (
            <MapMarker
              key={region.id}
              longitude={region.coordinates.lng}
              latitude={region.coordinates.lat}
            >
              {/* ── Marker Dot + Label ── */}
              <MarkerContent>
                <div className="wm-marker-wrapper">
                  <div
                    className="wm-marker-dot"
                    style={{ background: dotColor }}
                  />
                  <MarkerLabel position="bottom">
                    <span className="wm-marker-label">{region.name}</span>
                  </MarkerLabel>
                </div>
              </MarkerContent>

              {/* ── Popup on Click ── */}
              <MarkerPopup
                className="p-0 overflow-hidden border-none bg-transparent shadow-none"
                offset={20}
              >
                <div className="wm-popup">
                  {/* Header */}
                  <div className="wm-popup-header">
                    <div className="wm-popup-header-top">
                      <span
                        className="wm-badge"
                        style={{
                          background: dotColor,
                          color: isOld ? '#0d0f14' : '#fff',
                        }}
                      >
                        {region.world}
                      </span>
                      <span className="wm-popup-country">
                        <MapPin size={10} /> {region.country}
                      </span>
                    </div>
                    <h3 className="wm-popup-title">{region.name}</h3>
                    <p className="wm-popup-subtitle">{region.continent}</p>
                  </div>

                  {/* Body */}
                  <div className="wm-popup-body">
                    {/* Description */}
                    <p className="wm-popup-desc">"{region.description}"</p>

                    {/* Wine Colors */}
                    <div className="wm-popup-tags">
                      {region.colors.map((c) => (
                        <span key={c} className="wm-tag wm-tag--color">
                          {c === 'Red' ? '🍷' : c === 'White' ? '🥂' : '🌸'}{' '}
                          {c}
                        </span>
                      ))}
                      {region.nature.map((n) => (
                        <span key={n} className="wm-tag wm-tag--nature">
                          {n}
                        </span>
                      ))}
                    </div>

                    {/* Terroir Grid */}
                    <div className="wm-popup-grid">
                      <div className="wm-popup-grid-item">
                        <h5 className="wm-popup-grid-label">
                          <Sun size={10} /> Terroir
                        </h5>
                        <p className="wm-popup-grid-value">{region.soil}</p>
                      </div>
                      <div className="wm-popup-grid-item">
                        <h5 className="wm-popup-grid-label">
                          <Wind size={10} /> Climate
                        </h5>
                        <p className="wm-popup-grid-value">{region.climate}</p>
                      </div>
                    </div>

                    {/* Grapes */}
                    <div className="wm-popup-section">
                      <h5 className="wm-popup-grid-label">🍇 Signature Grapes</h5>
                      <div className="wm-popup-tags">
                        {[
                          ...region.grapes.red.slice(0, 3),
                          ...region.grapes.white.slice(0, 2),
                        ].map((g) => (
                          <span key={g} className="wm-grape-pill">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Famous Wines */}
                    {region.famousWines && region.famousWines.length > 0 && (
                      <div className="wm-popup-section">
                        <h5 className="wm-popup-grid-label">
                          <Star size={10} /> Famous Wines
                        </h5>
                        <div className="wm-popup-tags">
                          {region.famousWines.slice(0, 3).map((w) => (
                            <span key={w} className="wm-grape-pill wm-grape-pill--gold">
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="wm-popup-footer">
                      <div className="wm-popup-meta">
                        <span className="wm-popup-meta-item">
                          {region.ageability}
                        </span>
                        <span className="wm-popup-meta-item">
                          {region.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>

      {/* ═══ SEARCH & STATS PANEL ═══ */}
      <div className="wm-panel">
        <div className="wm-panel-card">
          {/* Branding */}
          <div className="wm-panel-brand">
            <div className="wm-panel-icon">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="wm-panel-title">Wine Explorer</h3>
              <p className="wm-panel-subtitle">Global Region Atlas</p>
            </div>
          </div>

          {/* Search */}
          <div className="wm-search">
            <Search className="wm-search-icon" size={14} />
            <input
              type="text"
              placeholder="Search regions, grapes..."
              className="wm-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Stats */}
          <div className="wm-stats">
            <div className="wm-stat">
              <span className="wm-stat-value" style={{ color: OLD_COLOR }}>
                {stats.total}
              </span>
              <span className="wm-stat-label">Regions</span>
            </div>
            <div className="wm-stat">
              <span className="wm-stat-value" style={{ color: OLD_COLOR }}>
                {stats.oldWorld}
              </span>
              <span className="wm-stat-label">Old World</span>
            </div>
            <div className="wm-stat">
              <span className="wm-stat-value" style={{ color: NEW_COLOR }}>
                {stats.newWorld}
              </span>
              <span className="wm-stat-label">New World</span>
            </div>
          </div>
        </div>

        {/* Filter Trigger */}
        <button
          className={`wm-filter-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <div className="wm-filter-btn-left">
            <Filter size={14} />
            <span>Filters</span>
          </div>
          {activeFilterCount > 0 && (
            <span className="wm-filter-count">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* ═══ FILTER MENU ═══ */}
      {showFilters && (
        <div className="wm-filters">
          <div className="wm-filters-head">
            <h4>
              <Layers size={12} /> Refine Terroir
            </h4>
            <button onClick={clearFilters}>Reset</button>
          </div>

          <div className="wm-filters-body">
            <FilterGroup
              label="🌐 World"
              options={[WORLD.OLD, WORLD.NEW]}
              active={filters.world}
              onSelect={(v) => handleFilterChange('world', v)}
            />
            <FilterGroup
              label="🍷 Color"
              options={Object.values(COLOR)}
              active={filters.color}
              onSelect={(v) => handleFilterChange('color', v)}
            />
            <FilterGroup
              label="✨ Taste"
              options={Object.values(TASTE)}
              active={filters.taste}
              onSelect={(v) => handleFilterChange('taste', v)}
            />
            <FilterGroup
              label="🧬 Nature"
              options={Object.values(NATURE)}
              active={filters.nature}
              onSelect={(v) => handleFilterChange('nature', v)}
            />
            <FilterGroup
              label="🌍 Continent"
              options={getUniqueValues('continent')}
              active={filters.continent}
              onSelect={(v) => handleFilterChange('continent', v)}
            />
          </div>
        </div>
      )}

      {/* ═══ LEGEND ═══ */}
      <div className="wm-legend">
        <div className="wm-legend-item">
          <div className="wm-legend-dot" style={{ background: OLD_COLOR }} />
          <span>Old World</span>
        </div>
        <div className="wm-legend-item">
          <div className="wm-legend-dot" style={{ background: NEW_COLOR }} />
          <span>New World</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Filter Group Sub-component ─── */
function FilterGroup({ label, options, active, onSelect }) {
  return (
    <div className="wm-fgroup">
      <label className="wm-fgroup-label">{label}</label>
      <div className="wm-fgroup-options">
        {options.map((opt) => (
          <button
            key={opt}
            className={`wm-pill ${active === opt ? 'active' : ''}`}
            onClick={() => onSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
