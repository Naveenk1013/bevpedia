// ─────────────────────────────────────────────────────────────────────────────
// SCHOLAR LY TEMPLATE REPOSITORY v3.0
// Comprehensive Library for Academic, Publishing, & Administrative Documents.
// ─────────────────────────────────────────────────────────────────────────────

export const TEMPLATE_CATEGORIES = [
  { id: 'research',      label: 'I. Research Documents', icon: '🔬' },
  { id: 'degree',        label: '🎓 II. Degree Documents', icon: '🏛️' },
  { id: 'teaching',      label: '📚 III. Teaching Documents', icon: '👨‍🏫' },
  { id: 'assessment',    label: '📋 IV. Assessment & Evaluation', icon: '📝' },
  { id: 'publishing',    label: '📖 V. Publishing & Documentation', icon: '📜' },
  { id: 'admin',         label: '📂 VI. Administrative Documents', icon: '💼' },
  { id: 'ethics',        label: '🔒 VIII. Data & Ethics', icon: '🛡️' },
  { id: 'presentation',  label: '📊 IX. Presentation', icon: '📽️' },
  { id: 'communication', label: '✉️ X. Communication', icon: '📩' }
];

export const CITATION_STYLES = [
  { id: 'apa7',    label: 'APA 7th Edition' },
  { id: 'mla9',    label: 'MLA 9th Edition' },
  { id: 'chicago', label: 'Chicago (Author-Date)' },
  { id: 'harvard', label: 'Harvard Style' },
  { id: 'vancouver', label: 'Vancouver (Numbered)' }
];

export const METADATA_FIELD_DEFS = {
  title:     { label: 'Document Title',      placeholder: 'Enter the document title', required: true },
  authors:   { label: 'Author(s)',           placeholder: 'Author name(s)', required: true },
  affiliations: { label: 'Affiliations',      placeholder: 'University / Organization' },
  email:     { label: 'Corresponding Email', placeholder: 'email@example.com' },
  keywords:  { label: 'Keywords',            placeholder: 'Comma-separated keywords' },
};

