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

  const filteredUnis = data?.universities.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    uni.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="student-grid">
        {filteredUnis?.map((uni, idx) => {
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

        {filteredUnis?.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--student-text-muted)', padding: '3rem' }}>
            No universities found locally. Are you an admin? Try adding one using the admin panel.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHub;
