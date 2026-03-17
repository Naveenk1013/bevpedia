export const nchmct_jee_info = {
  title: 'NCHMCT JEE',
  subtitle: 'National Council for Hotel Management Joint Entrance Examination',
  overview: 'Conducted by NTA once a year for admission to undergraduate courses in Central, State, and Private Institutes of Hotel Management.',
  pattern: {
    duration: '3 Hours',
    totalQuestions: 120,
    marking: 'Correct: +4 | Incorrect: -1',
    sections: [
      { name: 'Numerical Ability & Analytical Aptitude', count: 30 },
      { name: 'Reasoning & Logical Deduction', count: 30 },
      { name: 'General Knowledge & Current Affairs', count: 30 },
      { name: 'English Language', count: 60 },
      { name: 'Aptitude for Service Sector', count: 50 },
    ]
  },
  studyMaterial: [
    {
      category: 'General Guidance',
      items: [
        { title: 'NCHMCT JEE Overview', link: '#' },
        { title: 'List of Affiliated Institutes', link: '#' },
        { title: 'Counseling Process', link: '#' }
      ]
    },
    {
      category: 'Sectional Study Notes',
      items: [
        { title: 'Numerical Ability Concepts', link: '#' },
        { title: 'Reasoning Shortcuts', link: '#' },
        { title: 'Current Affairs Digest 2024', link: '#' },
        { title: 'English Grammar & Vocabulary', link: '#' },
        { title: 'Service Sector Aptitude Guide', link: '#' }
      ]
    }
  ],
  samplePapers: [
    { year: '2023', title: 'NCHMCT JEE 2023 Official Paper', link: '#' },
    { year: '2022', title: 'NCHMCT JEE 2022 Official Paper', link: '#' },
    { year: 'Practice', title: 'Top-tier IHM Model Paper 1', link: '#' }
  ],
  mockTests: [
    { id: 'jee_mock_1', name: 'JEE Full Length Mock', questions: 120, time: 180 },
    { id: 'jee_sectional_1', name: 'Numerical Ability Special', questions: 30, time: 30 }
  ]
};

import nchmctQuestionBank from './nchmctjeequestionbank';

export const jee_questions = nchmctQuestionBank.map((q, idx) => {
  const ansIndex = q.options.indexOf(q.a);
  return {
    id: idx + 1,
    section: q.category,
    type: 'mcq',
    text: q.q,
    opts: q.options,
    ans: ansIndex >= 0 ? ansIndex : 0, // Fallback if no exact match found
    marks: 4,
    explanation: q.explanation || ''
  };
});
