import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import * as fs from 'node:fs';
import * as path from 'node:path';

function studentDataPlugin() {
  return {
    name: 'student-data-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-student-data', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk.toString());
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const dataDir = fileURLToPath(new URL('./src/Notes/data', import.meta.url));
              const mainDataPath = fileURLToPath(new URL('./src/Notes/studentData.js', import.meta.url));

              if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

              const { universities, semesters, subjects } = data;

              // Write metadata
              fs.writeFileSync(path.join(dataDir, 'universities.js'), `export const universities = ${JSON.stringify(universities, null, 2)};`);
              fs.writeFileSync(path.join(dataDir, 'semesters.js'), `export const semesters = ${JSON.stringify(semesters, null, 2)};`);

              // Group subjects by semester
              const subjectsBySemester = {};
              
              // Ensure all existing semester IDs have an entry
              semesters.forEach(sem => {
                subjectsBySemester[sem.id] = [];
              });

              subjects.forEach(sub => {
                const semId = sub.semesterId || 'orphaned';
                if (!subjectsBySemester[semId]) subjectsBySemester[semId] = [];
                subjectsBySemester[semId].push(sub);
              });

              const semesterIds = Object.keys(subjectsBySemester);
              semesterIds.forEach(semId => {
                const varName = `subjects_${semId.replace(/[^a-zA-Z0-9_]/g, '_')}`;
                fs.writeFileSync(path.join(dataDir, `${semId}.js`), `export const ${varName} = ${JSON.stringify(subjectsBySemester[semId], null, 2)};`);
              });

              // Generate main file content with dynamic imports
              const imports = [
                `import { universities } from './data/universities';`,
                `import { semesters } from './data/semesters';`,
                ...semesterIds.map(semId => `import { subjects_${semId.replace(/[^a-zA-Z0-9_]/g, '_')} } from './data/${semId}';`)
              ].join('\n');

              const subjectSpread = semesterIds.map(semId => `    ...subjects_${semId.replace(/[^a-zA-Z0-9_]/g, '_')}`).join(',\n');

              const mainFileContent = `/* \n  Initial Data Schema for the Student Hub \n  Structured to mimic a NoSQL database (like MongoDB/Firebase) for easy migration later.\n*/\n\n${imports}\n\nexport const initialStudentData = {\n  universities,\n  semesters,\n  subjects: [\n${subjectSpread}\n  ]\n};\n\nexport const fetchUniversityData = async () => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve(initialStudentData);\n    }, 400);\n  });\n};\n`;

              fs.writeFileSync(mainDataPath, mainFileContent);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Saved and Modularized successfully!' }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), studentDataPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5175,
    open: true
  }
});
