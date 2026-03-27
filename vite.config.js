import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';

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
              const dataPath = fileURLToPath(new URL('./src/Notes/studentData.js', import.meta.url));
              
              const fileContent = `/* \n  Initial Data Schema for the Student Hub \n  Structured to mimic a NoSQL database (like MongoDB/Firebase) for easy migration later.\n*/\n\nexport const initialStudentData = ${JSON.stringify(data, null, 2)};\n\nexport const fetchUniversityData = async () => {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      const savedData = localStorage.getItem('studentHubData');\n      if (savedData) {\n        resolve(JSON.parse(savedData));\n      } else {\n        resolve(initialStudentData);\n      }\n    }, 400);\n  });\n};\n`;
              
              fs.writeFileSync(dataPath, fileContent);
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Saved successfully!' }));
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
