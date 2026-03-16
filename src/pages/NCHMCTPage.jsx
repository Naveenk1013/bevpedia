import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const EXAM_DATA = {
  jee: {
    title: 'NCHMCT JEE',
    subtitle: 'Joint Entrance Examination for IHM Admissions',
    color: '#30c88a',
    target: 'Hospitality Aspirants (10+2)',
    focus: 'Securing admission to top Institute of Hotel Management (IHM) colleges across India.',
    features: [
      {
        name: 'Comprehensive Guidance',
        items: ['Eligibility criteria & reservation policy', 'State-wise IHM directory', 'Application process walkthrough']
      },
      {
        name: 'Study Materials',
        items: ['Numerical Ability & Analytical Aptitude', 'Reasoning & Logical Deduction', 'General Knowledge & Current Affairs', 'English Language proficiency']
      },
      {
        name: 'Mock Testing',
        items: ['Full-length simulation tests', 'Previous year question papers (2018-2024)', 'Sectional practice sets']
      }
    ]
  },
  nhtet: {
    title: 'NHTET',
    subtitle: 'National Hospitality Teachers Eligibility Test',
    color: '#7c5cfc',
    target: 'Graduates & Industry Professionals',
    focus: 'Qualifying to teach in NCHMCT-affiliated government institutes.',
    features: [
      {
        name: 'Teaching Career Path',
        items: ['Certification for Teaching Associates', 'Eligibility for Assistant Lecturer positions', 'Exam patterns and frequency']
      },
      {
        name: 'Expert Curriculum',
        items: ['Teaching & Research Aptitude', 'Hospitality Administration', 'Food Production & Beverage Service specialization']
      },
      {
        name: 'Professional Resources',
        items: ['Pedagogy study materials', 'Mock exams for Paper I, II & III', 'Interview preparation guides']
      }
    ]
  }
};

export default function NCHMCTPage() {
  const [activeTab, setActiveTab] = useState('jee');
  const data = EXAM_DATA[activeTab];

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <header className="page-header animate-fade-up">
        <Link to="/" style={{ color: 'var(--clr-accent)', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          NCHMCT <span style={{ color: 'var(--clr-accent3)' }}>Academic Center</span>
        </h1>
        <p className="text-muted" style={{ maxWidth: '800px', lineHeight: '1.6', fontSize: '1.1rem' }}>
          The Beverage Encyclopedia is proud to support the next generation of hospitality leaders. 
          Access free study materials, expert guidance, and professional mock testing for NCHMCT examinations.
        </p>
      </header>

      {/* Selector Tabs */}
      <div className="filter-bar animate-fade-up" style={{ marginTop: '2.5rem', justifyContent: 'center' }}>
        <button
          className={`filter-pill ${activeTab === 'jee' ? 'active' : ''}`}
          onClick={() => setActiveTab('jee')}
          style={{ 
            borderColor: activeTab === 'jee' ? EXAM_DATA.jee.color : 'var(--clr-border)',
            backgroundColor: activeTab === 'jee' ? `${EXAM_DATA.jee.color}20` : 'transparent',
            color: activeTab === 'jee' ? EXAM_DATA.jee.color : 'var(--clr-text)'
          }}
        >
          IHM Entrance (JEE)
        </button>
        <button
          className={`filter-pill ${activeTab === 'nhtet' ? 'active' : ''}`}
          onClick={() => setActiveTab('nhtet')}
          style={{ 
            borderColor: activeTab === 'nhtet' ? EXAM_DATA.nhtet.color : 'var(--clr-border)',
            backgroundColor: activeTab === 'nhtet' ? `${EXAM_DATA.nhtet.color}20` : 'transparent',
            color: activeTab === 'nhtet' ? EXAM_DATA.nhtet.color : 'var(--clr-text)'
          }}
        >
          Teaching Eligibility (NHTET)
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="wset-content-grid"
          style={{ marginTop: '3rem' }}
        >
          {/* Main Info Card */}
          <div className="detail-card" style={{ borderTop: `4px solid ${data.color}` }}>
            <div className="detail-card-header">
              <h2 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>{data.title}</h2>
              <p style={{ color: data.color, fontWeight: 'bold' }}>{data.subtitle}</p>
            </div>
            <div className="detail-card-body">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Primary Focus</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{data.focus}</p>
              
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--clr-surface-alt)', borderRadius: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Target Audience:</strong> {data.target}</p>
              </div>
            </div>
          </div>

          {/* Features / Syllabus Card */}
          <div className="detail-card">
            <div className="detail-card-header">
              <h3 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Resources & Guidance</h3>
            </div>
            <div className="detail-card-body">
              {data.features.map((feature, idx) => (
                <div key={idx} style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--clr-accent)', marginBottom: '0.4rem' }}>{feature.name}</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>
                    {feature.items.map((item, i) => <li key={i} style={{ marginBottom: '0.2rem' }}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Action Card */}
          <div className="detail-card" style={{ background: 'var(--clr-surface-alt)', borderColor: 'transparent' }}>
            <div className="detail-card-header">
              <h3 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Free Preparation</h3>
            </div>
            <div className="detail-card-body">
              <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '1.5rem' }}>
                Our research team is currently indexing thousands of pages of notes and question papers.
              </p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <button className="btn btn-primary" style={{ background: data.color, width: '100%' }}>Download Notes (PDF)</button>
                <button className="btn btn-outline" style={{ width: '100%' }}>Practice Mock Test</button>
                <button className="btn btn-ghost" style={{ width: '100%', fontSize: '0.8rem' }}>View Past Papers</button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <section style={{ marginTop: '5rem', textAlign: 'center' }}>
        <div style={{ 
          padding: '3rem', 
          background: 'linear-gradient(135deg, rgba(48, 200, 138, 0.05), rgba(124, 92, 252, 0.05))',
          borderRadius: '24px',
          border: '1px solid var(--clr-border)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Help Us Expand</h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
            Are you a student or professional with quality study materials? Contribute to our open encyclopedia and help thousands of learners.
          </p>
          <button className="btn btn-outline">Submit Study Material</button>
        </div>
      </section>
    </div>
  );
}
