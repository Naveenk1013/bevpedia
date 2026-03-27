import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchUniversityData } from '../Notes/studentData';
import ThemeToggle from '../Notes/ThemeToggle';
import '../styles/student.css';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';

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

        {/* Semester Grid */}
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
      </div>
    </div>
  );
};

export default UniversityView;
