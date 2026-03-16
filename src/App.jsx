import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BeveragePage from './pages/BeveragePage';
import SpiritsPage from './pages/SpiritsPage';
import WinePage from './pages/WinePage';
import BeerPage from './pages/BeerPage';
import TechniquesPage from './pages/TechniquesPage';
import QuizPage from './pages/QuizPage';
import WSETMockTestPage from './pages/WSETMockTestPage';
import AboutPage from './pages/AboutPage';
import SponsorshipPage from './pages/SponsorshipPage';
import GlossaryPage from './pages/GlossaryPage';
import NCHMCTPage from './pages/NCHMCTPage';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [favourites, setFavourites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bevFavourites') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('bevFavourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const toggleFavourite = (id) => setFavourites(prev =>
    prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
  );
  const isFavourite = (id) => favourites.includes(id);

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beverages" element={<BeveragePage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
          <Route path="/beverages/:section" element={<BeveragePage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
          <Route path="/spirits" element={<SpiritsPage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
          <Route path="/wine" element={<WinePage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
          <Route path="/beer" element={<BeerPage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
          <Route path="/techniques" element={<TechniquesPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/wset" element={<WSETMockTestPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/nchmct" element={<NCHMCTPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sponsors" element={<SponsorshipPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
