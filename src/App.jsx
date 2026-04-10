import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
const CommunityPage = lazy(() => import('./yap/pages/CommunityPage'));
const ChatPage = lazy(() => import('./yap/pages/ChatPage'));
const MyGroupsPage = lazy(() => import('./yap/pages/MyGroupsPage'));
const SessionsPage = lazy(() => import('./yap/pages/SessionsPage'));
const DirectMessagesPage = lazy(() => import('./yap/pages/DirectMessagesPage'));
const PrivateChatPage = lazy(() => import('./yap/pages/PrivateChatPage'));
const ProfileSettingsPage = lazy(() => import('./yap/pages/ProfileSettingsPage'));
const PublicProfilePage = lazy(() => import('./yap/pages/PublicProfilePage'));
const YapLoginPage = lazy(() => import('./yap/pages/YapLoginPage'));

const ProtectedYapRoute = ({ user, loading, children }) => {
  const location = useLocation();
  if (loading) return <PageLoader />;
  if (!user) {
    return <Navigate to="/yap/login" state={{ from: location }} replace />;
  }
  return children;
};

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
  const [authLoading, setAuthLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setAuthLoading(false);
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
  const isSpecialPage = location.pathname === '/sathi' || location.pathname.startsWith('/yap');

  return (
    <>
      {!isSpecialPage && <Navbar theme={theme} onToggleTheme={toggleTheme} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      <main className={`page-wrapper ${isSpecialPage ? 'special-route no-padding' : ''}`}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/beverages" element={<BeveragePage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
            <Route path="/beverages/:slug" element={<BeveragePage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
            <Route path="/spirits" element={<SpiritsPage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
            <Route path="/spirits/:slug" element={<SpiritsPage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
            <Route path="/wine" element={<WinePage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
            <Route path="/wine/:slug" element={<WinePage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
            <Route path="/beer" element={<BeerPage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
            <Route path="/beer/:slug" element={<BeerPage toggleFavourite={toggleFavourite} isFavourite={isFavourite} />} />
            <Route path="/techniques" element={<TechniquesPage />} />
            <Route path="/techniques/:slug" element={<TechniquesPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/wset" element={<WSETMockTestPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/glossary/:slug" element={<GlossaryPage />} />
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
            
            {/* YAP Routes */}
            <Route path="/yap/login" element={<YapLoginPage />} />
            <Route path="/yap/community" element={<ProtectedYapRoute user={user} loading={authLoading}><CommunityPage user={user} /></ProtectedYapRoute>} />
            <Route path="/yap/chat/:groupId" element={<ProtectedYapRoute user={user} loading={authLoading}><ChatPage user={user} /></ProtectedYapRoute>} />
            <Route path="/yap/my-groups" element={<ProtectedYapRoute user={user} loading={authLoading}><MyGroupsPage user={user} /></ProtectedYapRoute>} />
            <Route path="/yap/sessions" element={<ProtectedYapRoute user={user} loading={authLoading}><SessionsPage user={user} /></ProtectedYapRoute>} />
            <Route path="/yap/messages" element={<ProtectedYapRoute user={user} loading={authLoading}><DirectMessagesPage user={user} /></ProtectedYapRoute>} />
            <Route path="/yap/messages/:otherUserId" element={<ProtectedYapRoute user={user} loading={authLoading}><PrivateChatPage user={user} /></ProtectedYapRoute>} />
            <Route path="/yap/user/:userId" element={<ProtectedYapRoute user={user} loading={authLoading}><PublicProfilePage user={user} /></ProtectedYapRoute>} />
            <Route path="/yap/profile" element={<ProtectedYapRoute user={user} loading={authLoading}><ProfileSettingsPage user={user} /></ProtectedYapRoute>} />
          </Routes>
        </Suspense>
      </main>
      {!isSpecialPage && <Footer />}
    </>
  );
}
