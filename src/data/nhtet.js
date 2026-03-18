import { nhtet_questions_bank } from './nhtetquestionbank';

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
    { year: '2019 JULY', title: 'NHTET JULY 2019 Paper I & II', link: 'https://drive.google.com/file/d/12msOsFVW325yO0dQPe5ncOUNn451dKnJ/view?usp=drive_link' },
    { year: '2019 JULY', title: 'NHTET JULY 2019 Paper III', link: 'https://drive.google.com/file/d/1hpety1QOwfzRZh18627eayMcLSFhXv8g/view?usp=drive_link' },
    { year: '2019 JULY', title: 'NHTET JULY 2019 Answer Key', link: 'https://drive.google.com/file/d/1AZl6M9Lyvx7PMKzGYdcJSNUisOO4CxlT/view?usp=drive_link' },
    { year: '2019 MAY', title: 'NHTET MAY 2019 Paper I & II', link: 'https://drive.google.com/file/d/12msOsFVW325yO0dQPe5ncOUNn451dKnJ/view?usp=drive_link' },
    { year: '2019 MAY', title: 'NHTET MAY 2019 Paper III', link: 'https://drive.google.com/file/d/1hpety1QOwfzRZh18627eayMcLSFhXv8g/view?usp=drive_link' },
    { year: '2019 MAY', title: 'NHTET MAY 2019 Answer Key', link: 'https://drive.google.com/file/d/1AZl6M9Lyvx7PMKzGYdcJSNUisOO4CxlT/view?usp=drive_link' },
    { year: '2018 SEP', title: 'NHTET SEP 2018 Paper I & II', link: 'https://drive.google.com/file/d/1OwPMM4ISG9Y8cUJko6sJI-JUmjyz4fX_/view?usp=drive_link' },
    { year: '2018 SEP', title: 'NHTET SEP 2018 Paper III', link: 'https://drive.google.com/file/d/14_XKT-dbZIsS1rklC_XZ8bOVXvsLLiNy/view?usp=drive_link' },
    { year: '2018 SEP', title: 'NHTET SEP 2018 Answer Key', link: 'https://drive.google.com/file/d/1cI3sD8VMlODIxIn9n6wY9MJYZXmbOfOr/view?usp=drive_link' },
    { year: '2018 MAR', title: 'NHTET MAR 2018 Paper I', link: 'https://drive.google.com/file/d/12YrcquVBCHq6Il1FsoccI1xwQ8PNH0OG/view?usp=drive_link' },
    { year: '2018 MAR', title: 'NHTET MAR 2018 Paper II', link: 'https://drive.google.com/file/d/118mnfzG2x2ZoLSmdOCLsH7kVVdR0BmRC/view?usp=drive_link' },
    { year: '2018 MAR', title: 'NHTET MAR 2018 Paper III', link: 'https://drive.google.com/file/d/1VCyVi-ZLVmi1lUgfzSLQLYyiWjgUaZPB/view?usp=drive_link' },
    { year: '2018 MAR', title: 'NHTET MAR 2018 Answer Key', link: 'https://drive.google.com/file/d/1jO_iSTcwCgULU6TwTlu1eUaNbLez8x4z/view?usp=drive_link' },
    { year: '2017 JUN', title: 'NHTET JUN 2017 Paper I', link: 'https://drive.google.com/file/d/15djL6p59gJpJaX0bLyxJI2InBJD8hfPZ/view?usp=drive_link' },
    { year: '2017 JUN', title: 'NHTET JUN 2017 Paper II', link: 'https://drive.google.com/file/d/1_boSFgpTEGnOb4GbrhjZL3OyEKx92F8V/view?usp=drive_link' },
    { year: '2017 JUN', title: 'NHTET JUN 2017 Paper III', link: 'https://drive.google.com/file/d/1WfgWTb-0WHeh0VtN6LhLMzpOHaODRsl7/view?usp=drive_link' },
    { year: '2017 JUN', title: 'NHTET JUN 2017 Answer Key', link: 'https://drive.google.com/file/d/1m8pmRery33JIY2htLh6JCoivj1AtQN0w/view?usp=drive_link' },
    { year: '2017 APR', title: 'NHTET APR 2017 Paper I', link: 'https://drive.google.com/file/d/1Pgqc0hug1GoXZCnIvj4bivSSD7jlO_qm/view?usp=drive_link' },
    { year: '2017 APR', title: 'NHTET APR 2017 Paper II', link: 'https://drive.google.com/file/d/1xBG-iu6azLzdp4drVGouGPaKGqZUcoMP/view?usp=drive_link' },
    { year: '2017 APR', title: 'NHTET APR 2017 Paper III', link: 'https://drive.google.com/file/d/1uDAPnXwB7qmhh8HnHf8YiFeY3lEWW05z/view?usp=drive_link' },
    { year: '2017 APR', title: 'NHTET APR 2017 Answer Key', link: 'https://drive.google.com/file/d/1lHud4Pb2ozHZAU_3D6RknhUfQiIlLXLM/view?usp=drive_link' }
  ],
  mockTests: [
    { id: 'nhtet_p1_mock', name: 'Part-I: General Aptitude Full Mock', questions: 50, time: 60 },
    { id: 'nhtet_specialized_mock', name: 'Part-III: Operations Deep Dive', questions: 100, time: 120 }
  ]
};

// Map NHTET Questions from the question bank
export const nhtet_questions = nhtet_questions_bank.map((q, index) => {
  const ansIndex = q.options.findIndex(opt => opt === q.a);
  return {
    id: index + 1,
    section: q.category || 'General',
    type: 'mcq',
    text: q.q,
    opts: q.options,
    ans: ansIndex >= 0 ? ansIndex : 0,
    marks: 2 // Default 2 marks per question as per common NHTET scheme
  };
});