export const DOCUMENT_TEMPLATES = [
  // I. Research Documents
  {
    id: 'journal-article',
    category: 'research',
    name: 'Journal Research Article',
    description: 'Standard IMRaD structure for empirical research studies.',
    wordRange: '5000–8000',
    metadataFields: ['title', 'authors', 'affiliations', 'email', 'keywords'],
    sections: [
      { id: 'abstract', title: 'Abstract', isAbstract: true, subsections: ['Structured Abstract (150-250 words)', 'Purpose', 'Methodology', 'Findings', 'Implications'] },
      { id: 'intro',    title: 'Introduction', subsections: ['Background', 'Problem Statement', 'Research Gap', 'Objectives / Hypotheses', 'Contribution'] },
      { id: 'lit-rev',  title: 'Literature Review', subsections: ['Theoretical Framework', 'Conceptual Model', 'Hypothesis Development'] },
      { id: 'methods',  title: 'Methodology', subsections: ['Research Design', 'Participants / Sampling', 'Instrumentation', 'Data Collection', 'Data Analysis'] },
      { id: 'results',  title: 'Results', subsections: ['Data Presentation', 'Statistical Analysis', 'Key Findings'] },
      { id: 'discussion', title: 'Discussion', subsections: ['Interpretation', 'Contextualization', 'Implications'] },
      { id: 'conclusion', title: 'Conclusion', subsections: ['Summary', 'Limitations', 'Future Research'] }
    ]
  },
  {
    id: 'theoretical-paper',
    category: 'research',
    name: 'Conceptual / Theoretical Paper',
    description: 'Developing new concepts or refining existing theories.',
    wordRange: '5000–8000',
    metadataFields: ['title', 'authors', 'affiliations', 'email', 'keywords'],
    sections: [
      { title: 'Introduction', subsections: ['Conceptual Problem', 'Thesis Statement'] },
      { title: 'Theoretical Framework', subsections: ['Ontological Foundations', 'Key Tenets'] },
      { title: 'Conceptual Development', subsections: ['Proposition 1', 'Proposition 2'] },
      { title: 'Implications', subsections: ['Theoretical Significance', 'Practical Utility'] }
    ]
  },
  {
    id: 'slr',
    category: 'research',
    name: 'Systematic Literature Review (SLR)',
    description: 'Rigorous review following PRISMA or similar protocols.',
    wordRange: '6000–12000',
    metadataFields: ['title', 'authors', 'affiliations', 'email', 'keywords'],
    sections: [
      { title: 'Abstract' },
      { title: 'Introduction', subsections: ['Rationale', 'Review Questions'] },
      { title: 'Methods', subsections: ['Eligibility Criteria', 'Information Sources', 'Search Strategy', 'Selection Process', 'Data Collection'] },
      { title: 'Synthesis', subsections: ['Study Characteristics', 'Risk of Bias', 'Results Analysis'] },
      { title: 'Discussion', subsections: ['Evidence Summary', 'Limitations', 'Conclusion'] }
    ]
  },
  {
    id: 'conference-paper',
    category: 'research',
    name: 'Conference Paper',
    description: 'Concise version of research for presentation.',
    wordRange: '3000–6000',
    metadataFields: ['title', 'authors', 'affiliations', 'email', 'keywords'],
    sections: [
      { title: 'Abstract' },
      { title: 'Introduction' },
      { title: 'Key Methods' },
      { title: 'Condensed Results' },
      { title: 'Conclusion' }
    ]
  },
  {
    id: 'case-study',
    category: 'research',
    name: 'Case Study (Academic)',
    description: 'In-depth analysis of a specific individual or event.',
    wordRange: '3000–8000',
    metadataFields: ['title', 'authors', 'affiliations', 'email', 'keywords'],
    sections: [
      { title: 'Case Description', subsections: ['Context', 'History', 'Key Stakeholders'] },
      { title: 'Analysis', subsections: ['Direct Observation', 'Interviews', 'Documents'] },
      { title: 'Findings', subsections: ['Pattern Matching', 'Explanation Building'] },
      { title: 'Recommendations', subsections: ['Action Plan'] }
    ]
  },

  // 🏛️ II. Degree Documents
  {
    id: 'undergrad-dissertation',
    category: 'degree',
    name: 'Undergraduate Dissertation',
    description: 'Final year research project for Bachelor\'s students.',
    wordRange: '8000–15000',
    metadataFields: ['title', 'authors', 'affiliations', 'email'],
    sections: [
      { title: 'Abstract' },
      { title: 'Introduction', subsections: ['Background', 'Aims and Objectives'] },
      { title: 'Literature Review', subsections: ['Current Knowledge', 'Gap Analysis'] },
      { title: 'Methodology', subsections: ['Approach', 'Ethics', 'Data Analysis'] },
      { title: 'Analysis & Discussion', subsections: ['Primary Data', 'Interpretation'] },
      { title: 'Conclusion' }
    ]
  },
  {
    id: 'masters-thesis',
    category: 'degree',
    name: 'Master\'s Thesis',
    description: 'Comprehensive research for Master\'s degree.',
    wordRange: '15000–30000',
    metadataFields: ['title', 'authors', 'affiliations', 'email'],
    sections: [
      { title: 'Introduction', subsections: ['Research Motivation', 'Significance'] },
      { title: 'Literature Review', subsections: ['Thematic Review', 'Synthesis'] },
      { title: 'Methodology', subsections: ['Justification', 'Instruments', 'Reliability'] },
      { title: 'Results', subsections: ['Major Findings'] },
      { title: 'Discussion', subsections: ['Comparison to Theory', 'Policy Implications'] },
      { title: 'Conclusion' }
    ]
  },
  {
    id: 'phd-thesis',
    category: 'degree',
    name: 'PhD Thesis',
    description: 'Original contribution to knowledge for Doctorate.',
    wordRange: '60000–100000',
    metadataFields: ['title', 'authors', 'affiliations', 'email'],
    sections: [
      { title: 'Abstract' },
      { title: 'Introduction', subsections: ['Global Context', 'Originality Statement'] },
      { title: 'Extensive Lit Review', subsections: ['Foundational Theories', 'Critique of Current State'] },
      { title: 'Philosophical Paradigm', subsections: ['Epistemology', 'Ontology'] },
      { title: 'Methodological Rigor', subsections: ['Triangulation', 'Trustworthiness'] },
      { title: 'Result Chapter 1' },
      { title: 'Result Chapter 2' },
      { title: 'Synthesis & Future' }
    ]
  },

  // 📚 III. Teaching Documents
  {
    id: 'lesson-plan',
    category: 'teaching',
    name: 'Lesson Plan (HE)',
    description: 'Detailed roadmap for teaching a specific unit.',
    wordRange: '500–2000',
    metadataFields: ['title', 'authors'],
    sections: [{ title: 'Objectives' }, { title: 'Activities' }, { title: 'Assessment' }]
  },
  {
    id: 'syllabus',
    category: 'teaching',
    name: 'Course Syllabus',
    description: 'Full course overview and outcomes.',
    wordRange: '1000–3000',
    metadataFields: ['title', 'authors', 'affiliations'],
    sections: [{ title: 'Course Description' }, { title: 'Learning Outcomes' }, { title: 'Evaluation' }]
  },

  // 📋 IV. Assessment & Evaluation
  {
    id: 'question-blueprint',
    category: 'assessment',
    name: 'Question Paper Blueprint',
    description: 'Mapping assessment items to learning objectives.',
    wordRange: '500–1500',
    metadataFields: ['title', 'authors'],
    sections: [{ title: 'Taxonomy Mapping' }, { title: 'Draft Questions' }]
  },
  {
    id: 'rubric',
    category: 'assessment',
    name: 'Assessment Rubric',
    description: 'Grading criteria for performance.',
    wordRange: '300–1000',
    metadataFields: ['title', 'authors'],
    sections: [{ title: 'Criteria' }, { title: 'Descriptors' }]
  },
  {
    id: 'proposal',
    category: 'assessment',
    name: 'Research Proposal',
    description: 'Plan for a future research study.',
    wordRange: '3000–6000',
    metadataFields: ['title', 'authors', 'affiliations', 'keywords'],
    sections: [{ title: 'Research Question' }, { title: 'Methodology' }, { title: 'Timeline' }]
  },

  // 📖 V. Publishing & Documentation
  {
    id: 'book-chapter',
    category: 'publishing',
    name: 'Book Chapter',
    description: 'Contribution to an edited academic volume.',
    wordRange: '5000–10000',
    metadataFields: ['title', 'authors', 'affiliations'],
    sections: [{ title: 'Introduction' }, { title: 'Core Argument' }, { title: 'Conclusion' }]
  },
  {
    id: 'academic-book',
    category: 'publishing',
    name: 'Academic Book',
    description: 'Full-length scholarly monograph.',
    wordRange: '40000–100000',
    metadataFields: ['title', 'authors', 'affiliations'],
    sections: [{ title: 'Preface' }, { title: 'Chapter 1' }, { title: 'Chapter 2' }]
  },

  // 📂 VI. Administrative Documents
  {
    id: 'academic-cv',
    category: 'admin',
    name: 'Academic CV',
    description: 'Comprehensive academic history and publications.',
    wordRange: '1000–5000',
    metadataFields: ['authors', 'affiliations', 'email'],
    sections: [{ title: 'Education' }, { title: 'Publications' }, { title: 'Service' }]
  },
  {
    id: 'sop',
    category: 'admin',
    name: 'Statement of Purpose (SOP)',
    description: 'Professional narrative for admissions.',
    wordRange: '800–1500',
    metadataFields: ['authors', 'email'],
    sections: [{ title: 'Motivation' }, { title: 'Goals' }]
  },

  // 🔒 VIII. Data & Ethics
  {
    id: 'consent-form',
    category: 'ethics',
    name: 'Consent Form',
    description: 'Legal document for participant participation.',
    wordRange: '500–1500',
    metadataFields: ['title', 'authors'],
    sections: [{ title: 'Procedure' }, { title: 'Confidentiality' }]
  },
  {
    id: 'ethics-approval',
    category: 'ethics',
    name: 'Ethics Approval Application',
    description: 'Formal submission to IRB.',
    wordRange: '1500–4000',
    metadataFields: ['title', 'authors', 'affiliations'],
    sections: [{ title: 'Protocol' }, { title: 'Protection of Subjects' }]
  },

  // 📊 IX. Presentation
  {
    id: 'research-presentation',
    category: 'presentation',
    name: 'Research Presentation Slides',
    description: 'Outline and speaker notes for research talks.',
    wordRange: '500–1500',
    metadataFields: ['title', 'authors', 'affiliations'],
    sections: [{ title: 'Slide List' }, { title: 'Speaker Notes' }]
  },

  // ✉️ X. Communication
  {
    id: 'editorial-letter',
    category: 'communication',
    name: 'Editorial Letter to Journal',
    description: 'Formal cover letter to a journal editor.',
    wordRange: '300–600',
    metadataFields: ['authors', 'email'],
    sections: [{ title: 'Rationale' }, { title: 'Declaration' }]
  },
  {
    id: 'reviewer-response',
    category: 'communication',
    name: 'Response to Reviewers',
    description: 'Point-by-point response to reviews.',
    wordRange: '1000–5000',
    metadataFields: ['title', 'authors', 'email'],
    sections: [{ title: 'Summary of Changes' }, { title: 'Detailed Rebuttal' }]
  }
];
