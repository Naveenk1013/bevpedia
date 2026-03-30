import { useState, useRef, useCallback } from 'react';
import {
  DOCUMENT_TEMPLATES,
  TEMPLATE_CATEGORIES,
  CITATION_STYLES,
  METADATA_FIELD_DEFS,
} from '../data/documentTemplates';
import { generateScholarDocx } from './DocxGenerator';
import '../styles/Notebook.css';

// ─────────────────────────────────────────────────────────────────────────────
// Spinner
// ─────────────────────────────────────────────────────────────────────────────
function Spinner({ size = 5 }) {
  return <div className={`w-${size} h-${size} border-2 border-white border-t-transparent rounded-full animate-spin`} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Small helpers
// ─────────────────────────────────────────────────────────────────────────────
function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

let _imgId = 0;
function nextImgId() { return ++_imgId; }
let _tblId = 0;
function nextTblId() { return ++_tblId; }

// ─────────────────────────────────────────────────────────────────────────────
// Table Builder Modal
// ─────────────────────────────────────────────────────────────────────────────
function TableBuilder({ onInsert, onClose }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [caption, setCaption] = useState('');
  const [cells, setCells] = useState(() => Array.from({ length: 3 }, () => Array(3).fill('')));

  const resize = (r, c) => {
    setCells(prev => {
      const next = [];
      for (let i = 0; i < r; i++) {
        const row = [];
        for (let j = 0; j < c; j++) row.push(prev[i]?.[j] ?? '');
        next.push(row);
      }
      return next;
    });
    setRows(r);
    setCols(c);
  };

  return (
    <div className="nb-modal-overlay" onClick={onClose}>
      <div className="nb-modal-content" onClick={e => e.stopPropagation()}>
        <h4 className="text-lg font-semibold text-white mb-4">Insert Table</h4>

        <div className="flex gap-4 mb-4">
          <label className="nb-label flex items-center gap-2">
            Rows
            <input type="number" min={1} max={20} value={rows}
              onChange={e => resize(Number(e.target.value) || 1, cols)}
              className="w-16 nb-input text-center py-1" />
          </label>
          <label className="nb-label flex items-center gap-2">
            Columns
            <input type="number" min={1} max={10} value={cols}
              onChange={e => resize(rows, Number(e.target.value) || 1)}
              className="w-16 nb-input text-center py-1" />
          </label>
        </div>

        <div className="overflow-auto max-h-64 mb-4 rounded-lg border border-white/10">
          <table className="w-full text-sm">
            <tbody>
              {cells.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-white/10 p-0">
                      <input
                        value={cell}
                        onChange={e => {
                          const next = cells.map(r => [...r]);
                          next[ri][ci] = e.target.value;
                          setCells(next);
                        }}
                        placeholder={ri === 0 ? `Header ${ci + 1}` : ''}
                        className={`w-full bg-transparent px-2 py-1.5 text-white placeholder-slate-600 focus:outline-none focus:bg-white/5 ${ri === 0 ? 'font-semibold text-cyan-300' : ''}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <input
          type="text" value={caption} onChange={e => setCaption(e.target.value)}
          placeholder="Table caption (e.g. Demographic characteristics of respondents)"
          className="nb-input mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="nb-btn nb-btn-ghost">Cancel</button>
          <button
            onClick={() => onInsert({ id: nextTblId(), rows: cells, caption })}
            className="nb-btn nb-btn-primary"
          >Insert Table</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Editor (single section)
// ─────────────────────────────────────────────────────────────────────────────
function SectionEditor({ section, index, total, onUpdate, onRemove, onMove, sectionNumber }) {
  const imgInputRef = useRef(null);
  const [showTableBuilder, setShowTableBuilder] = useState(false);

  const updateField = (field, value) => onUpdate({ ...section, [field]: value });

  const addImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = { id: nextImgId(), dataUrl: reader.result, name: file.name, caption: '' };
      updateField('images', [...(section.images || []), img]);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (imgId) => updateField('images', (section.images || []).filter(i => i.id !== imgId));
  const updateImageCaption = (imgId, caption) => {
    updateField('images', (section.images || []).map(i => i.id === imgId ? { ...i, caption } : i));
  };
  const insertTable = (tbl) => {
    updateField('tables', [...(section.tables || []), tbl]);
    setShowTableBuilder(false);
  };
  const removeTable = (tblId) => updateField('tables', (section.tables || []).filter(t => t.id !== tblId));

  return (
    <>
      <div className="nb-card p-6 space-y-4 border-white/5 bg-[#0a0f1e]/80">
        {/* Header row */}
        <div className="flex items-center gap-4">
          <div className="nb-number-box">{sectionNumber}</div>
          <input
            type="text" value={section.title}
            onChange={e => updateField('title', e.target.value)}
            placeholder="Section heading"
            className="flex-1 bg-transparent border-none text-white text-lg font-bold placeholder-slate-600 focus:outline-none"
          />
          <div className="flex gap-2 shrink-0">
             <button onClick={() => onRemove(index)} className="p-1.5 text-slate-600 hover:text-rose-400 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>

        {/* Subsections hint (Tokens) */}
        {section.subsections && section.subsections.length > 0 && (
          <div className="flex flex-wrap gap-2 ml-10">
            {section.subsections.map((sub, si) => (
              <span key={si} className="nb-token lowercase">{sub}</span>
            ))}
          </div>
        )}

        {/* Body textarea */}
        <div className="relative ml-10">
          <textarea
            value={section.body || ''}
            onChange={e => updateField('body', e.target.value)}
            placeholder={section.placeholder || 'Write the content of this section…'}
            className="nb-textarea nb-scrollbar min-h-[160px] bg-slate-900/40 border-white/5"
          />
          
          {/* Action Badges in bottom right */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <input ref={imgInputRef} type="file" accept="image/*" className="hidden"
              onChange={e => { addImage(e.target.files[0]); e.target.value = ''; }} />
            <button onClick={() => imgInputRef.current?.click()}
              className="nb-action-badge nb-badge-indigo hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Add Image
            </button>
            <button onClick={() => setShowTableBuilder(true)}
              className="nb-action-badge nb-badge-emerald hover:opacity-80 transition-opacity">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Add Table
            </button>
          </div>
        </div>

        <div className="flex justify-start ml-10">
          <p className="text-[10px] uppercase font-black tracking-widest text-slate-700">{wordCount(section.body || '')} words</p>
        </div>

        {/* Attached Items (Images/Tables) */}
        <div className="ml-10 space-y-4">
          {(section.images || []).map((img, idx) => (
            <div key={img.id} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <img src={img.dataUrl} alt={img.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1 space-y-2">
                <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Figure {idx + 1}</p>
                <input value={img.caption} onChange={e => updateImageCaption(img.id, e.target.value)} placeholder="Entry caption..." className="nb-input h-10 py-0" />
              </div>
              <button onClick={() => removeImage(img.id)} className="text-slate-600 hover:text-rose-400"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
          ))}
          {(section.tables || []).map((tbl, idx) => (
            <div key={tbl.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
              <div className="flex justify-between items-center">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Table {idx + 1}: {tbl.caption}</p>
                 <button onClick={() => removeTable(tbl.id)} className="text-slate-600 hover:text-rose-400"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <div className="overflow-auto border border-white/5 rounded-lg">
                <table className="w-full text-xs">
                  <tbody>
                    {tbl.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-white/5">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`p-2 border-r border-white/5 ${ri===0 ? 'font-black text-cyan-500 bg-white/5':''}`}>{cell || '-'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTableBuilder && <TableBuilder onInsert={insertTable} onClose={() => setShowTableBuilder(false)} />}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ExportNotebook — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ExportNotebook({ chatHistory = [], aiCitations = [], toast }) {
  // ── Template selection ──
  const [selectedTemplateId, setSelectedTemplateId] = useState('journal-article');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  // ── Formatting (at top) ──
  const [font, setFont]           = useState('Times New Roman');
  const [fontSize, setFontSize]   = useState(12);
  const [spacing, setSpacing]     = useState(2.0);
  const [margins, setMargins]     = useState(1.0);
  const [citStyle, setCitStyle]   = useState('apa7');
  const [paperSize, setPaperSize] = useState('A4');
  const [pageNums, setPageNums]   = useState(true);
  const [pageNumPos, setPageNumPos] = useState('bottom');
  const [titlePage, setTitlePage] = useState(true);
  const [genTOC, setGenTOC]       = useState(false);
  const [listFigures, setListFigures] = useState(false);
  const [listTables, setListTables]   = useState(false);
  const [headerText, setHeaderText]   = useState('');
  const [footerText, setFooterText]   = useState('');

  // ── Metadata ──
  const [metadata, setMetadata] = useState({});

  // ── Sections ──
  const [sections, setSections] = useState(() => {
    const tmpl = DOCUMENT_TEMPLATES.find(t => t.id === 'journal-article');
    return tmpl.sections.map(s => ({ ...s, body: '', images: [], tables: [] }));
  });

  const totalWords = sections.reduce((acc, s) => acc + wordCount(s.body || ''), 0);

  // ── Include options ──
  const [includeAnalysis, setIncludeAnalysis] = useState(true);
  const [includeRefs, setIncludeRefs] = useState(true);

  // ── Export state ──
  const [isExporting, setIsExporting] = useState(false);

  const selectedTemplate = DOCUMENT_TEMPLATES.find(t => t.id === selectedTemplateId);

  // ── Change template ──
  const changeTemplate = useCallback((tmplId) => {
    const tmpl = DOCUMENT_TEMPLATES.find(t => t.id === tmplId);
    if (!tmpl) return;
    setSelectedTemplateId(tmplId);
    setSections(tmpl.sections.map(s => ({ ...s, body: '', images: [], tables: [] })));
    setMetadata({});
    setGenTOC(tmpl.features?.hasTOC || false);
    setShowTemplateSelector(false);
  }, []);

  // ── Section operations ──
  const updateSection = (idx, data) => setSections(s => s.map((sec, i) => i === idx ? data : sec));
  const removeSection = (idx) => setSections(s => s.filter((_, i) => i !== idx));
  const moveSection = (from, to) => {
    setSections(s => {
      const arr = [...s];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };
  const addSection = () => setSections(s => [...s, { title: '', body: '', images: [], tables: [] }]);

  // ── Export handler ──
  const handleExport = async () => {
    const title = metadata.title?.trim();
    const authors = metadata.authors?.trim();
    if (!title) return toast?.('Please enter a document title.', 'error');
    if (!authors) return toast?.('Please enter author name(s).', 'error');

    setIsExporting(true);
    try {
      const payload = {
        templateId: selectedTemplateId,
        templateName: selectedTemplate?.name,
        title,
        author: authors,
        institution: metadata.institution?.trim() || '',
        course: metadata.courseCode?.trim() || '',
        abstract: sections.find(s => s.isAbstract)?.body?.trim() || '',
        metadata: { ...metadata },
        sections: sections.filter(s => s.title.trim() || (s.body && s.body.trim())).map(s => ({
          title: s.title,
          body: s.body || '',
          subsections: s.subsections || [],
          images: (s.images || []).map(img => ({ caption: img.caption, dataUrl: img.dataUrl })),
          tables: (s.tables || []).map(tbl => ({ caption: tbl.caption, rows: tbl.rows })),
        })),
        analysis_results: includeAnalysis ? chatHistory.map(h => ({
          query: h.query || '',
          result: h.result || '',
          stdout: h.stdout || '',
          generated_code: h.generated_code || '',
        })) : [],
        references: includeRefs ? aiCitations : [],
        formatting: {
          font, fontSize, lineSpacing: spacing, margins,
          citationStyle: citStyle, paperSize,
          includePageNumbers: pageNums, pageNumberPosition: pageNumPos,
          includeTitlePage: titlePage, generateTOC: genTOC,
          listOfFigures: listFigures, listOfTables: listTables,
          headerText, footerText,
        },
      };

      // 🚀 Pure Front-end Generation
      await generateScholarDocx(payload);
      toast?.('✓ DOCX architected and downloaded successfully', 'success');
    } catch (e) {
      console.error('Export error:', e);
      toast?.('Export failed: ' + e.message, 'error');
    } finally {
      setIsExporting(false);
    }
  };

  // ── Sub-renders ──
  const renderWriting = () => (
    <div className="space-y-6 nb-animate-fade">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          Drafting Canvas
          <span className="text-cyan-500 font-normal ml-3">({sections.length} sections)</span>
        </h3>
        <button onClick={addSection}
          className="nb-badge nb-badge-cyan cursor-pointer hover:scale-105 active:scale-95">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
          New Section
        </button>
      </div>

      <div className="space-y-4">
        {sections.length === 0 && (
          <div className="p-16 rounded-3xl border-2 border-dashed border-white/10 text-center text-slate-500">
            <p className="text-lg mb-2">Your canvas is empty.</p>
            <p className="text-sm">Click &quot;New Section&quot; to begin your masterpiece.</p>
          </div>
        )}
        {sections.map((sec, i) => (
          <SectionEditor
            key={i}
            section={sec}
            index={i}
            total={sections.length}
            onUpdate={(data) => updateSection(i, data)}
            onRemove={removeSection}
            onMove={moveSection}
            sectionNumber={i + 1}
          />
        ))}
      </div>
    </div>
  );

  const renderMetadata = () => (
    <div className="space-y-8 nb-animate-fade">
      <div className="nb-glass-card p-8 nb-animate-slide">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Document Hierarchy</h3>
            <p className="text-slate-400 text-sm">Define authors and institutional visibility</p>
          </div>
        </div>

        <div className="nb-meta-grid">
          {(selectedTemplate?.metadataFields || ['title', 'authors']).map(fieldId => {
            const def = METADATA_FIELD_DEFS[fieldId];
            if (!def) return null;
            return (
              <div key={fieldId} className="space-y-1.5">
                <label className="nb-label lowercase">{def.label}{def.required ? ' *' : ''}</label>
                <input
                  type="text"
                  value={metadata[fieldId] || ''}
                  onChange={e => setMetadata(m => ({ ...m, [fieldId]: e.target.value }))}
                  placeholder={def.placeholder}
                  className="nb-input"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="nb-glass-card p-8 nb-animate-slide" style={{ animationDelay: '0.1s' }}>
        <h3 className="nb-label mb-6">Inclusions & Scope</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-4 p-5 nb-section-card cursor-pointer border-cyan-500/0 hover:border-cyan-500/20">
            <input type="checkbox" checked={includeAnalysis} onChange={e => setIncludeAnalysis(e.target.checked)}
              className="w-5 h-5 rounded-lg accent-cyan-500 bg-slate-900 border-white/10" />
            <div className="flex-1">
              <p className="text-white text-sm font-bold">Data Canvas Analysis</p>
              <p className="text-slate-400 text-xs mt-0.5">{chatHistory.length} query results will be appended</p>
            </div>
          </label>
          <label className="flex items-center gap-4 p-5 nb-section-card cursor-pointer border-cyan-500/0 hover:border-cyan-500/20">
            <input type="checkbox" checked={includeRefs} onChange={e => setIncludeRefs(e.target.checked)}
              className="w-5 h-5 rounded-lg accent-cyan-500 bg-slate-900 border-white/10" />
            <div className="flex-1">
              <p className="text-white text-sm font-bold">Reference Library</p>
              <p className="text-slate-400 text-xs mt-0.5">{aiCitations.length} academic citations mapped</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderDesign = () => (
    <div className="space-y-8 nb-animate-fade">
      {/* Template Gallery */}
      <div className="nb-glass-card p-8 nb-animate-slide">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">Structural Blueprint</h3>
            <p className="text-slate-400 text-sm">Selected: <span className="text-cyan-400 font-semibold">{selectedTemplate?.name}</span></p>
          </div>
          <button
            onClick={() => setShowTemplateSelector(!showTemplateSelector)}
            className="nb-btn nb-btn-secondary"
          >
            {showTemplateSelector ? 'Hide Gallery' : 'Switch Template'}
          </button>
        </div>

        {showTemplateSelector ? (
          <div className="space-y-6">
            <input
              type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search blueprint architecture..."
              className="nb-input"
            />
            <div className="max-h-[400px] overflow-y-auto space-y-6 nb-scrollbar pr-2">
              {TEMPLATE_CATEGORIES.map(cat => {
                const tmpls = filteredTemplates.filter(t => t.category === cat.id);
                if (tmpls.length === 0) return null;
                return (
                  <div key={cat.id}>
                    <p className="nb-label lowercase mb-3 opacity-60 font-black">{cat.icon} {cat.label}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {tmpls.map(t => (
                        <button
                          key={t.id}
                          onClick={() => changeTemplate(t.id)}
                          className={`p-4 rounded-2xl text-left transition-all border ${
                            t.id === selectedTemplateId
                              ? 'bg-cyan-500/10 border-cyan-500/30 ring-1 ring-cyan-500/20'
                              : 'bg-white/3 border-white/5 hover:bg-white/5'
                          }`}
                        >
                          <p className={`text-sm font-bold ${t.id === selectedTemplateId ? 'text-white' : 'text-slate-300'}`}>{t.name}</p>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{t.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-2xl">
              {TEMPLATE_CATEGORIES.find(c => c.id === selectedTemplate?.category)?.icon || '📂'}
            </div>
            <div>
              <p className="text-white font-bold">{selectedTemplate?.name}</p>
              <p className="text-slate-400 text-xs">Optimized for {selectedTemplate?.wordRange} words · Includes {selectedTemplate?.sections.length} default divisions</p>
            </div>
          </div>
        )}
      </div>

      {/* Composition Logic */}
      <div className="nb-glass-card p-8 nb-animate-slide" style={{ animationDelay: '0.1s' }}>
        <h3 className="nb-label mb-8">Composition Logic</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="nb-label lowercase">Typeface</label>
            <select value={font} onChange={e => setFont(e.target.value)} className="nb-input">
              {['Times New Roman','Arial','Calibri','Georgia','Garamond','Courier New'].map(f => <option key={f} value={f} className="bg-slate-900">{f}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="nb-label lowercase">Scale (pt)</label>
            <select value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="nb-input">
              {[10,11,12,13,14].map(s => <option key={s} value={s} className="bg-slate-900">{s} pt</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="nb-label lowercase">Rhythm (Leading)</label>
            <select value={spacing} onChange={e => setSpacing(Number(e.target.value))} className="nb-input">
              {[{v:1.0,l:'Single'},{v:1.15,l:'1.15'},{v:1.5,l:'1.5'},{v:2.0,l:'Double'}].map(s => <option key={s.v} value={s.v} className="bg-slate-900">{s.l}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="nb-label lowercase">Margins</label>
            <select value={margins} onChange={e => setMargins(Number(e.target.value))} className="nb-input">
              {[{v:0.75,l:'Narrow (0.75")'},{v:1.0,l:'Normal (1")'},{v:1.25,l:'Wide (1.25")'}].map(m => <option key={m.v} value={m.v} className="bg-slate-900">{m.l}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="nb-label lowercase">Citations style</label>
            <select value={citStyle} onChange={e => setCitStyle(e.target.value)} className="nb-input">
              {CITATION_STYLES.map(s => <option key={s.id} value={s.id} className="bg-slate-900">{s.label}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="nb-label lowercase">Page Geometry</label>
            <select value={paperSize} onChange={e => setPaperSize(e.target.value)} className="nb-input">
              {['A4','Letter','Legal'].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
           <div className="space-y-4">
              <label className="flex items-center gap-3 text-white text-sm cursor-pointer group">
                <input type="checkbox" checked={pageNums} onChange={e => setPageNums(e.target.checked)} className="w-4 h-4 rounded-md accent-cyan-500 bg-slate-800" />
                <span className="group-hover:text-cyan-400 transition-colors">Pagination Enabled</span>
              </label>
              {pageNums && (
                <div className="ml-7 animate-fadeIn">
                  <label className="nb-label lowercase opacity-50 mb-1">Alignment</label>
                  <select value={pageNumPos} onChange={e => setPageNumPos(e.target.value)} className="nb-input py-1 text-xs max-w-[120px]">
                    <option value="top" className="bg-slate-900">Header Level</option>
                    <option value="bottom" className="bg-slate-900">Footer Level</option>
                  </select>
                </div>
              )}
              <label className="flex items-center gap-3 text-white text-sm cursor-pointer group">
                <input type="checkbox" checked={titlePage} onChange={e => setTitlePage(e.target.checked)} className="w-4 h-4 rounded-md accent-cyan-500 bg-slate-800" />
                <span className="group-hover:text-cyan-400 transition-colors">Generate Title Page</span>
              </label>
           </div>
           <div className="space-y-4">
              <label className="flex items-center gap-3 text-white text-sm cursor-pointer group">
                <input type="checkbox" checked={genTOC} onChange={e => setGenTOC(e.target.checked)} className="w-4 h-4 rounded-md accent-cyan-500 bg-slate-800" />
                <span className="group-hover:text-cyan-400 transition-colors">Table of Contents</span>
              </label>
              <label className="flex items-center gap-3 text-white text-sm cursor-pointer group">
                <input type="checkbox" checked={listFigures} onChange={e => setListFigures(e.target.checked)} className="w-4 h-4 rounded-md accent-cyan-500 bg-slate-800" />
                <span className="group-hover:text-cyan-400 transition-colors">Index of Figures</span>
              </label>
              <label className="flex items-center gap-3 text-white text-sm cursor-pointer group">
                <input type="checkbox" checked={listTables} onChange={e => setListTables(e.target.checked)} className="w-4 h-4 rounded-md accent-cyan-500 bg-slate-800" />
                <span className="group-hover:text-cyan-400 transition-colors">Index of Tables</span>
              </label>
           </div>
        </div>
      </div>
    </div>
  );

  // ── Filtered templates for search ──
  const filteredTemplates = DOCUMENT_TEMPLATES.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="nb-page p-6 lg:p-12 pb-32 relative overflow-hidden">
      {/* 🌌 Atmospheric Backdrop (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10 space-y-10">
        
        {/* 🏛️ Header Section (Reference Image 1 Top) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-cyan-400/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               <svg className="w-7 h-7 text-cyan-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z" />
               </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                Export Notebook
              </h1>
              <p className="text-slate-400 text-sm font-medium mt-1">
                Build academic documents from 26+ professional templates
              </p>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="nb-btn-download h-14"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {isExporting ? 'Building...' : 'Download DOCX'}
          </button>
        </div>

        {/* 📋 Document Template Selection (Reference Image 1) */}
        <section className="nb-section-group">
          <span className="nb-h-label">Document Template</span>
          <div className="nb-card group">
            <button 
              onClick={() => setShowTemplateSelector(!showTemplateSelector)}
              className="absolute top-4 right-6 nb-btn-outline hover:bg-cyan-500/20 transition-colors"
            >
              Change Template
            </button>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-2xl">
                 📄
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedTemplate?.name}</h3>
                <p className="text-slate-500 text-xs mt-1 font-medium leading-relaxed">
                  {selectedTemplate?.description} · {selectedTemplate?.wordRange} words
                </p>
              </div>
            </div>

            {showTemplateSelector && (
              <div className="mt-8 pt-8 border-t border-white/5 space-y-6 nb-animate-fade">
                <input 
                  type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search template architecture..." className="nb-input" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto nb-scrollbar pr-2">
                  {DOCUMENT_TEMPLATES.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map(t => (
                    <button key={t.id} onClick={() => changeTemplate(t.id)} className={`p-4 rounded-xl text-left border transition-all ${t.id === selectedTemplateId ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-lg' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'}`}>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-[10px] opacity-60 mt-1 line-clamp-1">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        {/* ⚙️ Formatting Options (Reference Image 1) */}
        <section className="nb-section-group">
          <details open className="group">
            <summary className="nb-h-label flex items-center gap-2 cursor-pointer list-none">
              <svg className="w-3 h-3 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              Formatting Options
            </summary>
            <div className="nb-card mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              <div className="space-y-1.5">
                <label className="nb-label">Font</label>
                <select value={font} onChange={e => setFont(e.target.value)} className="nb-select">
                  {['Times New Roman','Arial','Calibri','Georgia','Garamond','Courier New'].map(f => <option key={f} value={f} className="bg-slate-900">{f}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="nb-label">Font Size (pt)</label>
                <select value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="nb-select">
                  {[10,11,12,13,14].map(s => <option key={s} value={s} className="bg-slate-900">{s} pt</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="nb-label">Line Spacing</label>
                <select value={spacing} onChange={e => setSpacing(Number(e.target.value))} className="nb-select">
                  {[{v:1.0,l:'Single'},{v:1.5,l:'1.5'},{v:2.0,l:'Double'}].map(s => <option key={s.v} value={s.v} className="bg-slate-900">{s.l}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="nb-label">Margins</label>
                <select value={margins} onChange={e => setMargins(Number(e.target.value))} className="nb-select">
                  {[{v:1.0,l:'Normal (1")'},{v:0.75,l:'Narrow (0.75")'},{v:1.25,l:'Wide (1.25")'}].map(m => <option key={m.v} value={m.v} className="bg-slate-900">{m.l}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="nb-label">Citation Style</label>
                <select value={citStyle} onChange={e => setCitStyle(e.target.value)} className="nb-select">
                  {CITATION_STYLES.map(s => <option key={s.id} value={s.id} className="bg-slate-900">{s.label}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="nb-label">Paper Size</label>
                <select value={paperSize} onChange={e => setPaperSize(e.target.value)} className="nb-select">
                  {['A4','Letter','Legal'].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                </select>
              </div>

              <div className="md:col-span-1 space-y-1.5">
                <label className="nb-label">Header Text</label>
                <input type="text" value={headerText} onChange={e => setHeaderText(e.target.value)} placeholder="Running header..." className="nb-input" />
              </div>
              <div className="md:col-span-1 space-y-1.5">
                <label className="nb-label">Footer Text</label>
                <input type="text" value={footerText} onChange={e => setFooterText(e.target.value)} placeholder="Footer text..." className="nb-input" />
              </div>

              <div className="md:col-span-1 flex flex-col gap-3 pt-4">
                <label className="flex items-center gap-3 text-sm font-bold text-white cursor-pointer group">
                  <input type="checkbox" checked={pageNums} onChange={e => setPageNums(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 bg-slate-800 border-white/10" />
                  <span className="group-hover:text-cyan-400 transition-colors">Page Numbers</span>
                  {pageNums && (
                    <select value={pageNumPos} onChange={e => setPageNumPos(e.target.value)} className="nb-select py-1 h-8 text-[10px] w-24 ml-2">
                      <option value="top" className="bg-slate-900">Top</option>
                      <option value="bottom" className="bg-slate-900">Bottom</option>
                    </select>
                  )}
                </label>
                <label className="flex items-center gap-3 text-sm font-bold text-white cursor-pointer group">
                  <input type="checkbox" checked={titlePage} onChange={e => setTitlePage(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 bg-slate-800 border-white/10" />
                  <span className="group-hover:text-cyan-400 transition-colors">Title Page</span>
                </label>
                <label className="flex items-center gap-3 text-sm font-bold text-white cursor-pointer group">
                  <input type="checkbox" checked={genTOC} onChange={e => setGenTOC(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 bg-slate-800 border-white/10" />
                  <span className="group-hover:text-cyan-400 transition-colors">Table of Contents</span>
                </label>
                <label className="flex items-center gap-3 text-sm font-bold text-white cursor-pointer group">
                  <input type="checkbox" checked={listFigures} onChange={e => setListFigures(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 bg-slate-800 border-white/10" />
                  <span className="group-hover:text-cyan-400 transition-colors">List of Figures</span>
                </label>
                <label className="flex items-center gap-3 text-sm font-bold text-white cursor-pointer group">
                  <input type="checkbox" checked={listTables} onChange={e => setListTables(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 bg-slate-800 border-white/10" />
                  <span className="group-hover:text-cyan-400 transition-colors">List of Tables</span>
                </label>
              </div>

              {/* Added: AI/Data Inclusions */}
              <div className="md:col-span-3 pt-6 border-t border-white/5 flex flex-wrap gap-8">
                <label className="flex items-center gap-3 text-sm font-bold text-white cursor-pointer group">
                  <input type="checkbox" checked={includeAnalysis} onChange={e => setIncludeAnalysis(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 bg-slate-800 border-white/10" />
                  <div>
                    <span className="group-hover:text-cyan-400 transition-colors">Include Analysis Canvas</span>
                    <p className="text-[10px] text-slate-500 font-medium">Export research threads & AI insights</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 text-sm font-bold text-white cursor-pointer group">
                  <input type="checkbox" checked={includeRefs} onChange={e => setIncludeRefs(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 bg-slate-800 border-white/10" />
                  <div>
                    <span className="group-hover:text-cyan-400 transition-colors">Include Citations Library</span>
                    <p className="text-[10px] text-slate-500 font-medium">Append structured bibliography</p>
                  </div>
                </label>
              </div>
            </div>
          </details>
        </section>

        {/* 📝 Document Details (Reference Image 1 Bottom) */}
        <section className="nb-section-group">
          <span className="nb-h-label">Document Details</span>
          <div className="nb-card grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {(selectedTemplate?.metadataFields || ['title', 'authors']).map(fieldId => {
              const def = METADATA_FIELD_DEFS[fieldId];
              if (!def) return null;
              const isWide = fieldId === 'title' || fieldId === 'keywords';
              return (
                <div key={fieldId} className={`space-y-1.5 ${isWide ? 'md:col-span-2' : ''}`}>
                  <label className="nb-label">{def.label}{def.required ? ' *' : ''}</label>
                  <input
                    type="text"
                    value={metadata[fieldId] || ''}
                    onChange={e => setMetadata(m => ({ ...m, [fieldId]: e.target.value }))}
                    placeholder={def.placeholder}
                    className="nb-input bg-white/3 border-white/5 focus:bg-white/5"
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* 📝 Drafting Canvas (Reference Image 2) */}
        <section className="nb-section-group">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
               <h3 className="nb-h-label mb-0!">Sections</h3>
               <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-black text-slate-500">{sections.length}</span>
             </div>
             <button onClick={addSection} className="nb-btn-outline flex items-center gap-2 hover:bg-cyan-500/10 active:scale-95 transition-all">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                Add Section
             </button>
          </div>

          <div className="space-y-8 pb-48">
            {sections.length === 0 && (
              <div className="nb-card p-16 text-center border-dashed border-white/5">
                <p className="text-slate-500 text-sm font-medium">Your canvas is empty. Start architecting your document.</p>
              </div>
            )}
            {sections.map((sec, i) => (
              <SectionEditor 
                key={i} 
                section={sec} 
                index={i} 
                total={sections.length} 
                onUpdate={(data) => updateSection(i, data)} 
                onRemove={removeSection} 
                onMove={moveSection} 
                sectionNumber={i + 1} 
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
