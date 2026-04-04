import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { supabase } from './lib/supabaseClient';
const HomePage = lazy(() => import('./pages/HomePage'));
const BeveragePage = lazy(() => import('./pages/BeveragePage'));
const SpiritsPage = lazy(() => import('./pages/SpiritsPage'));
const WinePage = lazy(() => import('./pages/WinePage'));
const BeerPage = lazy(() => import('./pages/BeerPage'));
const TechniquesPage = lazy(() => import('./pages/TechniquesPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const WSETMockTestPage = lazy(() => import('./pages/WSETMockTestPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SponsorshipPage = lazy(() => import('./pages/SponsorshipPage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));
const NCHMCTPage = lazy(() => import('./pages/NCHMCTPage'));
const StudentHub = lazy(() => import('./pages/StudentHub'));
const UniversityView = lazy(() => import('./pages/UniversityView'));
const StudentAdmin = lazy(() => import('./Notes/StudentAdmin'));
const SemesterPage = lazy(() => import('./Notes/SemesterPage'));
const NotebookPage = lazy(() => import('./pages/NotebookPage'));
const FoodProductionPage = lazy(() => import('./pages/FoodProductionPage'));
const SathiPage = lazy(() => import('./pages/SathiPage'));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ 
      width: '50px', height: '50px', borderRadius: '50%', 
      border: '3px solid transparent', borderTopColor: 'var(--clr-accent)', borderBottomColor: 'var(--clr-accent)',
      animation: 'spin 1s ease-in-out infinite'
    }}></div>
    <p style={{ color: 'var(--clr-accent)', fontFamily: 'var(--font-display)', letterSpacing: '3px', fontSize: '0.85rem' }}>POURING...</p>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);


export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [favourites, setFavourites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bevFavourites') || '[]'); }
    catch { return []; }
  });
  
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session) setShowAuthModal(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const location = useLocation();
  const isSathiPage = location.pathname === '/sathi';

  return (
    <>
      {!isSathiPage && <Navbar theme={theme} onToggleTheme={toggleTheme} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      <main className={`page-wrapper ${isSathiPage ? 'sathi-route' : ''}`}>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/students" element={<StudentHub />} />
            <Route path="/students/:uniId" element={<UniversityView />} />
            <Route path="/students/:uniId/:semId" element={<SemesterPage />} />
            <Route path="/admin/students" element={<StudentAdmin />} />
            <Route path="/notebook" element={<NotebookPage />} />
            <Route path="/food-production" element={<FoodProductionPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sponsors" element={<SponsorshipPage />} />
            <Route path="/sathi" element={<SathiPage user={user} onLoginClick={() => setShowAuthModal(true)} onLogout={() => supabase.auth.signOut()} />} />
          </Routes>
        </Suspense>
      </main>
      {!isSathiPage && <Footer />}
    </>
  );
}
