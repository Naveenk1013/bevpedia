#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator for Bevpedia.in
 * Reads JSON files from /src and generates sitemap.xml
 * Run: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://bevpedia.in';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Static pages (main navigation)
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/beverages', priority: 1.0, changefreq: 'weekly' },
  { url: '/spirits', priority: 1.0, changefreq: 'weekly' },
  { url: '/wine', priority: 1.0, changefreq: 'weekly' },
  { url: '/beer', priority: 1.0, changefreq: 'weekly' },
  { url: '/techniques', priority: 0.9, changefreq: 'weekly' },
  { url: '/glossary', priority: 1.0, changefreq: 'weekly' },
  { url: '/quiz', priority: 0.8, changefreq: 'weekly' },
  { url: '/wset', priority: 1.0, changefreq: 'weekly' },
  { url: '/nchmct', priority: 1.0, changefreq: 'weekly' },
  { url: '/students', priority: 1.0, changefreq: 'weekly' },
  { url: '/notebook', priority: 0.7, changefreq: 'monthly' },
  { url: '/food-production', priority: 0.9, changefreq: 'weekly' },
  { url: '/sathi', priority: 0.8, changefreq: 'monthly' },
  { url: '/about', priority: 0.6, changefreq: 'monthly' },
  { url: '/legal', priority: 0.5, changefreq: 'monthly' },
  { url: '/sponsors', priority: 0.7, changefreq: 'monthly' },
  { url: '/yap/login', priority: 0.6, changefreq: 'monthly' },
];

// Helper function to safely read JSON files
function readJSON(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn(`⚠️  Could not read ${filePath}:`, error.message);
  }
  return null;
}

// Generate slug from name (fallback if slug not in JSON)
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function generateSitemap() {
  console.log('📄 Generating sitemap...');
  
  const today = new Date().toISOString().split('T')[0];
  let allUrls = staticPages.map(page => ({ ...page, lastmod: today }));

  // Helper to add items to URL list
  const addItems = (items, prefix, priority = 0.8) => {
    if (!items || !Array.isArray(items)) return;
    items.forEach(item => {
      const slug = item.slug || generateSlug(item.name || item.term || item.title || '');
      if (slug) {
        allUrls.push({
          url: `${prefix}/${slug}`,
          priority,
          changefreq: 'monthly',
          lastmod: item.lastmod || item.updatedAt || today
        });
      }
    });
  };

  try {
    // === COCKTAILS & MOCKTAILS ===
    const { cocktails } = await import('../src/data/cocktails.js');
    const { mocktails } = await import('../src/data/mocktails.js');
    addItems(cocktails, '/beverages', 0.9);
    addItems(mocktails, '/beverages', 0.8);
    console.log(`✅ Added ${cocktails.length + mocktails.length} beverages`);

    // === SPIRITS ===
    const { spirits } = await import('../src/data/spirits.js');
    addItems(spirits, '/spirits', 0.9);
    console.log(`✅ Added ${spirits.length} spirits`);

    // === WINES ===
    const { wines } = await import('../src/data/wines.js');
    addItems(wines, '/wine', 0.8);
    console.log(`✅ Added ${wines.length} wines`);

    // === BEERS ===
    const { beers } = await import('../src/data/beers.js');
    addItems(beers, '/beer', 0.8);
    console.log(`✅ Added ${beers.length} beers`);

    // === GLOSSARY ===
    const { glossary } = await import('../src/data/glossary.js');
    addItems(glossary, '/glossary', 0.7);
    console.log(`✅ Added ${glossary.length} glossary terms`);

    // === TECHNIQUES ===
    const { techniques } = await import('../src/data/techniques.js');
    addItems(techniques, '/techniques', 0.8);
    console.log(`✅ Added ${techniques.length} techniques`);

    // === STUDENT HUB (UNIVERSITIES & SEMESTERS) ===
    const { universities } = await import('../src/Notes/data/universities.js');
    const { semesters } = await import('../src/Notes/data/semesters.js');
    
    // Add Universities
    universities.forEach(uni => {
      allUrls.push({
        url: `/students/${uni.id}`,
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: today
      });
    });

    // Add Semesters
    semesters.forEach(sem => {
      allUrls.push({
        url: `/students/${sem.universityId}/${sem.id}`,
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: today
      });
    });
    console.log(`✅ Added ${universities.length} universities and ${semesters.length} semesters`);

  } catch (error) {
    console.error('❌ Error loading data files:', error.message);
  }

  // Remove duplicates
  const uniqueUrls = Array.from(new Map(allUrls.map(item => [item.url, item])).values());

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  uniqueUrls.forEach(page => {
    // Standardize URL: no trailing slash for root, and force lowercase
    const cleanUrl = page.url === '/' ? '' : page.url;
    const finalLoc = `${SITE_URL}${cleanUrl}`.toLowerCase();

    xml += '  <url>\n';
    xml += `    <loc>${finalLoc}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  // Write to public folder
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, xml);

  console.log(`\n✅ Sitemap generated successfully!`);
  console.log(`📊 Total URLs: ${uniqueUrls.length}`);
  console.log(`📁 Saved to: ${OUTPUT_PATH}\n`);
}

generateSitemap();
