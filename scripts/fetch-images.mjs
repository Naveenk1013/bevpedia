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
  'AMF', 'Alabama Slammer', 'Amaretto Sour', 'Americano', 'Aperol Spritz', 'Appletini', 'Aviation', 'B-52', 'Bahama Mama', 'Bees Knees', 'Bellini', 'Black Russian', 'Black Widow', 'Bloody Maria', 'Bloody Mary', 'Blood & Sand', 'Blue Hawaiian', 'Boilermaker', 'Boulevardier', 'Brandy Alexander', 'Bronx Cocktail', 'Caipirinha', 'Cape Cod', 'Classic Champagne Cocktail', 'Clover Club', 'Corpse Reviver #2', 'Cosmopolitan', 'Cuba Libre', 'Daiquiri', 'Dark & Stormy', 'Dirty Martini', 'Dry Manhattan', 'El Diablo', 'El Presidente', 'Espresso Martini', 'French 75', 'French Kiss', 'French Mist', 'Fuzzy Navel', 'Georgia Peach', 'Gibson', 'Gimlet', 'Gin Martini', 'Gin & Tonic', 'Godfather', 'Grasshopper', 'Greyhound', 'Hot Toddy', 'Hurricane', 'Irish Coffee', 'Jamaican Me Crazy', 'John Collins', 'Kir', 'Kir Royale', 'Last Word', 'Lemon Drop Martini', 'Long Beach Iced Tea', 'Long Island Iced Tea', 'Lynchburg Lemonade', 'Madras', 'Mai Tai', 'Mango Daiquiri', 'Mango Margarita', 'Manhattan', 'Margarita', 'Martini', 'Mezcal Negroni', 'Mimosa', 'Mint Julep', 'Mojito', 'Moscow Mule', 'Mudslide', 'Negroni', 'Nutty Irishman', 'Old Fashioned', 'Orgasm', 'Painkiller', 'Paloma', 'Penicillin', 'Perfect Manhattan', 'Perfect Martini', 'Pimm\'s Cup', 'Piña Colada', 'Pink Squirrel', 'Pisco Sour', 'Ramos Gin Fizz', 'Rob Roy', 'Rum Runner', 'Rum Punch', 'Rusty Nail', 'Sazerac', 'Scorpion', 'Sea Breeze', 'Screwdriver', 'Sex on the Beach', 'Sidecar', 'Singapore Sling', 'Spritzer', 'Stinger', 'Strawberry Daiquiri', 'Strawberry Margarita', 'Sweet Manhattan', 'Tequila Sunrise', 'Tequila Sunset', 'Texas Tea', 'Toblerone', 'Tokyo Tea', 'Tom Collins', 'Tommy\'s Margarita', 'Vesper', 'Vieux Carré', 'Vodka Martini', 'White Lady', 'White Russian', 'Zombie'
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
  'Cape Cod': 'Cape Codder',
  'Lemon Drop Martini': 'Lemon Drop',
  'Dark & Stormy': 'Dark and Stormy',
  'Vieux Carré': 'Vieux Carre',
  'Blood & Sand': 'Blood and Sand',
  'Blue Hawaiian': 'Blue Hawaii',
  'Bronx Cocktail': 'Bronx',
  'Classic Champagne Cocktail': 'Champagne Cocktail',
  'Dry Manhattan': 'Manhattan',
  'Sweet Manhattan': 'Manhattan',
  'Perfect Manhattan': 'Manhattan',
  'Gin Martini': 'Martini',
  'Vodka Martini': 'Martini',
  'Dirty Martini': 'Martini',
  'Tommy\'s Margarita': 'Tommys Margarita',
  'Strawberry Margarita': 'Margarita',
  'Mango Margarita': 'Margarita',
  'Strawberry Daiquiri': 'Daiquiri',
  'Mango Daiquiri': 'Daiquiri',
  'Rum Punch': "Planter's Punch",
  'Appletini': 'Apple Martini',
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
