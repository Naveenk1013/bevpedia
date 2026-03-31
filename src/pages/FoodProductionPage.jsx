import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, 
  Play, 
  BookOpen, 
  FileText, 
  Download, 
  Search, 
  Filter,
  X,
  Youtube,
  Book
} from 'lucide-react';
import { foodProductionData } from '../data/foodProduction';

export default function FoodProductionPage() {
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredVideos = useMemo(() => {
    return foodProductionData.videos.filter(video => {
      const matchesSemester = selectedSemester === 'All' || video.semester === parseInt(selectedSemester.replace('Sem ', ''));
      const matchesTopic = selectedTopic === 'All' || video.topic === selectedTopic;
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           video.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSemester && matchesTopic && matchesSearch;
    });
  }, [selectedSemester, selectedTopic, searchQuery]);

  const closeVideo = () => setActiveVideo(null);

  return (
    <div className="food-production-page animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* ── Hero Section ── */}
      <section className="hero" style={{ minHeight: '60vh', background: 'linear-gradient(to bottom, rgba(13, 15, 20, 0.2), var(--clr-bg)), url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop") center/cover' }}>
        <div className="hero-bg" style={{ background: 'rgba(0,0,0,0.6)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-badge" style={{ margin: '0 auto 1.5rem', width: 'fit-content' }}>
            <ChefHat size={16} /> Culinary Arts & Production
          </div>
          <h1 className="hero-title" style={{ fontSize: '4rem' }}>
            Practical <span>Video Library</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: '0 auto 2.5rem' }}>
            A curated gallery of Food Production practicals across all semesters. 
            Master culinary techniques and regional cuisines through high-quality visual guides.
          </p>

          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '0.75rem 1.5rem', 
            background: 'rgba(245, 158, 11, 0.1)', 
            border: '1px solid rgba(245, 158, 11, 0.3)', 
            borderRadius: '12px',
            color: '#f59e0b',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            <Youtube size={18} />
            <span>This page is currently under development. Stay tuned for our original high-quality practical videos!</span>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        {/* ── Search & Filter Bar ── */}
        <div className="detail-card" style={{ padding: '2rem', marginBottom: '3rem', backdropFilter: 'blur(20px)', background: 'rgba(21, 24, 33, 0.8)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search recipes, techniques..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <select 
                className="filter-pill" 
                style={{ flex: 1, background: 'var(--clr-surface)', color: 'var(--clr-text)', border: '1px solid var(--clr-border)', padding: '0 1rem' }}
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                <option value="All">All Semesters</option>
                {foodProductionData.semesters.map(sem => (
                  <option key={sem.id} value={`Sem ${sem.id}`}>{sem.name}</option>
                ))}
              </select>

              <select 
                className="filter-pill" 
                style={{ flex: 1, background: 'var(--clr-surface)', color: 'var(--clr-text)', border: '1px solid var(--clr-border)', padding: '0 1rem' }}
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
              >
                <option value="All">All Topics</option>
                {foodProductionData.topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Video Gallery ── */}
        <div className="section" style={{ paddingTop: 0 }}>
          <div className="section-header" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div className="section-eyebrow">Practical Gallery</div>
              <h2 className="section-title">Video Library</h2>
            </div>
            <div className="text-muted" style={{ marginBottom: '1rem' }}>
              Showing {filteredVideos.length} practicals
            </div>
          </div>

          <div className="card-grid">
            {filteredVideos.map(video => (
              <motion.div 
                key={video.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bev-card"
                onClick={() => setActiveVideo(video)}
                style={{ padding: 0 }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img 
                    src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`} 
                    alt={video.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'rgba(0,0,0,0.3)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'background 0.3s'
                  }} className="play-overlay">
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '50%', 
                      background: 'var(--clr-accent)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#000',
                      boxShadow: '0 0 20px rgba(201, 150, 58, 0.4)'
                    }}>
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                    <span className="badge" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '10px' }}>Sem {video.semester}</span>
                    <span className="badge" style={{ background: 'var(--clr-accent)', color: '#000', fontSize: '10px' }}>{video.topic}</span>
                  </div>
                </div>
                <div className="card-body" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{video.title}</h3>
                  <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--clr-text-muted)' }}>
              <ChefHat size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>No videos found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* ── Study Materials Selection ── */}
        <div className="section">
          <div className="section-header">
            <div className="section-eyebrow">Academic Resources</div>
            <h2 className="section-title">Study Materials</h2>
            <p className="section-subtitle">Downloadable guides, recipe banks, and theoretical notes for Food Production.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Bakery Section */}
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--clr-accent)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ChefHat size={24} /> Bakery & Confectionery
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {foodProductionData.studyMaterials.filter(m => m.topic === 'Bakery').map(material => (
                  <div key={material.id} className="detail-card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '12px', 
                      background: 'rgba(201, 150, 58, 0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--clr-accent)',
                      flexShrink: 0
                    }}>
                      <BookOpen size={30} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{material.title}</h4>
                      <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1rem' }}>{material.description}</p>
                      
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {material.url !== '#' && (
                          <a href={material.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', gap: '6px' }}>
                            <Download size={14} /> Download PDF
                          </a>
                        )}
                        {material.kindleUrl && (
                          <a href={material.kindleUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', gap: '6px', background: '#f59e0b' }}>
                            <Book size={14} /> Kindle Edition
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Section */}
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={24} /> General Culinary Resources
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {foodProductionData.studyMaterials.filter(m => m.topic !== 'Bakery').map(material => (
                  <div key={material.id} className="detail-card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', alignItems: 'center' }}>
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '12px', 
                      background: 'rgba(255, 255, 255, 0.05)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--clr-text-muted)',
                      flexShrink: 0
                    }}>
                      {material.type === 'PDF' ? <FileText size={30} /> : <BookOpen size={30} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{material.title}</h4>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>{material.description}</p>
                    </div>
                    <a href={material.url} target="_blank" rel="noopener noreferrer" className="btn-icon" title="Download Resource">
                      <Download size={20} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Video Modal ── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeVideo}
          >
            <button className="lightbox-close" onClick={closeVideo}>
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="lightbox-content"
              onClick={e => e.stopPropagation()}
              style={{ width: 'min(1000px, 95vw)' }}
            >
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="lightbox-caption" style={{ textAlign: 'left', marginTop: '1.5rem', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>{activeVideo.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>{activeVideo.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge" style={{ background: 'var(--clr-accent)', color: '#000' }}>{activeVideo.topic}</span>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>Semester {activeVideo.semester}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .play-overlay:hover {
          background: rgba(0,0,0,0.5) !important;
        }
        .play-overlay:hover div {
          transform: scale(1.1);
        }
        .text-gradient {
          background: linear-gradient(to right, var(--clr-accent), #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
