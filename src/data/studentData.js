/* 
  Initial Data Schema for the Student Hub 
  Structured to mimic a NoSQL database (like MongoDB/Firebase) for easy migration later.
*/

export const initialStudentData = {
  universities: [
    {
      id: "uni_gtu",
      name: "Gujarat Technological University",
      shortName: "GTU",
      description: "Syllabus and notes for Hotel Management and Catering Technology programs under GTU.",
      themeColor: "#30c88a",
      icon: "School",
      programs: [
        {
          id: "prog_bhmct",
          name: "Bachelor of Hotel Management & Catering Technology (BHMCT)",
          duration: "4 Years"
        }
      ]
    },
    {
      id: "uni_nchmct",
      name: "NCHMCT",
      shortName: "NCHMCT",
      description: "National Council for Hotel Management and Catering Technology BSc programs.",
      themeColor: "#7c5cfc",
      icon: "GraduationCap",
      programs: [
        {
          id: "prog_bsc_hha",
          name: "B.Sc. (HHA)",
          duration: "3 Years"
        }
      ]
    },
    {
      id: "uni_research",
      name: "Global Academic Research",
      shortName: "Research Hub",
      description: "Open research papers, thesis references, and advanced academic literature.",
      themeColor: "#c9963a",
      icon: "Library",
      programs: [
        {
          id: "prog_research_papers",
          name: "Research Publications",
          duration: "Ongoing"
        }
      ]
    }
  ],
  semesters: [
    // GTU Semesters
    {
      id: "sem_gtu_1",
      universityId: "uni_gtu",
      programId: "prog_bhmct",
      title: "Semester 1",
      order: 1
    },
    {
      id: "sem_gtu_2",
      universityId: "uni_gtu",
      programId: "prog_bhmct",
      title: "Semester 2",
      order: 2
    },
    // NCHMCT Semesters
    {
      id: "sem_nchmct_1",
      universityId: "uni_nchmct",
      programId: "prog_bsc_hha",
      title: "Semester 1",
      order: 1
    },
    // Research Hub Semesters
    {
      id: "sem_research_rpj",
      universityId: "uni_research",
      programId: "prog_research_papers",
      title: "Sample Research Projects (RPJ)",
      order: 1
    },
    {
      id: "sem_research_hotel",
      universityId: "uni_research",
      programId: "prog_research_papers",
      title: "Hotel Overview Presentations",
      order: 2
    }
  ],
  subjects: [
    // GTU Sem 1 Subjects
    {
      id: "sub_gtu_fp_1",
      semesterId: "sem_gtu_1",
      code: "HM101",
      name: "Food Production Foundation - I",
      resources: [
        { id: "res_1", title: "Introduction to Cookery Notes (PDF)", type: "pdf", link: "#", isFree: true },
        { id: "res_2", title: "Kitchen Equipment Syllabus Guide", type: "link", link: "#", isFree: true }
      ]
    },
    {
      id: "sub_gtu_fbs_1",
      semesterId: "sem_gtu_1",
      code: "HM102",
      name: "Food & Beverage Service - I",
      resources: [
        { id: "res_3", title: "F&B Organization Chart", type: "doc", link: "#", isFree: true }
      ]
    },

    // ── Research Hub — Sample RPJ ──
    {
      id: "sub_rpj_ai",
      semesterId: "sem_research_rpj",
      code: "RPJ-01",
      name: "Emerging Use of AI in the Indian Hospitality Industry",
      resources: [
        { id: "res_rpj_1", title: "Full Research Paper (PDF)", type: "pdf", link: "https://drive.google.com/file/d/14_A_vAh_OLDIXg3AjYLsbRf8uPsBVqgk/view?usp=drive_link", isFree: true }
      ]
    },
    {
      id: "sub_rpj_coffee",
      semesterId: "sem_research_rpj",
      code: "RPJ-02",
      name: "Analysing the Attributes of Customer Satisfaction in India's Coffee Shop Business",
      resources: [
        { id: "res_rpj_2", title: "Full Research Paper (PDF)", type: "pdf", link: "https://drive.google.com/file/d/14_A_vAh_OLDIXg3AjYLsbRf8uPsBVqgk/view?usp=drive_link", isFree: true }
      ]
    },
    {
      id: "sub_rpj_employee",
      semesterId: "sem_research_rpj",
      code: "RPJ-03",
      name: "Analysing the Lack of Employee in Hotels of Delhi",
      resources: [
        { id: "res_rpj_3", title: "Full Research Paper (PDF)", type: "pdf", link: "https://drive.google.com/file/d/14_A_vAh_OLDIXg3AjYLsbRf8uPsBVqgk/view?usp=drive_link", isFree: true }
      ]
    },
    {
      id: "sub_rpj_bleisure",
      semesterId: "sem_research_rpj",
      code: "RPJ-04",
      name: "An Analysis of Bleisure Travel Implications for Hotel Services and Amenities",
      resources: [
        { id: "res_rpj_4", title: "Full Research Paper (PDF)", type: "pdf", link: "https://drive.google.com/file/d/1Bd_J0U5-7ClsBfRgaBw-lOkOX6NX-iq9/view?usp=drive_link", isFree: true }
      ]
    },
    {
      id: "sub_rpj_vr",
      semesterId: "sem_research_rpj",
      code: "RPJ-05",
      name: "The Role of Virtual Reality in Transforming Hotel Marketing Strategies and Guest Experiences",
      resources: [
        { id: "res_rpj_5", title: "Full Research Paper (PDF)", type: "pdf", link: "https://drive.google.com/file/d/1WdpCXP0OAxj91paRzGRZopnD08ha_V_P/view?usp=drive_link", isFree: true }
      ]
    },
    {
      id: "sub_rpj_coming_6",
      semesterId: "sem_research_rpj",
      code: "RPJ-06",
      name: "Sample 6 — Coming Soon",
      resources: []
    },
    {
      id: "sub_rpj_coming_7",
      semesterId: "sem_research_rpj",
      code: "RPJ-07",
      name: "Sample 7 — Coming Soon",
      resources: []
    },

    // ── Research Hub — Hotel Overview (Coming Soon) ──
    {
      id: "sub_hotel_overview_placeholder",
      semesterId: "sem_research_hotel",
      code: "HO-01",
      name: "Hotel Overview Presentations — Coming Soon",
      resources: []
    }
  ]
};

// Helper function to simulate a database fetch
export const fetchUniversityData = async () => {
  // In the future, replace this with an actual fetch from Firebase/MongoDB
  return new Promise((resolve) => {
    setTimeout(() => {
      // For now, load from localStorage if exists, else return defaults
      const savedData = localStorage.getItem('studentHubData');
      if (savedData) {
        resolve(JSON.parse(savedData));
      } else {
        resolve(initialStudentData);
      }
    }, 400); // simulate network latency
  });
};
