import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUniversityData } from '../Notes/studentData';
import ThemeToggle from '../Notes/ThemeToggle';
import '../styles/student.css';
import { ArrowLeft, BookOpen, Download, Link2, FileText, Lock, ChevronDown, ChevronRight, Maximize, X, Search } from 'lucide-react';
import SEO from '../components/SEO';

const SemesterPage = () => {
  const { uniId, semId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [fullscreenUnit, setFullscreenUnit] = useState(null);
  const [printingUnit, setPrintingUnit] = useState(null);
  const printRef = React.useRef();
  const [searchTerm, setSearchTerm] = useState('');

  // Pinch-to-zoom state
  const [fontZoomLevel, setFontZoomLevel] = useState(1);
  const [initialPinchDistance, setInitialPinchDistance] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchUniversityData();
      setData(result);
      setLoading(false);
    };
    load();
  }, [uniId, semId]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: printingUnit ? `${printingUnit.title} - ${uni?.shortName}` : 'Notes'
  });

  const triggerDownload = (unit, subjectName) => {
    setPrintingUnit({ ...unit, subjectName });
    // Small delay to ensure the content is rendered in the hidden div
    setTimeout(() => {
      handlePrint();
    }, 150);
  };

  if (loading || !data) {
    return (
      <div className="student-module-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ color: 'var(--student-text-muted)' }}>Loading Semester...</div>
      </div>
    );
  }

  const uni = data.universities.find(u => u.id === uniId);
  const sem = data.semesters.find(s => s.id === semId);
  const subjects = data.subjects.filter(s => s.semesterId === semId);

  const filteredSubjects = subjects.filter(sub => {
    const query = searchTerm.toLowerCase();
    return (
      sub.name.toLowerCase().includes(query) ||
      sub.code.toLowerCase().includes(query) ||
      (sub.units && sub.units.some(u => u.title.toLowerCase().includes(query)))
    );
  });

  if (!uni || !sem) {
    return (
      <div className="student-module-container" style={{ textAlign: 'center', paddingTop: '8rem' }}>
        <h2>Semester not found</h2>
        <button className="admin-btn" style={{ marginTop: '1rem' }} onClick={() => navigate('/students')}>Back to Hub</button>
      </div>
    );
  }

  // Touch Handlers for Pinch-to-Zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialPinchDistance(dist);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialPinchDistance) {
      // It's a pinch
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = dist / initialPinchDistance;
      
      // Calculate new zoom level and clamp it between 0.7x and 2.5x original size
      const newZoom = Math.min(Math.max(0.7, fontZoomLevel * scale), 2.5);
      
      setFontZoomLevel(newZoom);
      setInitialPinchDistance(dist); // reset to current distance for continuous smooth zooming
    }
  };

  const handleTouchEnd = () => {
    setInitialPinchDistance(null);
  };

  return (
    <div 
      className="student-module-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <SEO 
        title={`${sem.title} Notes - ${uni.shortName}`}
        description={`Full ${sem.title} syllabus study material for ${uni.shortName}. Access comprehensive subjects, units, notes, and PDF resources for your hospitality course.`}
        canonical={`https://bevpedia.in/students/${uniId}/${semId}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Student Hub", "item": "https://bevpedia.in/students" },
            { "@type": "ListItem", "position": 2, "name": uni.shortName, "item": `https://bevpedia.in/students/${uniId}` },
            { "@type": "ListItem", "position": 3, "name": sem.title, "item": `https://bevpedia.in/students/${uniId}/${semId}` }
          ]
        }}
      />
      <div className="semester-container">
        <div style={{ position: 'absolute', top: '24px', right: '4%' }}>
          <ThemeToggle />
        </div>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--student-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer', color: uni.themeColor }} onClick={() => navigate('/students')}>Student Hub</span>
          <span>/</span>
          <span style={{ cursor: 'pointer', color: uni.themeColor }} onClick={() => navigate(`/students/${uniId}`)}>{uni.shortName}</span>
          <span>/</span>
          <span style={{ color: 'var(--student-text)' }}>{sem.title}</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
            <button className="back-btn" onClick={() => navigate(`/students/${uniId}`)}>
              <ArrowLeft size={16} />
            </button>
            <h1 style={{ fontSize: '1.8rem', margin: 0 }}>
              <span style={{ color: uni.themeColor }}>{uni.shortName}</span> — {sem.title}
            </h1>
          </div>
          <p style={{ color: 'var(--student-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            {subjects.length} subject{subjects.length !== 1 ? 's' : ''} • Click a subject to view and download notes
          </p>

          <div style={{ maxWidth: '100%', marginBottom: '2rem', position: 'relative' }}>
            <Search size={18} color="var(--student-text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search subjects or chapters..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: '48px', borderRadius: '50px', background: 'rgba(255,255,255,0.03)' }}
            />
          </div>
        </motion.div>

        {/* Subjects */}
        {subjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--student-surface)', borderRadius: 'var(--student-radius-lg)', border: '1px dashed var(--student-border)' }}>
            <BookOpen size={48} color="var(--student-text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3 style={{ margin: '0 0 0.5rem 0' }}>No Subjects Yet</h3>
            <p style={{ color: 'var(--student-text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Subjects and notes for this semester will be added soon.
            </p>
          </div>
        ) : filteredSubjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--student-text-muted)' }}>
            No matches found for "{searchTerm}"
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredSubjects.map((sub, idx) => (
              <motion.div
                key={sub.id}
                className="subject-accordion"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div
                  className="subject-header"
                  onClick={() => setExpandedSubject(expandedSubject === sub.id ? null : sub.id)}
                >
                  <div className="subject-title">
                    <span className="subject-code" style={{ color: uni.themeColor }}>{sub.code}</span>
                    {sub.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--student-text-muted)' }}>
                      {(sub.units?.length || 0)} unit{(sub.units?.length || 0) !== 1 ? 's' : ''}{sub.resources?.length ? ` • ${sub.resources.length} file${sub.resources.length !== 1 ? 's' : ''}` : ''}
                    </span>
                    <ChevronDown
                      size={18}
                      color="var(--student-text-muted)"
                      style={{ transform: expandedSubject === sub.id ? 'rotate(180deg)' : 'none', transition: 'var(--student-transition)' }}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {expandedSubject === sub.id && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{ open: { opacity: 1, height: "auto" }, collapsed: { opacity: 0, height: 0 } }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="subject-content">
                        {/* Units / Chapters (Collapsible) */}
                        {sub.units && sub.units.length > 0 && (
                          <div style={{ marginTop: '8px' }}>
                            {sub.units.map((unit, uIdx) => {
                              const isUnitOpen = expandedUnit === unit.id;
                              return (
                                <div key={unit.id} style={{ marginBottom: '8px', border: '1px solid var(--student-border)', borderRadius: '8px', overflow: 'hidden' }}>
                                  {/* Unit Header — clickable */}
                                  <div
                                    onClick={() => setExpandedUnit(isUnitOpen ? null : unit.id)}
                                    style={{
                                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                      padding: '12px 14px', cursor: 'pointer',
                                      background: isUnitOpen ? 'rgba(255,255,255,0.03)' : 'transparent',
                                      transition: 'var(--student-transition)'
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      {isUnitOpen ? <ChevronDown size={16} color={uni.themeColor} /> : <ChevronRight size={16} color="var(--student-text-muted)" />}
                                      <span style={{ fontSize: '0.7rem', color: uni.themeColor, fontWeight: 700, background: `${uni.themeColor}15`, padding: '2px 8px', borderRadius: '10px' }}>Unit {uIdx + 1}</span>
                                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{unit.title}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      {unit.notes && (
                                        <>
                                          <button 
                                            onClick={(e) => { e.stopPropagation(); triggerDownload(unit, sub.name); }}
                                            title="Download PDF"
                                            style={{ background: 'transparent', border: 'none', color: 'var(--student-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '50%', transition: 'background 0.2s' }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                          >
                                            <Download size={16} />
                                          </button>
                                          <button 
                                            onClick={(e) => { e.stopPropagation(); setFullscreenUnit({ ...unit, subjectName: sub.name }); }}
                                            title="Read in Fullscreen"
                                            style={{ background: 'transparent', border: 'none', color: 'var(--student-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '50%', transition: 'background 0.2s' }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                          >
                                            <Maximize size={16} />
                                          </button>
                                        </>
                                      )}
                                      {!unit.notes && <span style={{ fontSize: '0.75rem', color: 'var(--student-text-muted)' }}>Coming soon</span>}
                                    </div>
                                  </div>

                                  {/* Unit Content — collapsible */}
                                  <AnimatePresence>
                                    {isUnitOpen && (
                                      <motion.div
                                        initial="collapsed"
                                        animate="open"
                                        exit="collapsed"
                                        variants={{ open: { opacity: 1, height: 'auto' }, collapsed: { opacity: 0, height: 0 } }}
                                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                      >
                                        <div style={{ borderTop: '1px solid var(--student-border)' }}>
                                          {unit.notes ? (
                                            <div
                                              className="published-notes"
                                              dangerouslySetInnerHTML={{ __html: unit.notes }}
                                              style={{ background: 'rgba(0,0,0,0.1)', fontSize: `${0.95 * fontZoomLevel}rem` }}
                                            />
                                          ) : (
                                            <div style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--student-text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
                                              Notes for this unit are being prepared. Check back soon!
                                            </div>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Legacy flat notes (backwards compat) */}
                        {sub.notes && (!sub.units || sub.units.length === 0) && (
                          <div
                            className="published-notes"
                            dangerouslySetInnerHTML={{ __html: sub.notes }}
                            style={{ fontSize: `${0.95 * fontZoomLevel}rem` }}
                          />
                        )}

                        {/* File Resources */}
                        {sub.resources && sub.resources.length > 0 && (
                          <>
                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--student-text-muted)', marginTop: '12px', marginBottom: '8px' }}>
                              Attachments
                            </div>
                            {sub.resources.map(res => (
                              <div key={res.id} className="resource-item">
                                <div className="resource-info">
                                  {res.type === 'pdf' ? <FileText size={18} color="#ef4444" /> : <Link2 size={18} color="#3b82f6" />}
                                  <div>
                                    <div className="resource-title">{res.title}</div>
                                    <div className="resource-type" style={{ color: res.type === 'pdf' ? '#ef4444' : '#3b82f6' }}>{res.type.toUpperCase()}</div>
                                  </div>
                                </div>
                                {res.isFree !== false ? (
                                  <a href={res.link} target="_blank" rel="noopener noreferrer" className="resource-action" style={{ color: uni.themeColor }}>
                                    <Download size={14} /> View
                                  </a>
                                ) : (
                                  <span className="resource-action" style={{ color: '#f59e0b', cursor: 'not-allowed' }}>
                                    <Lock size={14} /> Locked
                                  </span>
                                )}
                              </div>
                            ))}
                          </>
                        )}

                        {/* No content at all */}
                        {(!sub.units || sub.units.length === 0) && !sub.notes && (!sub.resources || sub.resources.length === 0) && (
                          <div style={{ fontSize: '0.85rem', color: 'var(--student-text-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
                            Notes and resources for this subject will be uploaded soon. Stay tuned!
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Reading Overlay */}
      <AnimatePresence>
        {fullscreenUnit && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'var(--student-bg)',
              overflowY: 'auto'
            }}
          >
            <div className="fullscreen-wrapper" style={{ padding: '2rem 1rem' }}>
              <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                <button
                  className="fullscreen-close-btn"
                  onClick={() => setFullscreenUnit(null)}
                  style={{
                    position: 'fixed', top: '1.5rem', right: '1.5rem',
                  background: 'var(--student-surface)', border: '1px solid var(--student-border)',
                  color: 'var(--student-text)', width: '44px', height: '44px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10000,
                  transition: 'var(--student-transition)'
                }}
              >
                <X size={24} />
              </button>
              
              <div style={{ marginBottom: '2.5rem', marginTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: uni.themeColor, fontWeight: 700, background: `${uni.themeColor}15`, padding: '6px 14px', borderRadius: '50px', display: 'inline-block', marginBottom: '1.5rem' }}>
                  {sem.title} • {fullscreenUnit.subjectName}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', marginBottom: '1rem' }}>
                  <h1 style={{ fontSize: '2.8rem', margin: 0, color: 'var(--student-text)', lineHeight: 1.2, letterSpacing: '-0.02em', wordBreak: 'break-word', flex: 1 }}>
                    {fullscreenUnit.title}
                  </h1>
                  <button 
                    onClick={() => triggerDownload(fullscreenUnit, fullscreenUnit.subjectName)}
                    className="admin-btn"
                    style={{ background: uni.themeColor, color: '#000', padding: '10px 20px', borderRadius: '50px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}
                  >
                    <Download size={18} /> Download PDF
                  </button>
                </div>
              </div>

              <div
                className="published-notes fullscreen-notes"
                dangerouslySetInnerHTML={{ __html: fullscreenUnit.notes }}
                style={{ fontSize: `${0.95 * fontZoomLevel}rem` }}
              />
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Print Layout (A4 optimized) */}
      <div style={{ position: 'fixed', top: '-10000px', left: '-10000px', width: '210mm' }}>
        <div ref={printRef} className="print-only-wrapper">
          {/* Watermarks */}
          <div className="print-watermark">
            {[...Array(12)].map((_, i) => <span key={i}>bevpedia.in</span>)}
          </div>
          
          {printingUnit && (
            <div style={{ padding: '0 10px' }}>
              <div className="print-header">
                <div>
                  <div className="print-header-brand">BEVPEDIA</div>
                  <div style={{ fontSize: '9pt', color: '#30c88a', fontWeight: 'bold' }}>THE BEVERAGE ENCYCLOPEDIA</div>
                </div>
                <div className="print-header-info">
                  <strong>{uni?.name}</strong><br />
                  {sem?.title} • {printingUnit.subjectName}<br />
                  Academic Resource • bevpedia.in
                </div>
              </div>

              <h1 style={{ fontSize: '24pt', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                {printingUnit.title}
              </h1>

              <div 
                className="published-notes" 
                dangerouslySetInnerHTML={{ __html: printingUnit.notes }} 
              />
              
              <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '10px', fontSize: '8pt', color: '#999', textAlign: 'center' }}>
                © {new Date().getFullYear()} Bevpedia — Professional Hospitality Study Material. All Rights Reserved.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SemesterPage;
