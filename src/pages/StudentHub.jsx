import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchUniversityData } from '../Notes/studentData';
import ThemeToggle from '../Notes/ThemeToggle';
import '../styles/student.css';
import { Search, GraduationCap, School, Library, BookOpen } from 'lucide-react';

// Icon Map to dynamically render Lucide icons
const ICONS = {
  GraduationCap,
  School,
  Library,
  BookOpen
};

const StudentHub = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchUniversityData();
      setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="student-module-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'var(--student-text-muted)' }}>Loading Syllabus...</div>
      </div>
    );
  }

  const getGlobalResults = () => {
    if (!searchTerm.trim()) return { unis: data.universities, subjects: [] };
    const query = searchTerm.toLowerCase();

    // Filter Universities
    const matchingUnis = data.universities.filter(uni => 
      uni.name.toLowerCase().includes(query) || 
      uni.shortName.toLowerCase().includes(query)
    );

    // Filter Subjects and Units
    const matchingSubjects = [];
    data.subjects.forEach(sub => {
      const unitMatches = (sub.units || []).filter(u => u.title.toLowerCase().includes(query));
      const subMatch = sub.name.toLowerCase().includes(query) || sub.code.toLowerCase().includes(query);

      if (subMatch || unitMatches.length > 0) {
        const sem = data.semesters.find(s => s.id === sub.semesterId);
        const uni = data.universities.find(u => u.id === sem?.universityId);
        if (uni && sem) {
          matchingSubjects.push({
            ...sub,
            matchingUnits: unitMatches,
            uniName: uni.shortName,
            semTitle: sem.title,
            uniId: uni.id
          });
        }
      }
    });

    return { unis: matchingUnis, subjects: matchingSubjects };
  };

  const { unis: filteredUnis, subjects: filteredSubjects } = getGlobalResults();

  return (
    <div className="student-module-container">
      <div style={{ position: 'absolute', top: '100px', right: '4%' }}>
        <ThemeToggle />
      </div>
      <div className="student-header">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="student-title">Global Student Hub</h1>
          <p className="student-subtitle">
            Access, download, and contribute to free syllabus-aligned notes from universities around the globe.
          </p>
          
          <div style={{ maxWidth: '500px', margin: '2rem auto 0', position: 'relative' }}>
            <Search size={20} color="var(--student-text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search universities or courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: '48px', borderRadius: '50px' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Default View: University Grid */}
      {!searchTerm && (
        <div className="student-grid">
          {filteredUnis.map((uni, idx) => {
            const Icon = ICONS[uni.icon] || BookOpen;
            return (
              <motion.div 
                key={uni.id}
                className="student-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/students/${uni.id}`)}
                style={{ '--student-border-focus': uni.themeColor, '--student-surface-hover': `${uni.themeColor}10` }}
              >
                <div className="uni-card-header">
                  <div className="uni-icon-wrapper" style={{ color: uni.themeColor }}>
                    <Icon size={24} />
                  </div>
                  <h2 className="uni-title">{uni.shortName}</h2>
                </div>
                <p className="uni-desc">{uni.description}</p>
                
                <div className="uni-footer">
                  <span className="uni-programs-count">
                    {uni.programs.length} Program{uni.programs.length > 1 ? 's' : ''} available
                  </span>
                  <span style={{ color: uni.themeColor, fontSize: '1.2rem' }}>&rarr;</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Search Results View */}
      {searchTerm && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Universities Results */}
          {filteredUnis.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--student-text-muted)', marginBottom: '1.5rem' }}>Universities Matching "{searchTerm}"</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {filteredUnis.map(uni => (
                  <div 
                    key={uni.id} 
                    className="student-card" 
                    onClick={() => navigate(`/students/${uni.id}`)}
                    style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '12px' }}
                  >
                    <div style={{ color: uni.themeColor }}><School size={20} /></div>
                    <span style={{ fontWeight: 600 }}>{uni.shortName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subjects & Chapters Results */}
          <div>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--student-text-muted)', marginBottom: '1.5rem' }}>Subjects & Chapters Found</h3>
            {filteredSubjects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--student-surface)', borderRadius: '12px', color: 'var(--student-text-muted)' }}>
                No specific subjects or chapters found for "{searchTerm}".
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredSubjects.map((sub, idx) => (
                  <motion.div
                    key={`${sub.id}-${idx}`}
                    className="subject-accordion"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => navigate(`/students/${sub.uniId}/${sub.semesterId}`)}
                    style={{ padding: '1.25rem', cursor: 'pointer', border: '1px solid var(--student-border)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--student-accent)' }}>{sub.code}</span>
                          <span style={{ fontWeight: 600 }}>{sub.name}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--student-text-muted)' }}>
                          {sub.uniName} • {sub.semTitle}
                        </div>
                      </div>
                      <BookOpen size={18} color="var(--student-text-muted)" />
                    </div>
                    {sub.matchingUnits.length > 0 && (
                      <div style={{ marginTop: '12px', borderTop: '1px solid var(--student-border)', paddingTop: '8px' }}>
                        {sub.matchingUnits.map(u => (
                          <div key={u.id} style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--student-accent)', padding: '2px 0' }}>
                            <Library size={12} /> {u.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHub;
