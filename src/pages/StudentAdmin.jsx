import React, { useState, useEffect } from 'react';
import { initialStudentData } from '../data/studentData';
import '../styles/student.css';
import { Save, Plus, Trash2, ArrowLeft, Database } from 'lucide-react';

const StudentAdmin = () => {
  const [data, setData] = useState(initialStudentData);
  const [activeTab, setActiveTab] = useState('universities');
  const [generatedJSON, setGeneratedJSON] = useState('');

  // Local state persistence for the admin
  useEffect(() => {
    const saved = localStorage.getItem('studentHubData');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleSaveToCode = async () => {
    try {
      // Still persist to local storage for instant UI updates
      localStorage.setItem('studentHubData', JSON.stringify(data));
      
      const response = await fetch('/api/save-student-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        alert('✨ Magic! The data was successfully written directly to src/data/studentData.js. You can now just commit and push the changes!');
        setGeneratedJSON(''); // Hide code box if successful
      } else {
        throw new Error('Server returned non-200');
      }
    } catch (e) {
      console.error(e);
      alert('Could not save natively. Is the Vite dev server running? Falling back to manual copy-paste mode.');
      handleGenerateFallback();
    }
  };

  const handleGenerateFallback = () => {
    localStorage.setItem('studentHubData', JSON.stringify(data));
    const codeString = `/* \n  Initial Data Schema for the Student Hub \n  Structured to mimic a NoSQL database (like MongoDB/Firebase) for easy migration later.\n*/\n\nexport const initialStudentData = ${JSON.stringify(data, null, 2)};\n\nexport const fetchUniversityData = async () => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      const savedData = localStorage.getItem('studentHubData');\n      if (savedData) {\n        resolve(JSON.parse(savedData));\n      } else {\n        resolve(initialStudentData);\n      }\n    }, 400);\n  });\n};\n`;
    setGeneratedJSON(codeString);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedJSON);
    alert('Code copied to clipboard! Paste it into src/data/studentData.js');
  };

  const addUniversity = () => {
    const newUni = {
      id: `uni_${Date.now()}`,
      name: 'New University',
      shortName: 'NEW',
      description: 'Syllabus description...',
      themeColor: '#30c88a',
      icon: 'School',
      programs: []
    };
    setData({ ...data, universities: [...data.universities, newUni] });
  };

  const updateUniversity = (id, field, value) => {
    const updated = data.universities.map(u => u.id === id ? { ...u, [field]: value } : u);
    setData({ ...data, universities: updated });
  };

  const deleteUniversity = (id) => {
    setData({
      ...data,
      universities: data.universities.filter(u => u.id !== id),
      semesters: data.semesters.filter(s => s.universityId !== id)
    });
  };

  return (
    <div className="student-module-container" style={{ padding: '2rem 5%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="student-title" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Database size={28} /> Admin Control Panel
          </h1>
          <p className="student-subtitle" style={{ margin: 0 }}>Add, edit, or remove syllabus resources dynamically.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span className="admin-badge">Admin Mode</span>
          <button className="admin-btn" onClick={handleSaveToCode}>
            <Save size={18} /> Save Directly to Code
          </button>
        </div>
      </div>

      {generatedJSON && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ color: '#30c88a', margin: 0 }}>Generated Source Code</h3>
            <button className="admin-btn-secondary" onClick={handleCopy} style={{ padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer' }}>Copy to Clipboard</button>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--student-text-muted)' }}>
            To permanently save your changes, copy this code and completely replace the contents of <code>src/data/studentData.js</code>. Wait until migration to MongoDB/Firebase to stop doing this!
          </p>
          <pre className="admin-code-block" style={{ maxHeight: '300px' }}>
            {generatedJSON}
          </pre>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--student-border)', paddingBottom: '1rem' }}>
        {['universities', 'semesters', 'subjects'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              background: activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: activeTab === tab ? 'var(--student-text)' : 'var(--student-text-muted)',
              border: `1px solid ${activeTab === tab ? 'rgba(255,255,255,0.2)' : 'transparent'}`,
              borderRadius: '20px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            Manage {tab}
          </button>
        ))}
      </div>

      {activeTab === 'universities' && (
        <div>
          <button className="admin-btn admin-btn-secondary" onClick={addUniversity} style={{ marginBottom: '1.5rem' }}>
            <Plus size={16} /> Add University / Institute
          </button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.universities.map(uni => (
              <div key={uni.id} className="student-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'flex-start', padding: '1.5rem' }}>
                <div>
                  <label className="admin-label">Full Name</label>
                  <input className="admin-input" value={uni.name} onChange={e => updateUniversity(uni.id, 'name', e.target.value)} />
                </div>
                <div>
                  <label className="admin-label">Short Name (Acronym)</label>
                  <input className="admin-input" value={uni.shortName} onChange={e => updateUniversity(uni.id, 'shortName', e.target.value)} />
                </div>
                <div>
                  <label className="admin-label">Theme Color (Hex)</label>
                  <input className="admin-input" value={uni.themeColor} onChange={e => updateUniversity(uni.id, 'themeColor', e.target.value)} />
                </div>
                <button 
                  onClick={() => deleteUniversity(uni.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', marginTop: '28px' }}
                >
                  <Trash2 size={20} />
                </button>
                <div style={{ gridColumn: 'span 3' }}>
                  <label className="admin-label">Description</label>
                  <textarea className="admin-input admin-textarea" value={uni.description} onChange={e => updateUniversity(uni.id, 'description', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab !== 'universities' && (
        <div className="student-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <Database size={48} color="var(--student-text-muted)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
          <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h3>
          <p style={{ color: 'var(--student-text-muted)' }}>
            The UI for editing detailed Semesters and Subjects JSON structure goes here. 
            For now, you can edit the raw JSON via the output above or use the underlying data file.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentAdmin;
