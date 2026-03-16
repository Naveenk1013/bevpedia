export const nhtet_info = {
  title: 'NHTET',
  subtitle: 'National Hospitality Teachers Eligibility Test',
  overview: 'An eligibility test for qualifying to teach in NCHMCT approved government institutes for graduates and industry professionals.',
  passingCriteria: {
    general: 'Aggregate 50% (Paper 1: 45%, Paper 2: 45%, Paper 3: 50%)',
    reserved: 'Aggregate 45% (Paper 1: 40%, Paper 2: 40%, Paper 3: 45%)'
  },
  pattern: {
    totalMarks: 400,
    papers: [
      { id: 1, name: 'General Aptitude', questions: 50, marks: 100, duration: '1 Hour' },
      { id: 2, name: 'Core Hospitality & Management', questions: 50, marks: 100, duration: '1 Hour' },
      { id: 3, name: 'Specialized Operations', questions: 100, marks: 200, duration: '2 Hours' }
    ]
  },
  studyMaterial: [
    {
      category: 'Part-I: General Aptitude',
      items: [
        { title: 'Comprehension & Divergent Thinking', link: '#' },
        { title: 'Reasoning & General Awareness', link: '#' }
      ]
    },
    {
      category: 'Part-II: Core Subjects',
      items: [
        { title: 'Food Science & Nutrition', link: '#' },
        { title: 'General Management & Hotel Accounts', link: '#' }
      ]
    },
    {
      category: 'Part-III: Specialized Operations',
      items: [
        { title: 'Accommodation Operation Management', link: '#' },
        { title: 'Food Production & Service Management', link: '#' },
        { title: 'Housekeeping Management', link: '#' }
      ]
    }
  ],
  samplePapers: [
    { year: '2024', title: 'NHTET 2024 Model Question Paper', link: '#' },
    { year: '2023', title: 'NHTET Previous Year Solution', link: '#' }
  ],
  mockTests: [
    { id: 'nhtet_p1_mock', name: 'Part-I: General Aptitude Full Mock', questions: 50, time: 60 },
    { id: 'nhtet_specialized_mock', name: 'Part-III: Operations Deep Dive', questions: 100, time: 120 }
  ]
};

// Placeholder for NHTET Questions
export const nhtet_questions = [
  {
    id: 1,
    section: 'Food Science',
    type: 'mcq',
    text: 'What is the primary purpose of the HACCP system in food safety?',
    opts: [
      'To enhance the flavor of food',
      'To prevent contamination at critical control points',
      'To increase the shelf life of food products',
      'To reduce the cooking time of food'
    ],
    ans: 1,
    marks: 2
  }
];
