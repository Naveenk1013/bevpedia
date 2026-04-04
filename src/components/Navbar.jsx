import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Martini, 
  Sparkles, 
  GraduationCap, 
  Sun, 
  Moon, 
  X, 
  Menu 
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/beverages', label: 'Cocktails & Mocktails' },
  { to: '/spirits', label: 'Spirits' },
  { to: '/wine', label: 'Wine' },
  { to: '/beer', label: 'Beer' },
  { to: '/techniques', label: 'Techniques' },
  { to: '/wset', label: 'WSET' },
  { to: '/nchmct', label: 'NCHMCT' },
  { to: '/students', label: 'Student Hub' },
  { to: '/sathi', label: 'SATHI AI', icon: Sparkles },
  { to: '/quiz', label: 'Quiz', icon: GraduationCap },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/beverages?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container">
        <NavLink to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <span className="nav-logo-icon">
            <Martini size={24} color="var(--clr-accent)" />
          </span>
          <span>Beverage Encyclopedia</span>
        </NavLink>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {item.icon && <item.icon size={16} />}
                {item.label}
              </span>
            </NavLink>
          ))}
          <input
            className="search-input"
            style={{ width: '160px', padding: '6px 12px', fontSize: '0.82rem', borderRadius: 'var(--radius-full)' }}
            placeholder="Quick search…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            aria-label="Quick search"
          />
        </div>

        <div className="nav-actions">
          <button
            className="btn-icon"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="btn-icon hamburger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
