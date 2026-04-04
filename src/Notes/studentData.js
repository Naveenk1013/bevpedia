/* 
  Initial Data Schema for the Student Hub 
  Structured to mimic a NoSQL database (like MongoDB/Firebase) for easy migration later.
*/

import { universities } from './data/universities';
import { semesters } from './data/semesters';
import { subjects_sem_gtu_1 } from './data/sem_gtu_1';
import { subjects_sem_gtu_2 } from './data/sem_gtu_2';
import { subjects_sem_nchmct_1 } from './data/sem_nchmct_1';
import { subjects_sem_1774678820404 } from './data/sem_1774678820404';
import { subjects_sem_1774709322001 } from './data/sem_1774709322001';
import { subjects_sem_1774781765748 } from './data/sem_1774781765748';
import { subjects_sem_research_rpj } from './data/sem_research_rpj';
import { subjects_sem_research_hotel } from './data/sem_research_hotel';

export const initialStudentData = {
  universities,
  semesters,
  subjects: [
    ...subjects_sem_gtu_1,
    ...subjects_sem_gtu_2,
    ...subjects_sem_nchmct_1,
    ...subjects_sem_1774678820404,
    ...subjects_sem_1774709322001,
    ...subjects_sem_1774781765748,
    ...subjects_sem_research_rpj,
    ...subjects_sem_research_hotel
  ]
};

export const fetchUniversityData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialStudentData);
    }, 400);
  });
};
