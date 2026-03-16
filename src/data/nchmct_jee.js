export const nchmct_jee_info = {
  title: 'NCHMCT JEE',
  subtitle: 'National Council for Hotel Management Joint Entrance Examination',
  overview: 'Conducted by NTA once a year for admission to undergraduate courses in Central, State, and Private Institutes of Hotel Management.',
  pattern: {
    duration: '3 Hours',
    totalQuestions: 200,
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
    { id: 'jee_mock_1', name: 'JEE Full Length Mock 1', questions: 200, time: 180 },
    { id: 'jee_sectional_1', name: 'Numerical Ability Special', questions: 30, time: 30 }
  ]
};

// Placeholder for Mock Test Questions - To be expanded in next step
export const jee_questions = [
  {
    id: 1,
    section: 'Numerical Ability',
    type: 'mcq',
    text: 'A train 150m long is running at a speed of 54 km/hr. How much time will it take to cross a platform 250m long?',
    opts: ['20.6 sec', '26.6 sec', '30 sec', '35 sec'],
    ans: 1, // 26.666
    marks: 4
  },
  // More will be added
];
