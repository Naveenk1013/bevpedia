import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchUniversityData } from '../Notes/studentData';
import ThemeToggle from '../Notes/ThemeToggle';
import '../styles/student.css';
import { ArrowLeft, BookOpen, Layers, FileText, ExternalLink } from 'lucide-react';

const RPJ_COLORS = {
  'RPJ-01': { tag: 'AI & Technology', color: '#7c5cfc' },
  'RPJ-02': { tag: 'F&B Management', color: '#30c88a' },
  'RPJ-03': { tag: 'Human Resources', color: '#e05c5c' },
  'RPJ-04': { tag: 'Travel & Tourism', color: '#f0a113' },
  'RPJ-05': { tag: 'Marketing & Tech', color: '#3a9fd6' },
};
const DEFAULT_RPJ = { tag: 'TBD', color: '#64748b' };
import SEO from '../components/SEO';

const UniversityView = () => {
  const { uniId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchUniversityData();
      setData(result);
      const uni = result.universities.find(u => u.id === uniId);
      if (uni && uni.programs.length > 0) setSelectedProgram(uni.programs[0].id);
      setLoading(false);
    };
    load();
  }, [uniId]);

  if (loading || !data) {
    return (
      <div className="student-module-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ color: 'var(--student-text-muted)' }}>Loading...</div>
      </div>
    );
  }

  const uni = data.universities.find(u => u.id === uniId);
  if (!uni) {
    return (
      <div className="student-module-container" style={{ textAlign: 'center', paddingTop: '8rem' }}>
        <h2>University Not Found</h2>
        <button className="admin-btn" onClick={() => navigate('/students')} style={{ marginTop: '1rem' }}>Back to Hub</button>
      </div>
    );
  }

  const semesters = data.semesters
    .filter(s => s.universityId === uniId && s.programId === selectedProgram)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="student-module-container">
      <SEO 
        title={`${uni.shortName} Syllabus & Notes`}
        description={`Access syllabus-aligned notes, study material, and resources for ${uni.name} (${uni.shortName}). Free academic resources for hospitality students.`}
        canonical={`https://bevpedia.in/students/${uniId}`}
      />
      <div className="semester-container">
        <div style={{ position: 'absolute', top: '24px', right: '4%' }}>
          <ThemeToggle />
        </div>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--student-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          <span style={{ cursor: 'pointer', color: uni.themeColor }} onClick={() => navigate('/students')}>Student Hub</span>
          <span>/</span>
          <span style={{ color: 'var(--student-text)' }}>{uni.shortName}</span>
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
            <button className="back-btn" onClick={() => navigate('/students')}>
              <ArrowLeft size={16} />
            </button>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>
              <span style={{ color: uni.themeColor }}>{uni.shortName}</span> Syllabus
            </h1>
          </div>
          <p style={{ color: 'var(--student-text-muted)', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '600px' }}>
            {uni.description}
          </p>
        </motion.div>

        {/* Program Tabs */}
        {uni.programs.length > 1 && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto' }}>
            {uni.programs.map(prog => (
              <button
                key={prog.id}
                onClick={() => setSelectedProgram(prog.id)}
                style={{
                  background: selectedProgram === prog.id ? `${uni.themeColor}20` : 'transparent',
                  color: selectedProgram === prog.id ? uni.themeColor : 'var(--student-text-muted)',
                  border: `1px solid ${selectedProgram === prog.id ? uni.themeColor : 'var(--student-border)'}`,
                  padding: '8px 18px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: selectedProgram === prog.id ? '600' : '400',
                  transition: 'all 0.3s ease'
                }}
              >
                {prog.name} <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>({prog.duration})</span>
              </button>
            ))}
          </div>
        )}

        {/* Research Hub — Custom Card Layout */}
        {uniId === 'uni_research' ? (
          <>
            {semesters.map((sem, semIdx) => {
              const semSubjects = data.subjects.filter(s => s.semesterId === sem.id);
              const isRPJ = sem.id === 'sem_research_rpj';

              return (
                <motion.div
                  key={sem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: semIdx * 0.15 }}
                  style={{
                    background: 'var(--student-surface)',
                    border: '1px solid var(--student-border)',
                    borderRadius: 'var(--student-radius-lg)',
                    padding: '2.5rem',
                    backdropFilter: 'var(--student-blur)',
                    marginBottom: '2rem',
                  }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${uni.themeColor}15`, padding: '6px 16px', borderRadius: '20px', marginBottom: '1rem' }}>
                      <FileText size={14} color={uni.themeColor} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: uni.themeColor, textTransform: 'uppercase', letterSpacing: '1.5px' }}>{sem.title}</span>
                    </div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>{sem.title}</h2>
                    {isRPJ && (
                      <p style={{ color: 'var(--student-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', fontSize: '0.9rem' }}>
                        Reference these approved research projects to understand structure, formatting, and methodology for your final semester dissertation.
                      </p>
                    )}
                  </div>

                  {isRPJ && semSubjects.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                      {semSubjects.map((sample, idx) => {
                        const meta = RPJ_COLORS[sample.code] || DEFAULT_RPJ;
                        const driveLink = sample.resources?.[0]?.link;
                        const hasLink = driveLink && driveLink !== '#';
                        return (
                          <motion.div
                            key={sample.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            style={{
                              background: 'var(--student-surface-hover)',
                              border: '1px solid var(--student-border)',
                              borderRadius: 'var(--student-radius-md)',
                              padding: '1.5rem',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1rem',
                              transition: 'var(--student-transition)',
                              cursor: hasLink ? 'pointer' : 'default',
                              opacity: hasLink ? 1 : 0.5,
                            }}
                            onClick={() => hasLink && window.open(driveLink, '_blank')}
                            onMouseEnter={e => {
                              if (hasLink) {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.borderColor = meta.color;
                                e.currentTarget.style.boxShadow = `0 12px 30px ${meta.color}15`;
                              }
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.borderColor = 'var(--student-border)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: `${meta.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <FileText size={20} color={meta.color} />
                              </div>
                              {hasLink && <ExternalLink size={16} color="var(--student-text-muted)" style={{ marginTop: '4px', flexShrink: 0 }} />}
                            </div>
                            <div>
                              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: meta.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{meta.tag}</span>
                              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '0.4rem', lineHeight: 1.4 }}>{sample.name}</h3>
                            </div>
                            <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--student-border)' }}>
                              <span style={{ fontSize: '0.8rem', color: hasLink ? meta.color : 'var(--student-text-muted)', fontWeight: 600 }}>
                                {hasLink ? 'View on Google Drive →' : 'Available Soon'}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--student-surface-hover)', border: '1px dashed var(--student-border)', borderRadius: 'var(--student-radius-md)' }}>
                      <p style={{ color: 'var(--student-text-muted)', fontSize: '0.9rem', margin: 0 }}>
                        🏨 <strong>{sem.title}</strong> — Coming soon! Content will be available here for your reference.
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {semesters.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--student-text-muted)', background: 'var(--student-surface)', borderRadius: 'var(--student-radius-lg)', border: '1px dashed var(--student-border)' }}>
                <BookOpen size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <h3>No Content Yet</h3>
                <p style={{ fontSize: '0.9rem' }}>Research materials will be added soon.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Standard Semester Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1rem'
            }}>
              {semesters.map((sem, idx) => {
                const subjectCount = data.subjects.filter(s => s.semesterId === sem.id).length;
                return (
                  <motion.div
                    key={sem.id}
                    className="student-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => navigate(`/students/${uniId}/${sem.id}`)}
                    style={{ textAlign: 'center', padding: '2rem 1.5rem' }}
                  >
                    <Layers size={28} color={uni.themeColor} style={{ marginBottom: '0.75rem' }} />
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{sem.title}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--student-text-muted)' }}>
                      {subjectCount} subject{subjectCount !== 1 ? 's' : ''}
                    </span>
                    <div style={{ marginTop: '1rem', color: uni.themeColor, fontSize: '0.85rem', fontWeight: 600 }}>
                      View Notes →
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {semesters.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--student-text-muted)', background: 'var(--student-surface)', borderRadius: 'var(--student-radius-lg)', border: '1px dashed var(--student-border)' }}>
                <BookOpen size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <h3>No Semesters Available</h3>
                <p style={{ fontSize: '0.9rem' }}>Semesters for this program have not been added yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UniversityView;
