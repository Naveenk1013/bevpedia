import React, { useState, useEffect } from 'react';
import { initialStudentData } from './studentData';
import NotesEditor from './NotesEditor';
import '../styles/student.css';
import { Save, Plus, Trash2, Database, ChevronDown, ChevronRight, Edit3, BookOpen, Layers, FileEdit } from 'lucide-react';
import SEO from '../components/SEO';

const StudentAdmin = () => {
  const [data, setData] = useState(initialStudentData);
  const [expandedUni, setExpandedUni] = useState(null);
  const [expandedSem, setExpandedSem] = useState(null);
  const [expandedSubject, setExpandedSubject] = useState(null); // which subject's units are visible
  const [editingUnit, setEditingUnit] = useState(null); // which unit's editor is open
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');


  // ── Save to codebase via Vite plugin ──
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/save-student-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setSaveStatus('✅ Saved to code! Now just commit & push.');
      } else {
        throw new Error('fail');
      }
    } catch {
      setSaveStatus('⚠️ Vite server not reachable. Data saved to localStorage only.');
    }
    setSaving(false);
    setTimeout(() => setSaveStatus(''), 5000);
  };

  // ── University CRUD ──
  const addUniversity = () => {
    const id = `uni_${Date.now()}`;
    setData({
      ...data,
      universities: [...data.universities, {
        id, name: '', shortName: '', description: '', themeColor: '#30c88a', icon: 'School', programs: [{ id: `prog_${Date.now()}`, name: 'Default Program', duration: '' }]
      }]
    });
    setExpandedUni(id);
  };

  const updateUni = (id, field, value) => {
    setData({ ...data, universities: data.universities.map(u => u.id === id ? { ...u, [field]: value } : u) });
  };

  const deleteUni = (id) => {
    if (!confirm('Delete this university and ALL its semesters/subjects?')) return;
    const semIds = data.semesters.filter(s => s.universityId === id).map(s => s.id);
    setData({
      ...data,
      universities: data.universities.filter(u => u.id !== id),
      semesters: data.semesters.filter(s => s.universityId !== id),
      subjects: data.subjects.filter(s => !semIds.includes(s.semesterId))
    });
  };

  // ── Semester CRUD ──
  const addSemester = (uniId) => {
    const uniSems = data.semesters.filter(s => s.universityId === uniId);
    const nextOrder = uniSems.length + 1;
    const progId = data.universities.find(u => u.id === uniId)?.programs[0]?.id || '';
    const newSem = {
      id: `sem_${Date.now()}`,
      universityId: uniId,
      programId: progId,
      title: `Semester ${nextOrder}`,
      order: nextOrder
    };
    setData({ ...data, semesters: [...data.semesters, newSem] });
  };

  const updateSem = (id, field, value) => {
    setData({ ...data, semesters: data.semesters.map(s => s.id === id ? { ...s, [field]: value } : s) });
  };

  const deleteSem = (id) => {
    if (!confirm('Delete this semester and all its subjects?')) return;
    setData({
      ...data,
      semesters: data.semesters.filter(s => s.id !== id),
      subjects: data.subjects.filter(s => s.semesterId !== id)
    });
  };

  // ── Subject CRUD ──
  const addSubject = (semId) => {
    const semSubs = data.subjects.filter(s => s.semesterId === semId);
    const newSub = {
      id: `sub_${Date.now()}`,
      semesterId: semId,
      code: `SUB${semSubs.length + 1}`,
      name: '',
      units: [],
      resources: []
    };
    setData({ ...data, subjects: [...data.subjects, newSub] });
  };

  const updateSubject = (id, field, value) => {
    setData({ ...data, subjects: data.subjects.map(s => s.id === id ? { ...s, [field]: value } : s) });
  };

  const deleteSubject = (id) => {
    setData({ ...data, subjects: data.subjects.filter(s => s.id !== id) });
  };

  // ── Unit/Chapter CRUD ──
  const addUnit = (subId) => {
    const sub = data.subjects.find(s => s.id === subId);
    const units = sub.units || [];
    const newUnit = {
      id: `unit_${Date.now()}`,
      title: `Unit ${units.length + 1}`,
      order: units.length + 1,
      notes: ''
    };
    updateSubject(subId, 'units', [...units, newUnit]);
  };

  const updateUnit = (subId, unitId, field, value) => {
    const sub = data.subjects.find(s => s.id === subId);
    const updated = (sub.units || []).map(u => u.id === unitId ? { ...u, [field]: value } : u);
    updateSubject(subId, 'units', updated);
  };

  const deleteUnit = (subId, unitId) => {
    const sub = data.subjects.find(s => s.id === subId);
    updateSubject(subId, 'units', (sub.units || []).filter(u => u.id !== unitId));
  };

  // ── Resource CRUD ──
  const addResource = (subId) => {
    const sub = data.subjects.find(s => s.id === subId);
    const newRes = { id: `res_${Date.now()}`, title: '', type: 'pdf', link: '', isFree: true };
    updateSubject(subId, 'resources', [...(sub.resources || []), newRes]);
  };

  const updateResource = (subId, resId, field, value) => {
    const sub = data.subjects.find(s => s.id === subId);
    const updatedResources = sub.resources.map(r => r.id === resId ? { ...r, [field]: value } : r);
    updateSubject(subId, 'resources', updatedResources);
  };

  const deleteResource = (subId, resId) => {
    const sub = data.subjects.find(s => s.id === subId);
    updateSubject(subId, 'resources', sub.resources.filter(r => r.id !== resId));
  };

  return (
    <div className="student-module-container" style={{ padding: '2rem 4%' }}>
      <SEO title="Admin Control Panel" noindex description="Internal management tools for Student Hub data." />
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="student-title" style={{ fontSize: '2rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={26} /> Admin Control Panel
          </h1>
          <p style={{ color: 'var(--student-text-muted)', margin: 0, fontSize: '0.9rem' }}>
            Manage Universities → Semesters → Subjects → Resources. Hit save to write directly to your codebase.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {saveStatus && <span style={{ fontSize: '0.85rem', color: saveStatus.includes('✅') ? '#30c88a' : '#f59e0b' }}>{saveStatus}</span>}
          <span className="admin-badge">Admin</span>
          <button className="admin-btn" onClick={handleSave} disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save to Code'}
          </button>
        </div>
      </div>

      {/* Add University */}
      <button className="admin-btn admin-btn-secondary" onClick={addUniversity} style={{ marginBottom: '1.5rem' }}>
        <Plus size={16} /> Add University / Institute
      </button>

      {/* University List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {data.universities.map(uni => {
          const isExpanded = expandedUni === uni.id;
          const uniSemesters = data.semesters.filter(s => s.universityId === uni.id).sort((a, b) => a.order - b.order);

          return (
            <div key={uni.id} className="student-card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* University Header Row */}
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', cursor: 'pointer', background: isExpanded ? 'rgba(255,255,255,0.03)' : 'transparent' }}
                onClick={() => setExpandedUni(isExpanded ? null : uni.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {isExpanded ? <ChevronDown size={18} color={uni.themeColor} /> : <ChevronRight size={18} color={uni.themeColor} />}
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{uni.shortName || 'New University'}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--student-text-muted)' }}>— {uni.name}</span>
                  <span style={{ fontSize: '0.75rem', color: uni.themeColor, background: `${uni.themeColor}15`, padding: '2px 8px', borderRadius: '10px' }}>{uniSemesters.length} Semesters</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); deleteUni(uni.id); }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Expanded University Detail */}
              {isExpanded && (
                <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--student-border)' }}>
                  {/* Edit University Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label className="admin-label">Full Name</label>
                      <input className="admin-input" value={uni.name} onChange={e => updateUni(uni.id, 'name', e.target.value)} placeholder="Gujarat Technological University" />
                    </div>
                    <div>
                      <label className="admin-label">Short Name</label>
                      <input className="admin-input" value={uni.shortName} onChange={e => updateUni(uni.id, 'shortName', e.target.value)} placeholder="GTU" />
                    </div>
                    <div>
                      <label className="admin-label">Theme Color</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input type="color" value={uni.themeColor} onChange={e => updateUni(uni.id, 'themeColor', e.target.value)} style={{ width: '38px', height: '38px', border: 'none', background: 'none', cursor: 'pointer' }} />
                        <input className="admin-input" value={uni.themeColor} onChange={e => updateUni(uni.id, 'themeColor', e.target.value)} style={{ flexGrow: 1 }} />
                      </div>
                    </div>
                    <div style={{ gridColumn: 'span 3' }}>
                      <label className="admin-label">Description</label>
                      <textarea className="admin-input admin-textarea" value={uni.description} onChange={e => updateUni(uni.id, 'description', e.target.value)} />
                    </div>
                  </div>

                  {/* Semesters Section */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Layers size={16} color={uni.themeColor} /> Semesters</h3>
                    <button className="admin-btn admin-btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => addSemester(uni.id)}>
                      <Plus size={14} /> Add Semester
                    </button>
                  </div>

                  {uniSemesters.map(sem => {
                    const isSemExpanded = expandedSem === sem.id;
                    const semSubjects = data.subjects.filter(s => s.semesterId === sem.id);

                    return (
                      <div key={sem.id} style={{ border: '1px solid var(--student-border)', borderRadius: 'var(--student-radius-sm)', marginBottom: '8px', overflow: 'hidden' }}>
                        {/* Semester Header */}
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', cursor: 'pointer', background: isSemExpanded ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                          onClick={() => setExpandedSem(isSemExpanded ? null : sem.id)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {isSemExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            <input
                              className="admin-input"
                              value={sem.title}
                              onClick={e => e.stopPropagation()}
                              onChange={e => updateSem(sem.id, 'title', e.target.value)}
                              style={{ padding: '4px 8px', fontSize: '0.9rem', width: 'auto', minWidth: '120px' }}
                            />
                            <span style={{ fontSize: '0.75rem', color: 'var(--student-text-muted)' }}>{semSubjects.length} subjects</span>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); deleteSem(sem.id); }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Expanded Semester — Subjects */}
                        {isSemExpanded && (
                          <div style={{ padding: '10px 14px', borderTop: '1px solid var(--student-border)', background: 'rgba(0,0,0,0.15)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                              <span style={{ fontSize: '0.8rem', color: 'var(--student-text-muted)' }}>Subjects</span>
                              <button className="admin-btn admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => addSubject(sem.id)}>
                                <Plus size={12} /> Subject
                              </button>
                            </div>

                            {semSubjects.map(sub => {
                              const isSubExpanded = expandedSubject === sub.id;
                              const units = sub.units || [];
                              return (
                                <div key={sub.id} style={{ marginBottom: '12px', border: '1px solid var(--student-border)', borderRadius: '8px', overflow: 'hidden' }}>
                                  {/* Subject Header Row */}
                                  <div
                                    style={{ display: 'grid', gridTemplateColumns: '20px 80px 1fr auto auto', gap: '8px', alignItems: 'center', padding: '8px 10px', cursor: 'pointer', background: isSubExpanded ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                                    onClick={() => setExpandedSubject(isSubExpanded ? null : sub.id)}
                                  >
                                    {isSubExpanded ? <ChevronDown size={14} color="#30c88a" /> : <ChevronRight size={14} />}
                                    <input className="admin-input" value={sub.code} onClick={e => e.stopPropagation()} onChange={e => updateSubject(sub.id, 'code', e.target.value)} style={{ padding: '6px 8px', fontSize: '0.8rem' }} placeholder="Code" />
                                    <input className="admin-input" value={sub.name} onClick={e => e.stopPropagation()} onChange={e => updateSubject(sub.id, 'name', e.target.value)} style={{ padding: '6px 8px', fontSize: '0.8rem' }} placeholder="Subject Name" />
                                    <span style={{ fontSize: '0.7rem', color: 'var(--student-text-muted)', whiteSpace: 'nowrap' }}>{units.length} unit{units.length !== 1 ? 's' : ''}</span>
                                    <button onClick={(e) => { e.stopPropagation(); deleteSubject(sub.id); }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                      <Trash2 size={14} />
                                    </button>
                                  </div>

                                  {/* Expanded Subject — Units/Chapters */}
                                  {isSubExpanded && (
                                    <div style={{ padding: '10px 14px', borderTop: '1px solid var(--student-border)', background: 'rgba(0,0,0,0.1)' }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--student-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><BookOpen size={14} /> Units / Chapters</span>
                                        <button className="admin-btn admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => addUnit(sub.id)}>
                                          <Plus size={12} /> Add Unit
                                        </button>
                                      </div>

                                      {units.length === 0 && (
                                        <div style={{ fontSize: '0.8rem', color: 'var(--student-text-muted)', fontStyle: 'italic', padding: '1rem 0' }}>No units added yet. Click "Add Unit" to create chapters.</div>
                                      )}

                                      {units.map((unit, uIdx) => {
                                        const isUnitEditing = editingUnit === unit.id;
                                        return (
                                          <div key={unit.id} style={{ marginBottom: '10px', border: '1px solid var(--student-border)', borderRadius: '6px', overflow: 'hidden' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: isUnitEditing ? 'rgba(48,200,138,0.05)' : 'transparent' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                                <span style={{ fontSize: '0.7rem', color: '#30c88a', fontWeight: 700, minWidth: '28px' }}>U{uIdx + 1}</span>
                                                <input
                                                  className="admin-input"
                                                  value={unit.title}
                                                  onChange={e => updateUnit(sub.id, unit.id, 'title', e.target.value)}
                                                  style={{ padding: '4px 8px', fontSize: '0.85rem', flex: 1 }}
                                                  placeholder="Unit / Chapter Title"
                                                />
                                              </div>
                                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                <button
                                                  onClick={() => setEditingUnit(isUnitEditing ? null : unit.id)}
                                                  style={{
                                                    background: isUnitEditing ? 'rgba(48,200,138,0.15)' : 'transparent',
                                                    border: `1px solid ${isUnitEditing ? '#30c88a' : 'var(--student-border)'}`,
                                                    color: isUnitEditing ? '#30c88a' : 'var(--student-text-muted)',
                                                    borderRadius: '6px', padding: '4px 8px', cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem'
                                                  }}
                                                >
                                                  <FileEdit size={12} /> {unit.notes ? 'Edit' : 'Write'}
                                                </button>
                                                <button onClick={() => deleteUnit(sub.id, unit.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                                  <Trash2 size={13} />
                                                </button>
                                              </div>
                                            </div>

                                            {/* Unit Notes Editor */}
                                            {isUnitEditing && (
                                              <div style={{ padding: '0 10px 10px', borderTop: '1px solid var(--student-border)' }}>
                                                <NotesEditor
                                                  content={unit.notes || ''}
                                                  onChange={(html) => updateUnit(sub.id, unit.id, 'notes', html)}
                                                  placeholder={`Write notes for ${unit.title || 'this unit'}...`}
                                                />
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentAdmin;
