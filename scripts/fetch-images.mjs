/**
 * One-time script to fetch drink thumbnail URLs from TheCocktailDB.
 * Outputs: src/data/drink-images.json
 *
 * Usage:  node scripts/fetch-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── All cocktail & mocktail names (copied from data files) ──
const COCKTAIL_NAMES = [
  'Screwdriver','Cape Cod','Sea Breeze','Moscow Mule','Bloody Mary',
  'Cosmopolitan','White Russian','Lemon Drop Martini','Espresso Martini','Appletini',
  'Gin & Tonic','Negroni','Martini','Tom Collins','Singapore Sling',
  'Aviation','French 75','Gimlet',
  'Mojito','Daiquiri','Piña Colada','Dark & Stormy','Hurricane','Mai Tai','Rum Punch',
  'Margarita','Paloma','Tequila Sunrise',"Tommy's Margarita",'Mezcal Negroni',
  'Old Fashioned','Manhattan','Whiskey Sour','Mint Julep','Sazerac','Rob Roy',
  'Irish Coffee','Penicillin',
  'Sidecar','Brandy Alexander','Vieux Carré',
  'Mimosa','Bellini','Kir Royale',
  'Long Island Iced Tea','Sex on the Beach','Amaretto Sour','Aperol Spritz',
  'Corpse Reviver #2','Clover Club',
];

const MOCKTAIL_NAMES = [
  'Virgin Mojito','Shirley Temple','Arnold Palmer','Virgin Piña Colada',
  'Virgin Mary','Cinderella','Roy Rogers','Sparkling Berry Cooler',
  'Ginger Lime Fizz','Basil Lemonade','Blue Ocean','Cucumber Cooler',
  'Passion Fruit Fizz','Watermelon Cooler','Mango Lassi Mocktail',
  'Safe Sex on the Beach','Virgin Cuba Libre','Fruit Punch',
  'Virgin Strawberry Daiquiri','Lychee Rose Spritz',
];

const ALL_NAMES = [...COCKTAIL_NAMES, ...MOCKTAIL_NAMES];

const API_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

// Some drinks have different names in the API — add known aliases here
const ALIASES = {
  'Piña Colada': 'Pina Colada',
  'Gin & Tonic': 'Gin and Tonic',
  "Tommy's Margarita": "Tommy's Margarita",
  'Corpse Reviver #2': 'Corpse Reviver',
  'Vieux Carré': 'Vieux Carre',
  'Rum Punch': "Planter's Punch",
  'Appletini': 'Apple Martini',
  'Virgin Piña Colada': 'Pina Colada',
  'Virgin Mojito': 'Mojito',
  'Virgin Mary': 'Bloody Mary',
  'Virgin Strawberry Daiquiri': 'Strawberry Daiquiri',
  'Virgin Cuba Libre': 'Cuba Libre',
};

async function fetchDrinkImage(name) {
  const searchName = ALIASES[name] || name;
  const url = `${API_BASE}?s=${encodeURIComponent(searchName)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.drinks) return null;

    // Try exact match first, then first result
    const exactMatch = data.drinks.find(
      d => d.strDrink.toLowerCase() === searchName.toLowerCase()
    );
    const drink = exactMatch || data.drinks[0];
    return drink.strDrinkThumb ? `${drink.strDrinkThumb}/medium` : null;
  } catch (err) {
    console.warn(`⚠️  Failed to fetch "${name}": ${err.message}`);
    return null;
  }
}

async function main() {
  const results = {};
  let found = 0;
  let missed = 0;

  console.log(`🔍 Fetching images for ${ALL_NAMES.length} beverages...\n`);

  for (const name of ALL_NAMES) {
    const imageUrl = await fetchDrinkImage(name);
    if (imageUrl) {
      results[name] = imageUrl;
      found++;
      console.log(`  ✅ ${name}`);
    } else {
      missed++;
      console.log(`  ❌ ${name} (not found)`);
    }
    // Small delay to be kind to the API
    await new Promise(r => setTimeout(r, 250));
  }

  const outPath = path.resolve(__dirname, '..', 'src', 'data', 'drink-images.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`\n✨ Done! ${found} found, ${missed} missed.`);
  console.log(`📄 Written to: ${outPath}`);
}

main();
