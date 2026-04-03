import { defineConfig, loadEnv } from 'vite';
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

import OpenAI from 'openai';

function sathiChatPlugin(env) {
  return {
    name: 'sathi-chat-plugin',
    configureServer(server) {
      server.middlewares.use('/api/sathi-chat', async (req, res, next) => {
        if (req.method === 'POST') {
          console.log('--- SATHI API REQUEST RECEIVED ---');
          if (!env.NVIDIA_NIMS_API_KEY) {
            console.error('ERROR: NVIDIA_NIMS_API_KEY missing from .env');
          } else {
            console.log('API Key detected:', env.NVIDIA_NIMS_API_KEY.substring(0, 10) + '...');
          }

          let body = '';
          req.on('data', chunk => body += chunk.toString());
          req.on('end', async () => {
            try {
              const { messages } = JSON.parse(body);
              
              const openai = new OpenAI({
                apiKey: env.NVIDIA_NIMS_API_KEY,
                baseURL: 'https://integrate.api.nvidia.com/v1',
              });

              const HOSPITALITY_SYSTEM_PROMPT = `You are SATHI (Smart Assistant for Tourism & Hospitality Innovation). You are an AI assistant exclusively designed for professionals in the tourism, hotel, restaurant, and event management industries.
Your Creator: Naveen Kumar, a passionate developer.
Tone: Warm, professional, patient. 
Knowledge Domain: Hotel Operations, F&B, Event Planning, Tourism.
Rule: YOU MUST KEEP ALL FINAL ANSWERS EXTREMELY CONCISE (3-4 SENTENCES MAX) UNLESS the user explicitly asks for details, an essay, or a full explanation. Give only the exact information requested.`;

              const completion = await openai.chat.completions.create({
                model: "deepseek-ai/deepseek-v3.2",
                messages: [
                  { role: "system", content: HOSPITALITY_SYSTEM_PROMPT },
                  ...messages
                ],
                temperature: 0.6,
                top_p: 0.7,
                max_tokens: 4000,
                stream: true,
                extra_body: { "chat_template_kwargs": { "thinking": true } }
              });

              res.setHeader('Content-Type', 'text/event-stream');
              res.setHeader('Cache-Control', 'no-cache');
              res.setHeader('Connection', 'keep-alive');

              for await (const chunk of completion) {
                const reasoning = chunk.choices[0]?.delta?.reasoning_content;
                const content = chunk.choices[0]?.delta?.content;
                
                if (reasoning) {
                  res.write(`data: ${JSON.stringify({ type: 'reasoning', content: reasoning })}\n\n`);
                }
                if (content) {
                  res.write(`data: ${JSON.stringify({ type: 'content', content: content })}\n\n`);
                }
              }
              res.write(`data: [DONE]\n\n`);
              res.end();
            } catch (err) {
              console.error('SATHI PROXY ERROR:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                error: "SATHI Proxy Error", 
                message: err.message,
                details: err.response?.data || "No additional server details"
              }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), studentDataPlugin(), sathiChatPlugin(env)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 5175,
      open: true
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'react-helmet-async'],
            editor: ['@tiptap/react', '@tiptap/starter-kit', 'docx', 'react-to-print', 'file-saver'],
            graphics: ['three'],
            map: ['maplibre-gl']
          }
        }
      }
    }
  };
});

