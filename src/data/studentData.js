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
