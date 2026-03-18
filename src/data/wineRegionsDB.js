/**
 * ============================================================
 *  WORLD WINE REGIONS DATABASE
 *  wineRegionsDB.js
 * ============================================================
 *  Purpose : Master data source for the Global Wine Map
 *  Covers  : Old World + New World regions
 *  Filters : Color · Taste · Nature · World
 * ============================================================
 *
 *  SCHEMA (per region entry)
 *  ─────────────────────────
 *  id            : string   – unique slug
 *  name          : string   – display name of the region
 *  country       : string   – country name
 *  continent     : string   – continent
 *  world         : "Old World" | "New World"
 *  coordinates   : { lat: number, lng: number }
 *  colors        : Array<"Red" | "White" | "Rosé">
 *  taste         : Array<"Dry" | "Off-Dry" | "Sweet">
 *  nature        : Array<"Still" | "Sparkling" | "Fortified" | "Aromatised">
 *  grapes        : { red: string[], white: string[] }
 *  famousWines   : string[]  – iconic labels / AOCs / DOCs from this region
 *  climate       : string    – climatic descriptor
 *  soil          : string    – dominant soil types
 *  description   : string    – editorial overview
 *  pairings      : string[]  – classic food pairings
 *  ageability    : "Drink Young" | "Medium Term" | "Long Ageing"
 *  priceRange    : "$" | "$$" | "$$$" | "$$$$"  – general bracket
 *  established   : string    – approx. winemaking history note
 * ============================================================
 */

// ─── HELPERS / ENUMS ────────────────────────────────────────

export const WORLD = Object.freeze({ OLD: "Old World", NEW: "New World" });
export const COLOR = Object.freeze({ RED: "Red", WHITE: "White", ROSE: "Rosé" });
export const TASTE = Object.freeze({ DRY: "Dry", OFF_DRY: "Off-Dry", SWEET: "Sweet" });
export const NATURE = Object.freeze({
  STILL: "Still",
  SPARKLING: "Sparkling",
  FORTIFIED: "Fortified",
  AROMATISED: "Aromatised",
});
export const AGE = Object.freeze({
  YOUNG: "Drink Young",
  MID: "Medium Term",
  LONG: "Long Ageing",
});

// ─── DATABASE ───────────────────────────────────────────────

export const wineRegions = [

  // ╔══════════════════════════════════════════╗
  // ║              OLD WORLD — FRANCE          ║
  // ╚══════════════════════════════════════════╝

  {
    id: "bordeaux",
    name: "Bordeaux",
    country: "France",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 44.8378, lng: -0.5792 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot", "Malbec"],
      white: ["Sauvignon Blanc", "Sémillon", "Muscadelle"],
    },
    famousWines: [
      "Château Pétrus", "Château Margaux", "Château Latour",
      "Château Mouton Rothschild", "Château Haut-Brion", "Château d'Yquem (Sweet)",
    ],
    climate: "Maritime — cool, moderate rainfall, oceanic influence",
    soil: "Gravel, clay, limestone, sandy loam",
    description:
      "The undisputed capital of the wine world, Bordeaux sits where the Garonne and Dordogne rivers meet the Atlantic. The Left Bank (Médoc, Graves) is dominated by Cabernet Sauvignon producing structured, tannic reds built for decades of ageing. The Right Bank (Saint-Émilion, Pomerol) leans into Merlot, crafting plush, opulent styles. Sauternes produces some of the world's most revered botrytised sweet whites. The 1855 Classification remains one of wine's most enduring hierarchies.",
    pairings: ["Lamb", "Duck confit", "Aged cheeses", "Foie gras (Sauternes)"],
    ageability: AGE.LONG,
    priceRange: "$$$$",
    established: "Roman era; formalised trade 12th century",
  },

  {
    id: "burgundy",
    name: "Burgundy (Bourgogne)",
    country: "France",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 47.053, lng: 4.383 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Pinot Noir", "Gamay"],
      white: ["Chardonnay", "Aligoté"],
    },
    famousWines: [
      "Romanée-Conti (DRC)", "La Tâche", "Montrachet", "Meursault",
      "Gevrey-Chambertin", "Chambolle-Musigny", "Chablis",
    ],
    climate: "Continental — cold winters, warm summers, frost risk",
    soil: "Limestone, marl, clay (Kimmeridgian limestone in Chablis)",
    description:
      "Burgundy is the spiritual home of Pinot Noir and Chardonnay. Its Grand Cru and Premier Cru vineyard hierarchy — the 'climat' system recognised by UNESCO — reflects centuries of Cistercian monastic precision. Terroir rules: a single-row difference between vineyards can yield profoundly different wines. Côte de Nuits produces the greatest reds; Côte de Beaune the finest whites. Chablis delivers steely, mineral Chardonnay. Prices for top Domaines regularly surpass any wine on earth.",
    pairings: ["Coq au vin", "Boeuf bourguignon", "Scallops", "Gruyère", "Truffle dishes"],
    ageability: AGE.LONG,
    priceRange: "$$$$",
    established: "4th century AD; Cistercian monks formalised crus 12th–15th century",
  },

  {
    id: "champagne",
    name: "Champagne",
    country: "France",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 49.0435, lng: 3.9707 },
    colors: [COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.SPARKLING],
    grapes: {
      red: ["Pinot Noir", "Pinot Meunier"],
      white: ["Chardonnay"],
    },
    famousWines: [
      "Dom Pérignon", "Krug Grande Cuvée", "Louis Roederer Cristal",
      "Bollinger Special Cuvée", "Ruinart Blanc de Blancs", "Salon Le Mesnil",
    ],
    climate: "Cool continental — northernmost major wine region of France",
    soil: "Chalk (belemnite), limestone, clay",
    description:
      "The world's most prestigious sparkling wine region, Champagne sits at the northern fringe of viable viticulture. Its chalky subsoil, cool climate and the Méthode Champenoise (traditional method) — secondary fermentation in bottle — produce wines of extraordinary complexity, fine persistent bubbles and celebrated toasty brioche notes. Non-Vintage blends maintain house styles; Vintage and Prestige Cuvées represent the pinnacle. Styles range from Brut Nature (bone dry) to Doux (sweet). Blanc de Blancs (100% Chardonnay) and Blanc de Noirs (red grapes only) are sub-categories.",
    pairings: ["Oysters", "Lobster", "Caviar", "Fried chicken", "Aged Parmesan"],
    ageability: AGE.MID,
    priceRange: "$$$",
    established: "17th century; Dom Pérignon credited 1693 (apocryphal)",
  },

  {
    id: "alsace",
    name: "Alsace",
    country: "France",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 48.3183, lng: 7.4416 },
    colors: [COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Pinot Noir"],
      white: ["Riesling", "Gewurztraminer", "Pinot Gris", "Muscat", "Pinot Blanc", "Sylvaner"],
    },
    famousWines: [
      "Trimbach Clos Sainte Hune Riesling", "Zind-Humbrecht Rangen de Thann",
      "Hugel Vendange Tardive", "Domaine Weinbach Gewurztraminer",
    ],
    climate: "Semi-continental — dry, warm, sheltered by Vosges Mountains",
    soil: "Diverse: granite, limestone, sandstone, clay, schist",
    description:
      "Nestled between the Vosges mountains and the Rhine, Alsace enjoys one of France's driest and sunniest climates. Unlike most French regions, wines here are labelled by grape variety. Riesling achieves piercing minerality and age-worthiness; Gewurztraminer offers explosive rose, lychee and spice aromatics. Vendange Tardive and Sélection de Grains Nobles represent late-harvest and botrytised sweet pinnacles. Crémant d'Alsace is a quality traditional-method sparkling.",
    pairings: ["Choucroute garnie", "Foie gras", "Munster cheese", "Asian cuisine (Gewurz)"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Roman era; strongly influenced by German winemaking heritage",
  },

  {
    id: "rhone_valley",
    name: "Rhône Valley",
    country: "France",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 44.2, lng: 4.75 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL, NATURE.FORTIFIED],
    grapes: {
      red: ["Syrah", "Grenache", "Mourvèdre", "Cinsault", "Carignan"],
      white: ["Viognier", "Marsanne", "Roussanne", "Clairette", "Grenache Blanc"],
    },
    famousWines: [
      "Hermitage (Jaboulet, Chapoutier)", "Côte-Rôtie (Guigal La Mouline)",
      "Châteauneuf-du-Pape", "Condrieu", "Crozes-Hermitage",
    ],
    climate: "North: continental with steep granite terraces; South: Mediterranean",
    soil: "North: granite, schist; South: galets roulés (large rounded stones), limestone",
    description:
      "Divided into distinct North and South personalities, the Rhône Valley is Syrah's ancestral heartland. The Northern Rhône — Hermitage, Côte-Rôtie, Cornas — produces powerful, age-worthy Syrahs on vertiginous granite slopes; Condrieu and Château-Grillet showcase Viognier's heady floral aromatics. The Southern Rhône — Châteauneuf-du-Pape, Gigondas, Vacqueyras — blends Grenache-dominant southern cuvées of warmth and generosity. Mistral winds are a defining climatic force.",
    pairings: ["Wild boar", "Lamb", "Herbes de Provence dishes", "Tapenade", "Hard cheeses"],
    ageability: AGE.LONG,
    priceRange: "$$$",
    established: "Roman era; Papal Avignon court elevated Châteauneuf-du-Pape 14th century",
  },

  {
    id: "loire_valley",
    name: "Loire Valley",
    country: "France",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 47.3941, lng: 0.6848 },
    colors: [COLOR.WHITE, COLOR.RED, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Cabernet Franc", "Pinot Noir", "Gamay"],
      white: ["Sauvignon Blanc", "Chenin Blanc", "Muscadet (Melon de Bourgogne)"],
    },
    famousWines: [
      "Sancerre", "Pouilly-Fumé", "Vouvray", "Chinon",
      "Muscadet sur Lie", "Bourgueil", "Savennières", "Quarts de Chaume",
    ],
    climate: "Oceanic to semi-continental gradient west to east",
    soil: "Tuffeau (soft limestone), schist, flint, clay-limestone",
    description:
      "France's longest river hosts one of its most diverse wine 'gardens'. From Muscadet's crisp Atlantic whites to Sancerre and Pouilly-Fumé's textbook Sauvignon Blanc, Vouvray's chameleonic Chenin Blanc (dry through sublime sweet Moelleux), and Chinon's elegant Cabernet Franc, the Loire offers extraordinary breadth. Cremant de Loire and Saumur sparkling add fizz. The valley is also a natural wine heartland with many biodynamic pioneers.",
    pairings: ["Goat's cheese", "Salmon", "Asparagus", "Rillettes", "Tarte Tatin"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Roman era; Renaissance royal courts drove prestige",
  },

  {
    id: "provence",
    name: "Provence",
    country: "France",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 43.5298, lng: 5.4474 },
    colors: [COLOR.ROSE, COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Grenache", "Syrah", "Mourvèdre", "Cinsault", "Carignan"],
      white: ["Rolle (Vermentino)", "Clairette", "Ugni Blanc"],
    },
    famousWines: [
      "Château d'Esclans Whispering Angel", "Domaines Ott",
      "Bandol (Domaine Tempier)", "Château Simone Palette",
    ],
    climate: "Hot Mediterranean — lavender hills, intense sunshine, Mistral",
    soil: "Limestone, clay, schist, sandy soils",
    description:
      "Provence is the world's rosé capital — producing some 40% of global rosé exports. The signature pale salmon style is dry, crisp, and endlessly Instagrammable. Beyond rosé, Bandol produces Mourvèdre-based reds of extraordinary depth and longevity. The landscape of limestone hills, Mediterranean scrubland (garrigue), and lavender fields imprints a herbal, sun-drenched character on every bottle. Château d'Esclans' Whispering Angel virtually single-handedly created the premium rosé market.",
    pairings: ["Grilled fish", "Ratatouille", "Bouillabaisse", "Tapenade", "Niçoise salad"],
    ageability: AGE.YOUNG,
    priceRange: "$$",
    established: "600 BC by Greek colonists — oldest wine region in France",
  },

  // ╔══════════════════════════════════════════╗
  // ║              OLD WORLD — ITALY           ║
  // ╚══════════════════════════════════════════╝

  {
    id: "tuscany",
    name: "Tuscany (Toscana)",
    country: "Italy",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 43.4167, lng: 11.0526 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Sangiovese", "Cabernet Sauvignon", "Merlot", "Syrah", "Colorino"],
      white: ["Vernaccia", "Malvasia", "Trebbiano"],
    },
    famousWines: [
      "Chianti Classico DOCG", "Brunello di Montalcino", "Vino Nobile di Montepulciano",
      "Bolgheri (Sassicaia)", "Amarone della Valpolicella",
    ],
    climate: "Mediterranean-continental — hot summers, cool nights, maritime influence on coast",
    soil: "Galestro (rocky schist), alberese (compact clay-limestone), sandy coastal soils",
    description:
      "Italy's most storied wine region paints a picture of cypress-lined hills, Renaissance towns and Sangiovese vines. Chianti Classico, between Florence and Siena, produces the iconic Gallo Nero (Black Rooster) wines. Brunello di Montalcino is one of Italy's most powerful, age-worthy reds from 100% Sangiovese Grosso (Brunello clone). The Bolgheri coast saw the 'Super Tuscans' — Sassicaia, Ornellaia, Masseto — upend Italian wine law in the 1970s–80s with international varieties outside the DOC system.",
    pairings: ["Bistecca Fiorentina", "Wild boar pasta", "Pecorino", "Ribollita", "Truffles"],
    ageability: AGE.LONG,
    priceRange: "$$$",
    established: "Etruscan era; modern Chianti codified 1282",
  },

  {
    id: "piedmont",
    name: "Piedmont (Piemonte)",
    country: "Italy",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 44.7225, lng: 8.0539 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Nebbiolo", "Barbera", "Dolcetto", "Grignolino", "Freisa"],
      white: ["Moscato Bianco", "Arneis", "Cortese", "Favorita"],
    },
    famousWines: [
      "Barolo DOCG", "Barbaresco DOCG", "Barbera d'Asti",
      "Moscato d'Asti", "Asti Spumante", "Gavi", "Roero Arneis",
    ],
    climate: "Continental — Alpine influence; fog-filled valleys (Langhe = 'the tongues')",
    soil: "Calcareous marl, Helvetian (Serralunga) and Tortonian (La Morra) soils",
    description:
      "Piedmont, 'foot of the mountains', is Italy's answer to Burgundy — a single noble grape, Nebbiolo, producing wines of immense complexity and longevity in Barolo and Barbaresco. Barolo is 'the King of Italian Wines': powerful, tannic, with haunting notes of roses, tar, cherries and dried herbs. Barbaresco is the more elegant, feminine counterpart. Moscato d'Asti offers a delicate, low-alcohol sparkling sweet wine of singular charm. The white truffle capital Alba sits at the region's heart.",
    pairings: ["White truffles", "Braised beef (Brasato)", "Tajarin pasta", "Hazelnuts", "Bagna cauda"],
    ageability: AGE.LONG,
    priceRange: "$$$",
    established: "Pre-Roman; Barolo DOCG established 1980",
  },

  {
    id: "veneto",
    name: "Veneto",
    country: "Italy",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 45.4408, lng: 10.9938 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Corvina Veronese", "Rondinella", "Molinara", "Corvinone"],
      white: ["Glera (Prosecco)", "Garganega", "Pinot Grigio", "Chardonnay"],
    },
    famousWines: [
      "Amarone della Valpolicella DOCG", "Ripasso Valpolicella",
      "Soave Classico", "Prosecco DOC/DOCG", "Recioto della Valpolicella",
    ],
    climate: "Transitional continental-Mediterranean; Lake Garda moderates temperatures",
    soil: "Volcanic basalt, limestone, alluvial plains",
    description:
      "Italy's most prolific wine region by volume. The Valpolicella zone is home to Amarone — one of the world's most distinctive wines made from dried (appassimento) grapes concentrated into a rich, velvety, alcohol-rich red. Soave produces crisp whites from Garganega. Prosecco, made via the Charmat (tank) method from Glera grapes in the Conegliano-Valdobbiadene hills, is the world's best-selling sparkling wine. Recioto is the sweet, dried-grape dessert counterpart to Amarone.",
    pairings: ["Risotto all'Amarone", "Osso buco", "Cured meats", "Cicchetti (tapas)", "Hard cheeses"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Roman era; Amarone accidentally discovered 1930s",
  },

  {
    id: "sicily",
    name: "Sicily (Sicilia)",
    country: "Italy",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 37.5998, lng: 14.0154 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.FORTIFIED],
    grapes: {
      red: ["Nero d'Avola", "Nerello Mascalese", "Nerello Cappuccio", "Frappato"],
      white: ["Grillo", "Catarratto", "Carricante", "Zibibbo (Muscat of Alexandria)"],
    },
    famousWines: [
      "Etna Rosso DOC", "Nero d'Avola", "Marsala DOC (Fortified)",
      "Passito di Pantelleria (Sweet)", "Cerasuolo di Vittoria DOCG",
    ],
    climate: "Hot Mediterranean; Etna has unique cool volcanic microclimate",
    soil: "Volcanic (Etna), limestone, sandy coastal, clay",
    description:
      "Sicily, the Mediterranean's largest island, has transformed from a bulk-wine supplier to one of Italy's most exciting wine frontiers. Mount Etna's volcanic slopes produce high-altitude wines of surprising elegance and minerality from ancient pre-phylloxera vines. Nero d'Avola delivers lush, full-bodied reds. Marsala, the fortified wine from the northwest, spans dry aperitivo to rich, oxidative styles. The sun-drenched island of Pantelleria produces Passito di Pantelleria — liquid gold from sun-dried Zibibbo grapes.",
    pairings: ["Grilled swordfish", "Caponata", "Arancini", "Pistachio dishes", "Cannoli (Passito)"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Ancient Greek colonists 8th century BC",
  },

  // ╔══════════════════════════════════════════╗
  // ║              OLD WORLD — SPAIN           ║
  // ╚══════════════════════════════════════════╝

  {
    id: "rioja",
    name: "Rioja",
    country: "Spain",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 42.2877, lng: -2.539 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Tempranillo", "Garnacha", "Mazuelo (Carignan)", "Graciano"],
      white: ["Viura (Macabeo)", "Malvasía Riojana", "Garnacha Blanca"],
    },
    famousWines: [
      "La Rioja Alta Gran Reserva 904", "Marqués de Murrieta Castillo Ygay",
      "CVNE Imperial", "Bodegas Muga Prado Enea", "Viña Tondonia",
    ],
    climate: "Semi-arid continental; Sierra de Cantabria moderates Atlantic influence",
    soil: "Alluvial clay-limestone (Alta), ferrous clay (Alavesa), sandy alluvial (Baja)",
    description:
      "Spain's most internationally recognised fine wine region sits in northern Spain along the Ebro River. Rioja's signature is Tempranillo aged in American and French oak — from Joven (young, unoaked) through Crianza, Reserva, to the pinnacle Gran Reserva (minimum 5 years ageing, 2 in oak). The region recently added Rioja DOCa sub-zones: Rioja Oriental, Rioja Alta, and Rioja Alavesa, allowing single-village and single-vineyard classifications that reflect Burgundian thinking.",
    pairings: ["Lamb chops", "Chorizo", "Manchego", "Roast suckling pig", "Iberian ham"],
    ageability: AGE.LONG,
    priceRange: "$$",
    established: "Winemaking since antiquity; modern Rioja shaped by Bordeaux influence 1860s",
  },

  {
    id: "ribera_del_duero",
    name: "Ribera del Duero",
    country: "Spain",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 41.6496, lng: -3.6888 },
    colors: [COLOR.RED],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Tinto Fino (Tempranillo clone)", "Garnacha", "Cabernet Sauvignon", "Merlot"],
      white: [],
    },
    famousWines: [
      "Vega Sicilia Único", "Pingus", "Pesquera", "Emilio Moro", "Abadía Retuerta",
    ],
    climate: "Extreme continental plateau — cold winters, hot summers, wide diurnal range, high altitude (700–900m)",
    soil: "Sandy limestone, alluvial soils along Duero river",
    description:
      "On the high plateau of Castilla y León, Ribera del Duero is Spain's premium red wine region, rivalling Rioja for prestige. The extreme continental climate at altitude (the region sits at 700–900m) stresses vines into producing concentrated, structured reds. Vega Sicilia — producing 'Único' for over 150 years — is one of Spain's most collected wines. Peter Sisseck's Pingus, first made in 1995, quickly achieved cult status. The region is overwhelmingly dedicated to Tinto Fino (a Tempranillo clone uniquely adapted to this terroir).",
    pairings: ["Roast lamb (Lechazo)", "Aged Castilian cheeses", "Game meats", "Mushroom risotto"],
    ageability: AGE.LONG,
    priceRange: "$$$",
    established: "Medieval; modern DO established 1982",
  },

  {
    id: "sherry_jerez",
    name: "Sherry / Jerez-Xérès-Sherry",
    country: "Spain",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 36.6850, lng: -6.1382 },
    colors: [COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.FORTIFIED],
    grapes: {
      red: [],
      white: ["Palomino Fino", "Pedro Ximénez", "Moscatel"],
    },
    famousWines: [
      "Tío Pepe Fino", "La Gitana Manzanilla", "Lustau Almacenista",
      "González Byass Apostoles Palo Cortado", "Osborne Pedro Ximénez Gran Reserva",
    ],
    climate: "Hot Mediterranean — Poniente & Levante winds, chalky albariza soils reflect heat",
    soil: "Albariza (brilliant white chalk), barro (clay), arena (sand)",
    description:
      "Sherry is one of the world's great fortified wines, made exclusively in the 'Sherry Triangle' around Jerez de la Frontera, Sanlúcar de Barrameda, and El Puerto de Santa María. The solera ageing system blends wines across multiple vintages in fractional quantities. Styles range from bone-dry, flor-aged Fino and Manzanilla (with a distinctive saline, yeasty character) through Amontillado and Oloroso to the luscious sweetness of Pedro Ximénez — poured over vanilla ice cream, it is one of gastronomy's simple sublime pleasures.",
    pairings: ["Jamón ibérico", "Almonds", "Manchego", "Anchovies", "Blue cheese (PX)", "Vanilla ice cream"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Ancient Phoenician roots; modern solera system from 18th century",
  },

  {
    id: "priorat",
    name: "Priorat",
    country: "Spain",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 41.175, lng: 0.7589 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Garnacha", "Cariñena (Carignan)", "Syrah", "Cabernet Sauvignon", "Merlot"],
      white: ["Garnacha Blanca", "Pedro Ximénez", "Chenin Blanc"],
    },
    famousWines: [
      "Clos Erasmus", "L'Ermita (Álvaro Palacios)", "Clos Mogador",
      "Clos de l'Obac", "Finca Dofí",
    ],
    climate: "Hot, dry Mediterranean; dramatic slate (llicorella) landscape",
    soil: "Llicorella — black and brown slate and quartz; poor, well-drained",
    description:
      "Priorat's dramatic landscape of black slate terraces — llicorella — produces some of Spain's most concentrated, mineral wines. Old Garnacha and Cariñena vines, some over a century old, push deep roots through the schist to find water, producing yields so low (sometimes less than 1kg per vine) that wines of extraordinary density result. Álvaro Palacios' L'Ermita is one of the world's most expensive Spanish wines. The region was resurrected by a small group of pioneering winemakers in the 1980s who arrived in a near-abandoned village.",
    pairings: ["Grilled meats", "Aged cheeses", "Game", "Dark chocolate desserts"],
    ageability: AGE.LONG,
    priceRange: "$$$$",
    established: "12th century Carthusian monks; modern revival 1980s",
  },

  // ╔══════════════════════════════════════════╗
  // ║            OLD WORLD — PORTUGAL         ║
  // ╚══════════════════════════════════════════╝

  {
    id: "douro_port",
    name: "Douro Valley / Port Wine",
    country: "Portugal",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 41.1615, lng: -7.7985 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.FORTIFIED],
    grapes: {
      red: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz (Tempranillo)", "Tinta Barroca", "Tinta Cão"],
      white: ["Viosinho", "Rabigato", "Gouveio", "Malvasia Fina"],
    },
    famousWines: [
      "Taylor Fladgate Vintage Port", "Graham's Single Quinta", "Quinta do Crasto",
      "Niepoort Batuta (Dry red)", "Ramos Pinto", "Fonseca Vintage",
    ],
    climate: "Extreme continental — sheltered by mountains; scorching summers, harsh winters",
    soil: "Schist (xisto) — rocky, poor, moisture-retaining",
    description:
      "Carved by the Douro River through dramatic schist terraces, this UNESCO World Heritage landscape has produced Port wine for over 300 years. Fortified with grape spirit (aguardente) mid-fermentation to retain sweetness and alcohol, Port comes in Tawny (barrel-aged, nutty, oxidative), Ruby (fruit-forward), and the pinnacle Vintage Port (declared exceptional years, cellared for decades). Unfortified Douro table wines, led by Niepoort's Batuta, are Portugal's most exciting fine wine category.",
    pairings: ["Stilton (Vintage Port)", "Walnuts", "Dark chocolate", "Roast duck", "Chorizo"],
    ageability: AGE.LONG,
    priceRange: "$$$",
    established: "1756 — first demarcated wine region in the world (Marquis of Pombal)",
  },

  {
    id: "alentejo",
    name: "Alentejo",
    country: "Portugal",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 38.5, lng: -7.9 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Aragonez (Tempranillo)", "Trincadeira", "Alicante Bouschet", "Touriga Nacional"],
      white: ["Antão Vaz", "Arinto", "Roupeiro"],
    },
    famousWines: [
      "Esporão Reserva", "Herdade do Mouchão", "Pêra Manca",
      "Quinta do Mouro", "José Maria da Fonseca Periquita",
    ],
    climate: "Hot, dry continental — cork oak plains, extreme summer heat",
    soil: "Granite, schist, clay, sandy soils; typical red Alentejo clay plains",
    description:
      "The vast, sun-baked plains of southern Portugal, carpeted with cork oaks and olive trees, produce generous, warm-hearted wines. Alentejo reds are full-bodied, soft-tannined, fruit-forward wines with earthy Mediterranean character. The region is Portugal's most dynamic, with significant foreign investment and modern winemaking facilities (Adega de Borba, Esporão). Alicante Bouschet — the only dark-fleshed (teinturier) grape variety of note — produces uniquely inky, structured wines here.",
    pairings: ["Black Iberian pork (pata negra)", "Açorda (bread soups)", "Sheep's cheese"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Ancient; modern DO structure from 1988",
  },

  // ╔══════════════════════════════════════════╗
  // ║            OLD WORLD — GERMANY          ║
  // ╚══════════════════════════════════════════╝

  {
    id: "mosel",
    name: "Mosel",
    country: "Germany",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 49.9949, lng: 7.1744 },
    colors: [COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: [],
      white: ["Riesling", "Müller-Thurgau", "Elbling"],
    },
    famousWines: [
      "Egon Müller Scharzhofberger Trockenbeerenauslese", "JJ Prüm Wehlener Sonnenuhr",
      "Dr. Loosen", "Joh. Jos. Christoffel", "Clemens Busch",
    ],
    climate: "Cool continental — Mosel river acts as solar heat accumulator; one of world's northernmost quality regions",
    soil: "Blue Devonian slate (Blauschiefer) — conducts heat, retains warmth overnight",
    description:
      "Threading through vertiginous slate cliffs in ancient river bends, the Mosel is where Riesling achieves its most ethereal, low-alcohol, acid-fuelled expression. From Kabinett (delicate, off-dry) through Spätlese, Auslese to the stratospheric Trockenbeerenauslese (TBA) — botrytised wines of almost immeasurable sweetness and complexity — the Prädikat system reflects natural sugar levels at harvest. Some of the world's longest-lived white wines are made here. Prices for top Goldkapsule Auslesen and TBA rival the finest Burgundy.",
    pairings: ["Riesling with Riesling (tradition)", "Trout", "Pork roast", "Crab", "Spicy Asian food"],
    ageability: AGE.LONG,
    priceRange: "$$$",
    established: "Roman era; Trier (Augusta Treverorum) was a wine hub 2,000 years ago",
  },

  {
    id: "rheingau",
    name: "Rheingau",
    country: "Germany",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 50.0, lng: 8.0 },
    colors: [COLOR.WHITE, COLOR.RED],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Spätburgunder (Pinot Noir)"],
      white: ["Riesling", "Müller-Thurgau"],
    },
    famousWines: [
      "Schloss Johannisberg", "Robert Weil Kiedrich Gräfenberg",
      "Georg Breuer Rüdesheim Berg Schlossberg",
    ],
    climate: "Mild continental — Rhine bends east-west, southern slopes face sun, Taunus forest blocks cold north winds",
    soil: "Quartzite schist, phyllite, loess, clay-loam",
    description:
      "The Rheingau is where a bend in the Rhine creates south-facing slopes perfectly oriented for viticulture. Home to Schloss Johannisberg — where the Spätlese harvest was accidentally discovered in 1775 — this compact region produces some of Germany's most aristocratic and long-lived Rieslings. The VDP classification system (Grosses Gewächs, Erste Lage) translates quality with rigour. Assmannshausen is noted for Spätburgunder (Pinot Noir), unusual for Germany.",
    pairings: ["Veal schnitzel", "White asparagus", "Salmon en croûte", "Apple strudel"],
    ageability: AGE.LONG,
    priceRange: "$$$",
    established: "12th century Cistercian monks planted Schloss Johannisberg",
  },

  // ╔══════════════════════════════════════════╗
  // ║            OLD WORLD — AUSTRIA          ║
  // ╚══════════════════════════════════════════╝

  {
    id: "wachau",
    name: "Wachau",
    country: "Austria",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 48.3728, lng: 15.4208 },
    colors: [COLOR.WHITE, COLOR.RED],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Zweigelt", "Blaufränkisch"],
      white: ["Grüner Veltliner", "Riesling", "Chardonnay"],
    },
    famousWines: [
      "F.X. Pichler Riesling Steinertal Smaragd", "Prager Wachstum Bodenstein",
      "Domäne Wachau Achleiten", "Rudi Pichler",
    ],
    climate: "Cool continental — cold Pannonian winds from east meet cool Atlantic air",
    soil: "Gneiss, mica-schist, loess, weathered granite terraces above Danube",
    description:
      "The Wachau, a UNESCO World Heritage site along the Danube west of Vienna, produces Austria's most prized white wines. Three quality tiers — Steinfeder (light), Federspiel (medium), Smaragd (richest, named after the emerald lizard) — define ripeness levels. Grüner Veltliner and Riesling here achieve a distinctive combination of peppery minerality, stone-fruit richness and laser-beam acidity. F.X. Pichler's wines are among the most sought-after whites in Europe.",
    pairings: ["Wiener Schnitzel", "Poached trout", "White asparagus", "Tafelspitz"],
    ageability: AGE.MID,
    priceRange: "$$$",
    established: "Roman era; Augustinian monks key in medieval period",
  },

  // ╔══════════════════════════════════════════╗
  // ║            OLD WORLD — GREECE           ║
  // ╚══════════════════════════════════════════╝

  {
    id: "santorini_greece",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 36.3932, lng: 25.4615 },
    colors: [COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.SWEET],
    nature: [NATURE.STILL],
    grapes: {
      red: [],
      white: ["Assyrtiko", "Athiri", "Aidani"],
    },
    famousWines: [
      "Sigalas Santorini Assyrtiko", "Domaine Hatzidakis", "Estate Argyros Cuvée Monsignori",
      "Vinsanto (Sweet fortified-style)", "Gaia Thalassitis",
    ],
    climate: "Arid Mediterranean — strong Meltemi winds, minimal rainfall, volcanic",
    soil: "Volcanic pumice and ash — phylloxera-free (no phylloxera survived in volcanic soil)",
    description:
      "Santorini's volcanic caldera island is viticultural unique. Vines trained in low basket shapes (kouloura) protect against savage Meltemi winds and year-round drought. The ash and pumice soils are naturally phylloxera-resistant — some vines are over 500 years old. Assyrtiko produces wines of extraordinary minerality, salt-spray freshness and searing acidity. Vinsanto, the island's vin santo-style sweet wine from air-dried grapes, has been made here since the Byzantine era. These are wines of irreplaceable place.",
    pairings: ["Grilled octopus", "Sea bass", "Feta", "Seafood meze", "Honey desserts (Vinsanto)"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Minoan era 3,000+ years ago; continuous viticulture since ancient Greece",
  },

  // ╔══════════════════════════════════════════╗
  // ║            OLD WORLD — HUNGARY          ║
  // ╚══════════════════════════════════════════╝

  {
    id: "tokaj",
    name: "Tokaj",
    country: "Hungary",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 48.1328, lng: 21.3935 },
    colors: [COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.FORTIFIED],
    grapes: {
      red: [],
      white: ["Furmint", "Hárslevelű", "Sárgamuskotály (Muscat Blanc)"],
    },
    famousWines: [
      "Royal Tokaji Aszú 5 Puttonyos", "Disznókő Aszú 6 Puttonyos",
      "István Szepsy Aszú", "Királyudvar Tokaji Furmint Dry",
    ],
    climate: "Continental — long warm autumns with morning mists from Bodrog/Tisza rivers promote noble rot",
    soil: "Volcanic (rhyolite), loess, clay",
    description:
      "Tokaj is the world's first classified wine appellation (1730 — predating Bordeaux's 1855 classification). Its Aszú wines, made from individual botrytis-infected berries selected by hand, represent one of the world's most remarkable sweet wine traditions. The term 'puttonyos' historically measured baskets of Aszú berries added to a barrel of base wine — from 3 (lighter) to 6 (the richest). Eszencia, made from the free-run juice of Aszú berries alone, can have residual sugar levels approaching 800 g/L and may live for centuries. 'Wine of Kings, King of Wines' — Louis XIV of France.",
    pairings: ["Foie gras", "Roquefort", "Creamy desserts", "Fresh fruit", "Dried apricot"],
    ageability: AGE.LONG,
    priceRange: "$$$",
    established: "First classified appellation in the world, 1730",
  },

  // ╔══════════════════════════════════════════╗
  // ║          NEW WORLD — USA               ║
  // ╚══════════════════════════════════════════╝

  {
    id: "napa_valley",
    name: "Napa Valley",
    country: "United States",
    continent: "North America",
    world: WORLD.NEW,
    coordinates: { lat: 38.2975, lng: -122.2869 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Pinot Noir", "Zinfandel", "Syrah"],
      white: ["Chardonnay", "Sauvignon Blanc"],
    },
    famousWines: [
      "Screaming Eagle Cabernet", "Opus One", "Harlan Estate",
      "Caymus Special Selection", "Far Niente", "Stag's Leap Wine Cellars",
    ],
    climate: "Mediterranean — cool Pacific fog and Bay breezes moderate summer heat",
    soil: "Highly diverse: volcanic (Howell Mountain), alluvial benchland, clay, loam",
    description:
      "The 'Paris Tasting' of 1976 — when Napa wines blindly outscored Bordeaux and Burgundy before French judges — put Napa on the world's wine map overnight. Today it is America's most prestigious wine region, producing Cabernet Sauvignon of extraordinary power, dark fruit, cassis and structured tannins. Fifteen sub-AVAs (American Viticultural Areas) including Rutherford ('Rutherford Dust'), Oakville, Spring Mountain, and Stags Leap District each impart distinct characters. Prices for top 'cult' Cabs rival or exceed any wine globally.",
    pairings: ["Prime ribeye", "Truffle pasta", "Aged cheddar", "Wagyu beef", "Mushroom dishes"],
    ageability: AGE.LONG,
    priceRange: "$$$$",
    established: "Modern era from 1966 (Robert Mondavi Winery); exploded post-1976",
  },

  {
    id: "sonoma",
    name: "Sonoma County",
    country: "United States",
    continent: "North America",
    world: WORLD.NEW,
    coordinates: { lat: 38.5158, lng: -122.9364 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Pinot Noir", "Zinfandel", "Cabernet Sauvignon", "Syrah"],
      white: ["Chardonnay", "Sauvignon Blanc", "Pinot Gris"],
    },
    famousWines: [
      "Williams Selyem Pinot Noir", "Kosta Browne", "Ridge Lytton Springs Zinfandel",
      "Rochioli", "Iron Horse Sparkling",
    ],
    climate: "Diverse — Pacific Ocean heavily influences with fog and cool breezes; warmer inland valleys",
    soil: "Diverse: Goldridge sandy loam, Haire clay, Rincon clay loam",
    description:
      "Napa's larger, more ecologically diverse neighbour is home to some of California's finest Pinot Noir (Russian River Valley, Sonoma Coast), old-vine Zinfandel (Dry Creek, Alexander Valley), and complex Chardonnay. Fourteen sub-AVAs range from the cool Pacific-kissed Sonoma Coast to the warmer Alexander and Dry Creek valleys. Sonoma is generally considered more 'earthy' and diverse than Napa. The Anderson Valley extension produces Mendocino's finest sparkling and Pinot.",
    pairings: ["Salmon", "Duck breast", "Dungeness crab", "Grilled chicken", "Artisan cheese"],
    ageability: AGE.MID,
    priceRange: "$$$",
    established: "Franciscan missionaries 1812; modern era 1960s–70s",
  },

  {
    id: "willamette_valley",
    name: "Willamette Valley",
    country: "United States",
    continent: "North America",
    world: WORLD.NEW,
    coordinates: { lat: 45.3373, lng: -123.0352 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Pinot Noir"],
      white: ["Pinot Gris", "Chardonnay", "Pinot Blanc", "Riesling"],
    },
    famousWines: [
      "Domaine Drouhin Oregon", "Cristom Vineyards", "Eyrie Vineyards",
      "Elk Cove", "Adelsheim", "Beaux Frères (Beau Frère of R Parker)",
    ],
    climate: "Cool maritime — Cascades block Pacific cold; warm summers with cool nights",
    soil: "Jory (volcanic basalt), Willakenzie (sedimentary marine), Laurelwood (loess windblown)",
    description:
      "Oregon's Willamette Valley has emerged as America's answer to Burgundy — a cool-climate Pinot Noir paradise. The Dundee Hills' red Jory volcanic soils are deeply associated with the region's most complex wines. Eyrie Vineyards' founder David Lett first brought Pinot Noir here in 1965, inspired by Burgundy, and a 1980 blind tasting where Eyrie outperformed many Burgundies validated his vision. Today, with Drouhin's investment and biodynamic pioneers like Beaux Frères, Willamette stands alongside Burgundy and Sonoma as a Pinot triumvirate.",
    pairings: ["Pacific salmon", "Duck", "Chanterelle mushrooms", "Pinot-braised pork", "Hazelnut desserts"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "David Lett planted first Pinot Noir 1965",
  },

  {
    id: "finger_lakes",
    name: "Finger Lakes",
    country: "United States",
    continent: "North America",
    world: WORLD.NEW,
    coordinates: { lat: 42.6, lng: -76.9 },
    colors: [COLOR.WHITE, COLOR.RED],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Pinot Noir", "Cabernet Franc", "Lemberger"],
      white: ["Riesling", "Chardonnay", "Gewurztraminer"],
    },
    famousWines: [
      "Hermann J. Wiemer Riesling", "Ravines Wine Cellars",
      "Red Newt Cellars", "Forge Cellars", "Atwater Estate",
    ],
    climate: "Cool continental — deep glacial lakes moderate temperatures, prevent frost",
    soil: "Shale, schist, limestone, glacial deposits",
    description:
      "New York's premier wine region, the Finger Lakes' eleven long glacial lakes moderate what would otherwise be dangerously cold conditions for quality viticulture. Riesling is the undisputed star — producing Mosel-inspired dry to luscious late-harvest styles with electrifying acidity and mineral precision. Seneca Lake and Cayuga Lake are the two primary AVAs. The region attracts comparison to Germany's coolest Rhine regions. Cabernet Franc also shines in warm years.",
    pairings: ["Smoked trout", "Lobster bisque", "Goat cheese", "Pork tenderloin"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Brotherhood Winery (oldest US winery) 1839; modern quality Riesling from 1960s",
  },

  // ╔══════════════════════════════════════════╗
  // ║          NEW WORLD — AUSTRALIA         ║
  // ╚══════════════════════════════════════════╝

  {
    id: "barossa_valley",
    name: "Barossa Valley",
    country: "Australia",
    continent: "Oceania",
    world: WORLD.NEW,
    coordinates: { lat: -34.535, lng: 138.9549 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL, NATURE.FORTIFIED],
    grapes: {
      red: ["Shiraz (Syrah)", "Grenache", "Mourvèdre", "Cabernet Sauvignon"],
      white: ["Riesling", "Semillon", "Chardonnay"],
    },
    famousWines: [
      "Penfolds Grange", "Henschke Hill of Grace", "Torbreck RunRig",
      "Two Hands Ares", "Seppeltsfield 100-Year-Old Tawny",
    ],
    climate: "Mediterranean — hot, dry summers; old (100–150yr) bush vines",
    soil: "Red-brown earth, sandy loam over clay, ironstone",
    description:
      "Australia's most internationally famous wine region, and the spiritual home of Shiraz. Ludicrously old bush vines — some pre-phylloxera vines planted in the 1840s by Silesian Lutheran immigrants — produce thick, concentrated fruit. Penfolds Grange, made from Barossa Shiraz, is Australia's most iconic and collectable wine, a national treasure. The Barossa's style is opulent, chocolate-dark, and generous. Seppeltsfield is unique for releasing 100-year-old tawny each year — a living wine time capsule.",
    pairings: ["BBQ ribs", "Kangaroo steak", "Sharp cheddar", "Dark chocolate", "Lamb"],
    ageability: AGE.LONG,
    priceRange: "$$$",
    established: "Silesian Lutheran settlers 1842",
  },

  {
    id: "mclaren_vale",
    name: "McLaren Vale",
    country: "Australia",
    continent: "Oceania",
    world: WORLD.NEW,
    coordinates: { lat: -35.2182, lng: 138.5448 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Shiraz", "Grenache", "Cabernet Sauvignon", "Mourvèdre"],
      white: ["Chardonnay", "Viognier", "Fiano"],
    },
    famousWines: [
      "d'Arenberg Dead Arm Shiraz", "Clarendon Hills Astralis",
      "Wirra Wirra Church Block", "Penny's Hill", "Chapel Hill",
    ],
    climate: "Mediterranean coastal — cooler than Barossa due to Gulf St Vincent sea breezes",
    soil: "Sandy loam, red clay, limestone and ironstone ('coffee rock')",
    description:
      "South of Adelaide, McLaren Vale blends Mediterranean climate with a cool maritime influence to produce Shiraz and Grenache of extraordinary density and depth, yet with more silkiness and complexity than the hotter Barossa. The region has a strong alternative culture — Chester Osborn of d'Arenberg famously labels his wines with whimsical art and names (The Foot Bolt, The Dead Arm, The Broken Fishplate). Italian varieties Fiano and Nero d'Avola are increasingly exciting in this warm region.",
    pairings: ["Lamb kofta", "Eggplant dishes", "Aged gouda", "Slow-braised lamb shoulder"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "John Reynell planted first vines 1838",
  },

  {
    id: "margaret_river",
    name: "Margaret River",
    country: "Australia",
    continent: "Oceania",
    world: WORLD.NEW,
    coordinates: { lat: -33.9556, lng: 115.0734 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Shiraz"],
      white: ["Chardonnay", "Semillon", "Sauvignon Blanc"],
    },
    famousWines: [
      "Leeuwin Estate Art Series Chardonnay", "Cullen Diana Madeline",
      "Moss Wood Cabernet", "Vasse Felix Premier", "Cape Mentelle",
    ],
    climate: "Maritime Mediterranean — Indian Ocean moderates heat; consistent, mild growing season",
    soil: "Gravelly sandy loams, gravel over laterite",
    description:
      "Isolated at Australia's southwest tip, Margaret River is considered the country's finest source of Bordeaux-style red blends and rich, creamy Chardonnay. The maritime climate is uniquely consistent — low disease pressure and long, even growing seasons allow grapes to achieve exceptional physiological ripeness while retaining freshness. Leeuwin Estate Art Series Chardonnay is arguably Australia's greatest white wine. Semillon-Sauvignon Blanc blends are a regional signature.",
    pairings: ["Karri trout", "Lobster", "Beef tenderloin", "Soft cheeses"],
    ageability: AGE.MID,
    priceRange: "$$$",
    established: "Encouraged by Dr John Gladstones' 1965 report; first wineries 1967",
  },

  {
    id: "yarra_valley",
    name: "Yarra Valley",
    country: "Australia",
    continent: "Oceania",
    world: WORLD.NEW,
    coordinates: { lat: -37.65, lng: 145.5 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Pinot Noir", "Cabernet Sauvignon", "Shiraz"],
      white: ["Chardonnay", "Pinot Gris", "Riesling"],
    },
    famousWines: [
      "Yering Station Reserve", "Coldstream Hills (James Halliday)", 
      "De Bortoli Noble One", "Giant Steps", "Tarrawarra Estate",
    ],
    climate: "Cool maritime-continental — Melbourne's weekend getaway wine country",
    soil: "Grey sandy loam, clay, red volcanic loam",
    description:
      "One hour east of Melbourne, the Yarra Valley is Victoria's premium cool-climate region and Australia's Pinot Noir heartland alongside the Mornington Peninsula. Founded by the Baron de Pury in the 1880s and revived in the 1970s, it produces restrained, savoury Pinot Noir and elegant Chardonnay in Burgundian style. James Halliday, Australia's most influential wine critic, planted Coldstream Hills here in 1985. Sparkling wine production, including Domaine Chandon (Australia), adds effervescence.",
    pairings: ["Yabbies (crayfish)", "Duck", "Mushroom risotto", "Truffle dishes"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Lilydale winery 1838; modern revival late 1960s",
  },

  // ╔══════════════════════════════════════════╗
  // ║          NEW WORLD — NEW ZEALAND       ║
  // ╚══════════════════════════════════════════╝

  {
    id: "marlborough_nz",
    name: "Marlborough",
    country: "New Zealand",
    continent: "Oceania",
    world: WORLD.NEW,
    coordinates: { lat: -41.5131, lng: 173.9612 },
    colors: [COLOR.WHITE, COLOR.RED, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Pinot Noir"],
      white: ["Sauvignon Blanc", "Chardonnay", "Riesling", "Pinot Gris"],
    },
    famousWines: [
      "Cloudy Bay Sauvignon Blanc", "Brancott Estate", "Villa Maria Reserve",
      "Dog Point Vineyard", "Clos Henri", "Fromm",
    ],
    climate: "Maritime cool — high UV, cool nights, significant diurnal range",
    soil: "Stony alluvial Wairau, clay-based Brancott Valley",
    description:
      "Marlborough single-handedly created the international market for Sauvignon Blanc. When Cloudy Bay's 1985 vintage was released, its explosive passionfruit, gooseberry, freshly-cut grass and capsicum character captivated wine drinkers globally. The Wairau Valley's UV intensity and cool maritime climate produce Sauvignon Blanc of irrepressible aromatic intensity. Marlborough now accounts for over 75% of New Zealand's wine production. Pinot Noir from the Southern Valleys (Brancott, Omaka) is increasingly serious and structured.",
    pairings: ["Green-lipped mussels", "Whitebait fritters", "Goat's cheese", "Asparagus"],
    ageability: AGE.YOUNG,
    priceRange: "$$",
    established: "First commercial plantings 1973 (Montana Wines)",
  },

  {
    id: "central_otago_nz",
    name: "Central Otago",
    country: "New Zealand",
    continent: "Oceania",
    world: WORLD.NEW,
    coordinates: { lat: -44.993, lng: 169.3 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Pinot Noir"],
      white: ["Riesling", "Pinot Gris", "Chardonnay", "Gewurztraminer"],
    },
    famousWines: [
      "Felton Road Block 3 and 5 Pinot Noir", "Rippon Mature Vine Pinot Noir",
      "Amisfield", "Mt Difficulty", "Burn Cottage",
    ],
    climate: "Extreme continental — world's southernmost wine region; wide diurnal range, harsh winters",
    soil: "Schist rock, loess, clay",
    description:
      "Central Otago is the world's southernmost wine region — and its most dramatic. Surrounded by snow-capped mountains, with the turquoise Clutha River flowing through gold-rush ghost towns, this extreme continental climate produces New Zealand's most powerful, structured Pinot Noir. The enormous diurnal temperature range (30°C+ swings) preserves freshness and aromatic complexity while intense UV ripens fruit. Felton Road is arguably New Zealand's greatest producer. The region is overwhelmingly committed to biodynamic and organic viticulture.",
    pairings: ["Central Otago salmon", "Venison", "Duck confit", "Wild mushroom pasta"],
    ageability: AGE.MID,
    priceRange: "$$$",
    established: "Gold rush era 1860s; modern quality viticulture from 1980s",
  },

  // ╔══════════════════════════════════════════╗
  // ║          NEW WORLD — ARGENTINA         ║
  // ╚══════════════════════════════════════════╝

  {
    id: "mendoza",
    name: "Mendoza",
    country: "Argentina",
    continent: "South America",
    world: WORLD.NEW,
    coordinates: { lat: -32.8908, lng: -68.8272 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Malbec", "Cabernet Sauvignon", "Syrah", "Bonarda"],
      white: ["Torrontés", "Chardonnay", "Viognier"],
    },
    famousWines: [
      "Catena Zapata Adrianna Vineyard", "Achaval Ferrer Finca Mirador",
      "Zuccardi Valle de Uco", "Clos de los Siete", "Cheval des Andes",
    ],
    climate: "High altitude desert — Andes meltwater irrigation; UV, cold nights, minimal disease",
    soil: "Alluvial, sandy-loam, calcareous; varies with altitude",
    description:
      "Argentina's most important wine region sits in the rain shadow of the Andes at elevations of 600–1,500m. Mendoza virtually reinvented Malbec — a grape considered secondary in its Cahors homeland — into a plush, violet-hued, velvety New World icon. The key to quality is altitude: Luján de Cuyo (900–1,050m), Maipú, and particularly the emerging Valle de Uco (up to 1,500m) at the Andes' foot produce wines of extraordinary concentration and freshness. Zuccardi's Valle de Uco wines are now ranked among the world's finest.",
    pairings: ["Asado (Argentine BBQ)", "Chimichurri steak", "Empanadas", "Blue cheese"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Spanish missionaries 1550s; modern revival late 1990s",
  },

  // ╔══════════════════════════════════════════╗
  // ║          NEW WORLD — CHILE             ║
  // ╚══════════════════════════════════════════╝

  {
    id: "maipo_valley",
    name: "Maipo Valley",
    country: "Chile",
    continent: "South America",
    world: WORLD.NEW,
    coordinates: { lat: -33.7776, lng: -70.6906 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Carmenère", "Syrah"],
      white: ["Chardonnay", "Sauvignon Blanc"],
    },
    famousWines: [
      "Concha y Toro Don Melchor", "Almaviva", "Santa Rita Casa Real",
      "Viñedo Chadwick", "Antiyal",
    ],
    climate: "Mediterranean — Andes moderation, Pacific influence; warm days, cool nights",
    soil: "Alluvial clay and gravel, volcanic ash",
    description:
      "Chile's oldest and most prestigious wine valley surrounds the capital Santiago. Maipo is Chile's Cabernet heartland, producing wines that rival Bordeaux at a fraction of the price. The famous 'Berliner Verkostung' (Berlin tasting) of 2004 saw Seña and Viñedo Chadwick — both Maipo Cabernets — outrank first-growth Bordeaux. The lost grape Carmenère, long confused with Merlot, was identified here in 1994 and has become Chile's signature variety — plummy, smoky, with green olive notes.",
    pairings: ["Asado", "Cazuela (stew)", "Lomo a lo pobre", "Aged cheeses"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Spanish colonial winemaking 1548; modern era 1980s",
  },

  // ╔══════════════════════════════════════════╗
  // ║         NEW WORLD — SOUTH AFRICA       ║
  // ╚══════════════════════════════════════════╝

  {
    id: "stellenbosch",
    name: "Stellenbosch",
    country: "South Africa",
    continent: "Africa",
    world: WORLD.NEW,
    coordinates: { lat: -33.9321, lng: 18.8602 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Pinotage", "Syrah", "Shiraz"],
      white: ["Chenin Blanc (Steen)", "Chardonnay", "Sauvignon Blanc"],
    },
    famousWines: [
      "Kanonkop Paul Sauer", "Meerlust Rubicon", "Rust en Vrede",
      "Vergelegen", "Grangehurst", "Boekenhoutskloof Chocolate Block",
    ],
    climate: "Mediterranean — Cape Doctor south-easter wind cools vineyards; proximity to two oceans",
    soil: "Decomposed granite, Table Mountain Sandstone, alluvial",
    description:
      "South Africa's premium wine heartland combines old-world tradition (Dutch colonists planted vines here in 1679) with exciting modern winemaking. Stellenbosch is where Pinotage — a uniquely South African crossing of Pinot Noir and Cinsault created in 1925 — flourishes alongside world-class Cabernet Sauvignon and Bordeaux-style blends. The Cape's dramatic scenery of mountain crags and whitewashed Cape Dutch farmsteads is inseparable from the wine experience. The 'Swartland Revolution' of natural wine pioneers is reshaping the national conversation.",
    pairings: ["Springbok (venison)", "Boerewors", "Bobotie", "Aged Cheddar"],
    ageability: AGE.LONG,
    priceRange: "$$",
    established: "Jan van Riebeeck planted first Cape vines 1659",
  },

  {
    id: "franschhoek",
    name: "Franschhoek",
    country: "South Africa",
    continent: "Africa",
    world: WORLD.NEW,
    coordinates: { lat: -33.9142, lng: 19.1217 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Shiraz", "Pinot Noir"],
      white: ["Chenin Blanc", "Chardonnay", "Semillon"],
    },
    famousWines: [
      "Boekenhoutskloof", "Haute Cabrière (Pierre Jourdan MCC Sparkling)",
      "La Motte", "Graham Beck (MCC Sparkling)", "Rupert & Rothschild",
    ],
    climate: "Mediterranean — mountain amphitheatre, cooler than Stellenbosch",
    soil: "Decomposed granite, shale, sandstone",
    description:
      "The 'French Corner' was settled by Huguenot refugees in 1688, bringing French viticultural tradition that lingers in place names and wine culture today. The dramatic mountain-ringed valley is arguably South Africa's most beautiful wine destination. Haute Cabrière and Graham Beck produce Cap Classique (traditional method sparkling) of exceptional quality — Graham Beck blanc de blancs was served at Nelson Mandela's and Barack Obama's inaugurations. Semillon, an heirloom variety here since Huguenot days, produces age-worthy whites.",
    pairings: ["Cape Malay curry", "Linefish", "Duck à l'orange", "Cheese platters"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Huguenot settlers 1688",
  },

  // ╔══════════════════════════════════════════╗
  // ║     ADDITIONAL OLD WORLD — SPAIN        ║
  // ╚══════════════════════════════════════════╝

  {
    id: "rias_baixas",
    name: "Rías Baixas",
    country: "Spain",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 42.4045, lng: -8.7082 },
    colors: [COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: [],
      white: ["Albariño", "Loureira", "Treixadura"],
    },
    famousWines: [
      "Pazo de Señorans", "Martín Códax Albariño", "Bodegas Fillaboa",
      "Do Ferreiro Cepas Vellas", "Zárate",
    ],
    climate: "Cool Atlantic — heavy rainfall, Atlantic breezes; granite pergola trellis systems",
    soil: "Granite, sand, alluvial",
    description:
      "Spain's premier white wine region clings to the Atlantic coast of Galicia, where ría (fjord) inlets create a cool, wet microclimate uniquely suited to Albariño. The grape — with its thick skins (sun protection in wet climates) and naturally high acidity — produces Spain's most refreshing, citrus-driven, peach-scented white wines. Pergola trellis systems lift vines high above the humid ground to prevent rot. Often compared to Vinho Verde (just across the Portuguese border), Rías Baixas Albariño has greater weight and texture.",
    pairings: ["Pulpo a la gallega (octopus)", "Zamburiñas (scallops)", "Grilled fish", "Percebes"],
    ageability: AGE.YOUNG,
    priceRange: "$$",
    established: "Medieval; DO established 1988",
  },

  // ╔══════════════════════════════════════════╗
  // ║     OLD WORLD — GEORGIA (CAUCASUS)      ║
  // ╚══════════════════════════════════════════╝

  {
    id: "kakheti_georgia",
    name: "Kakheti",
    country: "Georgia",
    continent: "Europe/Asia",
    world: WORLD.OLD,
    coordinates: { lat: 41.6434, lng: 45.7085 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Saperavi", "Shavkapito", "Tavkveri"],
      white: ["Rkatsiteli", "Mtsvane", "Kisi", "Chinuri"],
    },
    famousWines: [
      "Pheasant's Tears Rkatsiteli", "Chateau Mukhrani", "Teliani Valley",
      "Orgo", "Our Wine",
    ],
    climate: "Warm continental — Alazani Valley; Caucasus mountains, Black Sea influence",
    soil: "Clay, limestone, sand; volcanic deposits",
    description:
      "Georgia is almost certainly the birthplace of winemaking — archaeologists have found 8,000-year-old grape seeds and wine-making residues in Neolithic pots (kvevri) in the Caucasus. The Qvevri tradition — fermenting and ageing wine in large clay amphorae buried underground — produces the world's original 'orange wine': white grapes fermented on their skins for months, producing tannin-rich, amber-hued whites of extraordinary complexity. Saperavi makes some of the boldest, darkest reds in Europe. The natural wine movement has ignited a global revival of qvevri wines.",
    pairings: ["Khinkali (dumplings)", "Supra feast dishes", "Walnut sauces", "Lamb chakapuli"],
    ageability: AGE.MID,
    priceRange: "$",
    established: "8,000 years ago — oldest evidence of winemaking on Earth",
  },

  // ╔══════════════════════════════════════════╗
  // ║     NEW WORLD — ARGENTINA CONTINUES     ║
  // ╚══════════════════════════════════════════╝

  {
    id: "salta_argentina",
    name: "Salta / Cafayate",
    country: "Argentina",
    continent: "South America",
    world: WORLD.NEW,
    coordinates: { lat: -25.9625, lng: -65.9598 },
    colors: [COLOR.WHITE, COLOR.RED, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Malbec", "Tannat", "Cabernet Sauvignon"],
      white: ["Torrontés Riojano"],
    },
    famousWines: [
      "Clos de los Siete", "El Esteco Don David",
      "Etchart Privado Torrontés", "Piattelli Premium Reserve",
    ],
    climate: "High altitude desert extreme — world's highest commercial vineyards (2,000–3,000m); intense UV, cold nights",
    soil: "Sandy alluvial, calcareous, rocky",
    description:
      "The world's highest commercial vineyards cling to the Andean slopes of Salta province at altitudes up to 3,000m — some of the highest in the world. Cafayate is the hub, famous for Torrontés Riojano, Argentina's signature white grape: a cross of Muscat of Alexandria and Criolla Chica with explosively floral, rose-petal, peach and apricot aromatics, yet bone-dry palate. Malbec at these extreme altitudes produces wines of concentrated dark fruit and electrifying freshness. The landscapes are among the world's most dramatic.",
    pairings: ["Tamales", "Humita", "Empanadas saltenas", "Locro (stew)"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Spanish missionaries; modern winery era from 1950s",
  },

  // ╔══════════════════════════════════════════╗
  // ║     NEW WORLD — CHILE CONTINUES         ║
  // ╚══════════════════════════════════════════╝

  {
    id: "casablanca_valley",
    name: "Casablanca Valley",
    country: "Chile",
    continent: "South America",
    world: WORLD.NEW,
    coordinates: { lat: -33.3162, lng: -71.4161 },
    colors: [COLOR.WHITE, COLOR.RED],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Pinot Noir", "Syrah"],
      white: ["Sauvignon Blanc", "Chardonnay", "Gewurztraminer"],
    },
    famousWines: [
      "Concha y Toro Casillero del Diablo Reserva", "Viña Casablanca",
      "Santa Carolina Reserva", "Kingston Family Vineyards",
    ],
    climate: "Cool coastal — Pacific Ocean fog and cold Humboldt Current; frost risk",
    soil: "Clay, sandy loam, granite-based",
    description:
      "Chile's first cool-climate wine region, established in the 1980s when Pablo Morandé recognised the cooling influence of Pacific fog flowing through a gap in the Coastal Range. Casablanca was a revelation for Chile — producing elegant, aromatic whites and Chile's finest Pinot Noir rather than the heavy reds of warmer valleys. Sauvignon Blanc here has crisp citrus and herbal character rather than tropical fruit. The coastal morning fog (camanchaca) that rolls in each morning is the defining viticultural force.",
    pairings: ["Ceviche", "Congrio (ling fish)", "Seafood empanadas", "Salmon"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "First plantings 1982 by Pablo Morandé",
  },

  // ╔══════════════════════════════════════════╗
  // ║     OLD WORLD — PORTUGAL CONTINUES      ║
  // ╚══════════════════════════════════════════╝

  {
    id: "vinho_verde",
    name: "Vinho Verde",
    country: "Portugal",
    continent: "Europe",
    world: WORLD.OLD,
    coordinates: { lat: 41.6948, lng: -8.4756 },
    colors: [COLOR.WHITE, COLOR.RED, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Vinhão", "Espadeiro", "Borraçal"],
      white: ["Loureiro", "Arinto (Pedernã)", "Avesso", "Alvarinho (Albariño)"],
    },
    famousWines: [
      "Soalheiro Alvarinho", "Anselmo Mendes Parcela Única",
      "Quinta de Gomariz", "Quintas de Melgaço",
    ],
    climate: "Cool Atlantic maritime — high rainfall, high humidity; Atlantic winds",
    soil: "Granite, sandy, alluvial",
    description:
      "Vinho Verde — 'green wine' — refers not to the colour but to its youthful freshness. Portugal's largest wine region produces light, zesty, low-alcohol whites that are among the world's most food-friendly. The premium Monção e Melgaço subzone, bordering Spain's Rías Baixas, produces Alvarinho (Albariño) of singular purity and depth. Traditional Vinho Verde has a slight natural effervescence from a secondary CO2 release. Red Vinho Verde — unusual outside Portugal — is deeply coloured, tannic and unusual: served chilled, it pairs brilliantly with grilled sardines.",
    pairings: ["Grilled sardines", "Bacalhau", "Green salads", "Shellfish"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Medieval; DO established 1908",
  },

  // ╔══════════════════════════════════════════╗
  // ║     NEW WORLD — CALIFORNIA CONTINUES    ║
  // ╚══════════════════════════════════════════╝

  {
    id: "paso_robles",
    name: "Paso Robles",
    country: "United States",
    continent: "North America",
    world: WORLD.NEW,
    coordinates: { lat: 35.6311, lng: -120.6916 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Zinfandel", "Cabernet Sauvignon", "Syrah", "Grenache", "Mourvèdre", "Petite Sirah"],
      white: ["Viognier", "Chardonnay", "Roussanne"],
    },
    famousWines: [
      "Tablas Creek (Rhône varieties)", "Justin Isosceles",
      "J. Lohr Seven Oaks", "Saxum James Berry", "Turley Wine Cellars",
    ],
    climate: "Extreme diurnal range continental — hottest California wine region by day; cold ocean air at night",
    soil: "Calcareous limestone, chalk, clay",
    description:
      "Paso Robles, on California's Central Coast, is one of the state's most exciting and fastest-growing wine regions. Its extraordinary diurnal range — up to 50°F difference between day and night temperatures — preserves acidity and aromatic freshness in otherwise hot-climate wines. The Westside calcareous soils strongly influence mineral character. Tablas Creek, established in partnership with Château Beaucastel of Châteauneuf-du-Pape, pioneered quality Rhône varieties. Zinfandel reaches huge, jammy, sometimes port-like expressions here.",
    pairings: ["Tri-tip BBQ", "Braised short ribs", "Spicy chorizo", "Dark chocolate"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Mission San Miguel 1797; modern quality era 1990s",
  },

  // ╔══════════════════════════════════════════╗
  // ║          OLD WORLD — MADEIRA            ║
  // ╚══════════════════════════════════════════╝

  {
    id: "madeira_island",
    name: "Madeira",
    country: "Portugal",
    continent: "Africa (Atlantic Island)",
    world: WORLD.OLD,
    coordinates: { lat: 32.7607, lng: -16.9595 },
    colors: [COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.FORTIFIED],
    grapes: {
      red: ["Tinta Negra"],
      white: ["Sercial", "Verdelho", "Bual (Boal)", "Malmsey (Malvasia)", "Terrantez"],
    },
    famousWines: [
      "Barbeito 1920s Vintage", "Blandy's 10-Year Malmsey",
      "Henriques & Henriques Sercial", "Leacock's Verdelho",
    ],
    climate: "Subtropical Atlantic — perpetual spring; volcanic island microclimate",
    soil: "Volcanic basalt and tuffite; steep terraced vinhas (poios)",
    description:
      "Madeira is arguably the world's most indestructible wine — deliberately oxidised through the Estufagem (heating) or Canteiro (attic ageing) processes that replicate the effects of long sea voyages. 18th-century Madeira was prized globally, surviving in ship holds in conditions that would destroy any other wine. The unique Maderisation process creates wines of extraordinary longevity — bottles from the early 1800s are still viable and magnificent. Styles range from bone-dry Sercial (aperitif) through nutty Verdelho and Bual to the rich, sweet Malmsey (Malvasia).",
    pairings: ["Onion soup (Sercial)", "Foie gras (Malmsey)", "Chocolate cake", "Walnuts"],
    ageability: AGE.LONG,
    priceRange: "$$",
    established: "15th century Portuguese colonists; vital provision for Atlantic exploration",
  },


  // ╔══════════════════════════════════════════╗
  // ║          NEW WORLD — INDIA              ║
  // ╚══════════════════════════════════════════╝

  {
    id: "nashik",
    name: "Nashik",
    country: "India",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 20.0112, lng: 73.7903 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Cabernet Sauvignon", "Shiraz (Syrah)", "Merlot", "Ruby Cabernet", "Zinfandel"],
      white: ["Chenin Blanc", "Sauvignon Blanc", "Chardonnay", "Viognier", "Riesling"],
    },
    famousWines: [
      "Sula Vineyards Dindori Reserve Shiraz",
      "York Winery Reserve Cabernet Sauvignon",
      "Grover Zampa La Réserve",
      "Vallonné Vineyards Chenin Blanc",
      "Fratelli Sette (Sangiovese blend)",
      "Soma Wines Sauvignon Blanc",
    ],
    climate:
      "Semi-arid tropical plateau — Sahyadri (Western Ghats) moderates temperatures; hot days, cool nights; monsoon season July–September (vines dormant)",
    soil: "Red laterite, black basalt (Deccan trap), sandy loam, alluvial along Godavari river",
    description:
      "Nashik is unquestionably India's wine capital — nicknamed the 'Napa Valley of India' and producing over 80% of the country's total wine output. Situated at 550–700m elevation on the Deccan Plateau in Maharashtra, the Sahyadri mountain range shields vineyards from the harshest monsoon winds while delivering cool nights that preserve aroma and acidity. Sula Vineyards, founded by Rajeev Samant in 1999 after returning from Silicon Valley, is India's largest and best-known winery, producing over 10 million litres annually. The region hosts SulaFest — Asia's largest wine and music festival — every February, drawing tens of thousands of visitors. Nashik wineries have invested heavily in wine tourism, with barrel rooms, tasting halls and luxury vineyard stays that have transformed Maharashtra's tourism landscape. Chenin Blanc has emerged as Nashik's signature white grape, adapting remarkably well to the Deccan terroir with a tropical freshness distinct from its Loire Valley homeland.",
    pairings: ["Tandoori chicken", "Paneer tikka", "Lamb rogan josh", "Biryani", "Seafood Koliwada"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "First modern commercial winery (Sham Ghodawat) 1988; Sula Vineyards 1999 sparked the revolution",
  },

  {
    id: "dindori_nashik",
    name: "Dindori (Nashik Sub-region)",
    country: "India",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 20.2032, lng: 73.8325 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Shiraz", "Cabernet Sauvignon", "Grenache"],
      white: ["Chenin Blanc", "Viognier"],
    },
    famousWines: [
      "Sula Dindori Reserve Shiraz",
      "York Winery Arros (Blend)",
      "Vallonné Vineyards Reserve Red",
    ],
    climate:
      "Higher altitude sub-plateau — cooler than Nashik valley floor; stronger diurnal variation enhancing grape phenolic development",
    soil: "Black cotton soil (regur), red basalt; iron-rich volcanic Deccan trap",
    description:
      "Dindori is Nashik's premium sub-zone, sitting slightly higher and cooler than the main Nashik valley floor. Its iron-rich black basalt soils and cooler nights allow grapes to hang longer on the vine, building more complex phenolic structures before harvest. Sula's flagship 'Dindori Reserve Shiraz' — aged in French oak — is widely considered one of India's most compelling reds: dark, peppery, with a meaty depth uncommon in Indian wine. York Winery, a boutique producer with a strong artisan philosophy, has garnered international recognition for this sub-zone's potential.",
    pairings: ["Slow-cooked mutton", "Seekh kebab", "Pepper chicken", "Aged Indian cheeses"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Sub-zone recognised commercially post-2005; Sula pioneered Dindori sourcing",
  },

  {
    id: "bangalore_karnataka",
    name: "Bangalore / Nandi Hills (Karnataka)",
    country: "India",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 13.3702, lng: 77.6835 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Cabernet Sauvignon", "Shiraz", "Merlot", "Cabernet Franc"],
      white: ["Sauvignon Blanc", "Chardonnay", "Viognier"],
    },
    famousWines: [
      "Grover Zampa La Réserve Blanc de Blancs (Sparkling)",
      "Grover Zampa Vijay Amritraj Collection",
      "Grover La Réserve Red",
      "Big Banyan Wines Cabernet Sauvignon",
      "Myra Vineyards Viognier",
    ],
    climate:
      "Tropical high-plateau — Nandi Hills at 900–1,000m; two growing seasons possible annually due to tropical latitude; monsoon management critical",
    soil: "Red laterite, sandy granite, ancient Precambrian gneiss",
    description:
      "Karnataka's Nandi Hills, 60km north of Bengaluru at 900–1,000m elevation, is India's second most important wine region and the birthplace of quality Indian wine. Grover Zampa Vineyards, established in 1988 by Kanwal Grover with technical assistance from Bordeaux's Michel Rolland, produced some of India's earliest internationally recognised fine wines. The tropical latitude means two potential growing cycles per year — harvest occurs in January–February and sometimes a second in June. The volcanic laterite soils drain rapidly, which combined with the high elevation moderates the otherwise tropical climate. Grover's 'La Réserve' Blanc de Blancs sparkling was served to the Indian Parliament and has won medals at international competitions. Myra Vineyards' aromatic whites have placed Karnataka's Viognier on the map.",
    pairings: ["Chettinad chicken", "Bisi bele bath", "Masala dosa", "Coorg pork curry"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Grover Zampa Vineyards 1988 — among India's first quality wine producers",
  },

  {
    id: "pune_sahyadri",
    name: "Pune / Sahyadri Foothills (Maharashtra)",
    country: "India",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 18.5204, lng: 73.8567 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Shiraz", "Merlot", "Grenache"],
      white: ["Chenin Blanc", "Sauvignon Blanc", "Chardonnay"],
    },
    famousWines: [
      "Fratelli Sangiovese",
      "Fratelli Sette",
      "Nine Hills Wines",
      "Charosa Vineyards Reserve",
      "Renaissance Winery Cabernet",
    ],
    climate:
      "Tropical plateau at 550–700m — drier western Sahyadri rain shadow; hot summers, warm winters; very low disease pressure",
    soil: "Shallow black basalt, laterite, rocky volcanic outcrops",
    description:
      "The Sahyadri foothills east and southeast of Pune host a cluster of boutique wineries that benefit from the rain shadow of the Western Ghats — receiving significantly less monsoon rainfall than the Konkan coast. Fratelli Wines, an Indo-Italian venture founded by the Secci brothers (Tuscany) and the Sekhri brothers (India), brought Italian winemaking philosophy and Sangiovese cuttings to Maharashtra, producing 'Fratelli Sette' — a seven-grape blend that is considered one of India's most complex red wines. Charosa Vineyards near Igatpuri has pioneered wine tourism in the Sahyadri ranges. The region's extreme basalt soils and dramatic landscape draw comparison to parts of Sicily.",
    pairings: ["Malvani fish curry", "Kolhapuri mutton", "Misal pav", "Chicken sukka"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Fratelli Wines and Charosa established 2007–2010; boutique era",
  },

  {
    id: "himachal_pradesh_india",
    name: "Himachal Pradesh (Kullu / Kinnaur)",
    country: "India",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 31.6862, lng: 77.2678 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Shiraz"],
      white: ["Chardonnay", "Sauvignon Blanc", "Riesling"],
    },
    famousWines: [
      "Mohan Meakin Wines (Kullu Valley)",
      "Kinnaur Winery Reserve",
      "HPMC Wines (Himachal Pradesh Horticulture Produce Marketing Corporation)",
    ],
    climate:
      "Cold continental Himalayan — extreme altitude (900–2,000m); cold winters with snowfall, warm summers, minimal humidity; true four-season climate",
    soil: "Rocky Himalayan alluvial, slate, granite, quartzite",
    description:
      "India's most geographically extreme wine region sits in the Himalayan foothills and river valleys of Himachal Pradesh — particularly the Kullu Valley, Shimla hills, and the high-altitude Kinnaur district along the Sutlej river. Vineyards at 900–2,000m experience genuine continental seasons with cold winters, providing the vine dormancy that creates complex, structured wine in a way the tropical south cannot replicate. Mohan Meakin has produced wines here since the colonial era. Kinnaur's Kinnauri grape — a local variety — produces a distinctive, semi-sweet table wine. The emerging private sector is beginning to unlock Himachal's potential for cooler-climate varieties like Riesling and aromatic whites, inspired by the success of high-altitude viticulture in similar climates worldwide.",
    pairings: ["Himachali dham (festive platter)", "Siddu (wheat bread with walnut)", "Trout", "Lamb"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Colonial British planted orchards and experimental vines 19th century; Mohan Meakin commercialised post-independence",
  },

  {
    id: "kashmir_india",
    name: "Kashmir Valley",
    country: "India",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 34.0837, lng: 74.7973 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Pinot Noir", "Cabernet Sauvignon"],
      white: ["Chardonnay", "Riesling", "Gewurztraminer"],
    },
    famousWines: [
      "Kashmir Winery Estate White",
      "J&K Horticulture Department Wines (Experimental)",
    ],
    climate:
      "Cold continental — Himalayan valley at 1,500–1,800m; cold snowy winters, mild summers; diurnal range 25–30°C; Jhelum river influence",
    soil: "Alluvial valley floor, schist and granite hillsides, glacial moraine deposits",
    description:
      "Kashmir is India's most nascent and extraordinary emerging wine territory. The valley's high altitude (1,500–1,800m), genuine cold winters that force proper vine dormancy, and wide diurnal temperature swings create conditions more analogous to cool European appellations than to tropical India. The J&K state government and private entrepreneurs are conducting serious experimental viticulture with European varieties. German variety Riesling and Burgundy's Pinot Noir show particular early promise in test plots. The region's existing apple and apricot orcharding tradition demonstrates the soil's suitability for temperate fruit culture. While commercial production is limited, Kashmir's long-term potential — comparable to mountain wine regions of northern Italy or southern Germany — is genuinely exciting.",
    pairings: ["Rogan josh", "Yakhni (yoghurt lamb)", "Kashmiri wazwan feast", "Gushtaba"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Experimental plantings from 2010s; nascent commercial production emerging",
  },

  // ╔══════════════════════════════════════════╗
  // ║          NEW WORLD — CHINA              ║
  // ╚══════════════════════════════════════════╝

  {
    id: "ningxia_helan",
    name: "Ningxia — Helan Mountain East",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 38.4872, lng: 106.1225 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL, NATURE.SPARKLING],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot", "Syrah", "Pinot Noir"],
      white: ["Chardonnay", "Riesling", "Viognier", "Sauvignon Blanc"],
    },
    famousWines: [
      "Château Changyu Moser XV Cabernet",
      "Silver Heights The Summit",
      "Château Légende (LVMH)",
      "Pernod Ricard Helan Mountain",
      "Grace Vineyard (Shanxi-influenced)",
      "Domaine des Aromes",
      "Château Mihail (Suntime)",
      "Kanaan Winery Pretty Pony",
    ],
    climate:
      "Semi-arid continental desert — rain shadow of Helan Mountains; 200mm annual rainfall; extreme diurnal range 15–20°C; winters require vines to be buried underground to survive frost; high UV intensity at 1,100m altitude",
    soil:
      "Sandy loam, alluvial gravel, calcareous deposits; well-drained east-facing slopes of Helan Mountain",
    description:
      "Ningxia's Helan Mountain East foothill corridor is China's most internationally celebrated wine region — the country's answer to Napa Valley, both in ambition and in official government backing. Sitting at 1,100m on the eastern slopes of the Helan Mountains, the region benefits from intense UV, well-drained sandy soils and a wide diurnal range that preserves freshness in otherwise warm-ripening conditions. A defining viticultural challenge is the brutal winter: temperatures drop to -20°C, forcing growers to bury vines under soil each November — an immense annual labour. In 2011, Ningxia's Château Jiahu Cabernet Sauvignon won a top gold medal at Decanter World Wine Awards, signalling China's arrival on the global stage. The regional government's ambitious '10 million bottle' production plan has attracted investment from LVMH (Château Légende), Pernod Ricard, and dozens of Bordeaux-trained Chinese winemakers who trained abroad before returning home. Silver Heights' Emma Gao, trained in Bordeaux, produces cult-status Cabernet Sauvignon under the 'Summit' label that has attracted praise from Jancis Robinson. Today Ningxia hosts over 120 bonded wineries and is rapidly professionalising across viticulture, cellar work and wine tourism infrastructure.",
    pairings: ["Peking duck", "Lamb skewers (yang rou chuan)", "Hand-pulled noodles", "Braised pork belly", "Steamed sea bass"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "First experimental plantings 1984 (Changyu); serious quality investment from 2000s; boom era 2010s–present",
  },

  {
    id: "xinjiang_china",
    name: "Xinjiang",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 42.8187, lng: 86.2149 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.FORTIFIED],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Malbec", "Syrah"],
      white: ["Chardonnay", "Riesling", "Gewurztraminer", "Muscat (Muscat Hamburg)"],
    },
    famousWines: [
      "Suntime Grand Cuvée (Xinjiang's largest producer)",
      "Vieille Vigne Xinjiang (Changyu)",
      "Château Guofeng Reserve",
      "Loulan Winery Cabernet",
      "Tiansai Vineyards",
    ],
    climate:
      "Extreme continental desert — Turpan Depression and Ili Valley; some areas receive <10mm annual rainfall; glacier meltwater irrigation from Tianshan Mountains; enormous diurnal range 30°C+; Turpan basin reaches 47°C in summer",
    soil:
      "Sandy desert alluvial, gravelly loam, calcareous; Turpan basin soils are extremely mineral; Ili Valley: fertile loessial",
    description:
      "Xinjiang is China's largest wine-producing province by area — a vast, sun-scorched autonomous region in the far northwest, closer to Istanbul than to Beijing. The Tianshan (Heavenly Mountains) glacier meltwater feeds intricate ancient karez irrigation channels that have sustained viticulture for millennia — table grape cultivation here dates back over 2,000 years on the Silk Road. Xinjiang has two distinct wine zones: the searingly hot Turpan Basin, home to Suntime (China's largest single winery complex), producing enormous volumes of bulk wine; and the cooler, more promising Ili Valley near Kazakhstan, where elevation, the westerly Atlantic moisture and a continental climate more akin to Central Asian wine regions allow for finer wine production. Muscat Hamburg and Riesling show particular promise in the Ili Valley's cooler microclimates. Xinjiang's sheer scale — the region accounts for roughly 30% of China's total vineyard area — makes it critical to understanding Chinese wine, even if quality is more variable than Ningxia.",
    pairings: ["Xinjiang lamb pilaf (polo)", "Roast lamb (kao quanyang)", "Uyghur flatbread (naan)", "Samsa (lamb pastry)"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Silk Road table grape cultivation 2,000+ years; modern wine production 1970s (state farms); commercial boom 1990s–2000s",
  },

  {
    id: "yunnan_china",
    name: "Yunnan — Shangri-La / Deqin",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 28.4684, lng: 99.7068 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Manseng"],
      white: ["Chardonnay", "Viognier", "Roussanne"],
    },
    famousWines: [
      "Shangri-La Winery (Tibet Plateau Cabernet)",
      "Ao Yun (LVMH — Moët Hennessy flagship China wine)",
      "Yunnan Red (Yunnan Highland Wine)",
      "Niya Winery",
    ],
    climate:
      "High-altitude tropical monsoon — Himalayan foothills at 2,200–2,800m; intense UV; monsoon rains require careful canopy management; mild winters, warm summers; Mekong river valley moderates extremes",
    soil:
      "Rocky granite, schist and limestone; steep Himalayan terraces; deep red laterite in lower valleys",
    description:
      "Yunnan's Shangri-La wine country, nestled in the Himalayan foothills of Deqin county near the Tibet Autonomous Region border, is one of the world's most dramatic and remote wine regions — vineyards cling to precipitous terraces above the Mekong River (Lancang) gorge at 2,200–2,800m altitude. LVMH's Moët Hennessy identified this extraordinary terroir and launched 'Ao Yun' in 2013 — a Cabernet Sauvignon-dominant blend from four villages near the sacred Meili Snow Mountain, releasing its first vintage in 2016 to enormous critical acclaim (Jancis Robinson praised it as 'remarkable'). Ao Yun sells for USD $300+ per bottle and is the most expensive and prestigious Chinese wine ever produced. The project works with local Tibetan farmers who tend vines by hand on terraces inaccessible to machinery, with donkeys transporting harvested grapes. Yunnan's Buddhist monastery culture and ancient tea-horse trade route history give this wine region a spiritual gravitas unlike anywhere else on earth.",
    pairings: ["Yunnan ham (Xuanwei ham)", "Tibetan butter tea pairing (unconventional)", "Yak cheese", "Wild mushroom dishes", "Braised pork with preserved vegetables"],
    ageability: AGE.MID,
    priceRange: "$$$$",
    established: "LVMH scouted site 2012; Ao Yun first vintage 2013, released 2016",
  },

  {
    id: "shandong_china",
    name: "Shandong (Yantai / Penglai)",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 37.4637, lng: 121.4479 },
    colors: [COLOR.RED, COLOR.WHITE, COLOR.ROSE],
    taste: [TASTE.DRY, TASTE.OFF_DRY, TASTE.SWEET],
    nature: [NATURE.STILL, NATURE.SPARKLING, NATURE.FORTIFIED],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Cabernet Gernischt (Carmenère)", "Syrah"],
      white: ["Chardonnay", "Riesling", "Welschriesling", "Muscat"],
    },
    famousWines: [
      "Changyu Pioneer Wine (China's oldest winery — est. 1892)",
      "Changyu Castel Cabernet Gernischt",
      "Dynasty Fine Wines (Yantai)",
      "Great Wall Wine (COFCO)",
      "Château Changyu AFIP Global",
    ],
    climate:
      "Temperate maritime monsoon — Yellow Sea and Bohai Bay influence; humid summers with heavy rainfall require fungal disease management; cold but not extreme winters",
    soil:
      "Sandy coastal, clay loam, well-drained hillside red soil; Penglai peninsula soils influenced by Yellow Sea marine deposits",
    description:
      "Shandong is the birthplace and historic heart of China's commercial wine industry. The Changyu Pioneer Wine Company, founded in 1892 in Yantai by Zhang Bishi with Austrian winemaking expertise, is the oldest operating winery in China and still one of Asia's largest wine companies. The Yantai and Penglai peninsula areas benefit from Yellow Sea maritime moderation, though high summer humidity is a persistent viticultural challenge requiring careful canopy management. The region's most distinctive grape is Cabernet Gernischt — long grown in China as a local variety and recently confirmed by DNA analysis to be Carmenère (the same Chilean signature variety). Great Wall Wine and Dynasty, both state-owned brands, built their national distribution from Shandong production and introduced millions of Chinese consumers to wine. Today Shandong remains vital for volume production even as Ningxia and Yunnan capture the fine wine headlines.",
    pairings: ["Shandong braised pork knuckle", "Sweet and sour Yellow River carp", "Dezhou braised chicken", "Seafood (coastal influence)"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Changyu Pioneer Wine Co. 1892 — oldest winery in China",
  },

  {
    id: "hebei_huailai",
    name: "Hebei — Huailai / Shacheng",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 40.4068, lng: 115.5157 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Syrah"],
      white: ["Chardonnay", "Riesling"],
    },
    famousWines: [
      "Château Lafite Rothschild Long Dai (Penglai — cross-regional)",
      "Domaine de la Romance Winery Hebei",
      "Shacheng Winery",
      "Dragon Seal Wines (Huailai)",
    ],
    climate:
      "Cold continental — close to Beijing; 600–700m altitude in Yanshan Mountain foothills; cold winters (vine burial required); warm, dry summers with minimal rainfall; strong north winds moderate temperature",
    soil:
      "Sandy gravel, loam over schist; well-drained slopes of Yanshan foothills",
    description:
      "The Huailai-Shacheng corridor in Hebei province, just 150km northwest of Beijing, has been producing commercial wine since the 1950s and is now home to Dragon Seal Wines — one of China's most established mid-range producers and a former joint venture with Pernod Ricard. The proximity to Beijing, China's most wine-literate and affluent consumer market, gives Hebei a commercial advantage and has attracted boutique investment. Cold winters again necessitate annual vine burial. The region is also notable as Château Lafite Rothschild initially considered Huailai before eventually siting its 'Long Dai' project in Shandong's Penglai — testimony to Hebei terroir's serious potential for Bordeaux varieties. Riesling is showing early promise in the mountain sub-zones.",
    pairings: ["Beijing roast duck", "Mongolian hot pot", "Braised oxtail", "Kung pao chicken"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "State winery production from 1950s; Dragon Seal commercialised 1980s with French partnership",
  },

  {
    id: "shanxi_grace",
    name: "Shanxi — Taiyuan / Taigu",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 37.5704, lng: 112.5645 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Marselan"],
      white: ["Chardonnay", "Viognier"],
    },
    famousWines: [
      "Grace Vineyard Chairman's Reserve Cabernet",
      "Grace Vineyard Deep Blue (Icon red)",
      "Shanxi Grace Chardonnay",
    ],
    climate:
      "Semi-arid continental plateau — loess plateau at 800m; dry summers, cold winters; vine burial required; wind-swept yellow dust plateau",
    soil:
      "Yellow loess, calcareous clay; the ancient loess plateau of northern China",
    description:
      "Grace Vineyard in Shanxi's Taigu county is one of China's most critically acclaimed estate wineries — a family project founded by Chan Siu-Park with French winemaker expertise that has produced consistently award-winning Cabernet Sauvignon since its first serious vintage in the early 2000s. 'Deep Blue' — Grace's icon wine made from Cabernet Sauvignon, Merlot, Cabernet Franc and Marselan — is widely considered one of China's finest red wines and commands prices and critical scores that compete with Ningxia's best. Shanxi's loess plateau soils, deposited by ancient winds from Central Asian deserts, create an unusual mineral character distinct from the alluvial soils of coastal regions. Marselan — a Cabernet Sauvignon × Grenache cross created by INRAE in France — has found a particularly successful home in northern China's harsh continental climate, offering better disease resistance and natural acidity than pure Cabernet.",
    pairings: ["Shanxi hand-shaved noodles (dao xiao mian)", "Braised pork with noodles", "Vinegar-based dishes (Shanxi famous for vinegar)", "Red-braised pork"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Grace Vineyard founded 1997; first acclaimed vintage early 2000s",
  },

  {
    id: "gansu_china",
    name: "Gansu — Hexi Corridor (Wuwei / Zhangye)",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 37.9292, lng: 102.6408 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Shiraz", "Pinot Noir"],
      white: ["Chardonnay", "Riesling", "Pinot Gris"],
    },
    famousWines: [
      "Mogao Winery Ice Wine (Zhangye)",
      "Zhiyuan Winery (Wuwei)",
      "Hexi Corridor Estate Reserve",
    ],
    climate:
      "Extreme arid desert continental — Gobi Desert corridor; almost zero rainfall (50–150mm annual); Qilian Mountain glacier meltwater irrigation; intense UV; huge diurnal range; cold winters with vine burial",
    soil:
      "Sandy desert gravel, calcareous alluvial fan, wind-blown loess; mineral-rich but extremely infertile soils requiring irrigation",
    description:
      "The Hexi Corridor — the ancient Silk Road narrows between the Gobi Desert and Qilian Mountains in Gansu province — is one of China's most historically resonant and viticulturally extreme wine regions. Camel caravans once transported wine along this very route between Central Asia and the Chinese interior. Today, the almost entirely rainless corridor (relying 100% on Qilian Mountain snowmelt for irrigation) produces wines of remarkable concentration and mineral purity from its infertile desert soils. Mogao Winery in Zhangye, near the famous Danxia coloured rock formations and Mogao Buddhist cave paintings, has pioneered ice wine production using the natural winter freeze — making it one of the few legitimate ice wine regions outside of Canada and Germany. Wuwei is the commercial hub, with the regional government investing heavily in wine tourism that links with the spectacular Silk Road cultural heritage sites.",
    pairings: ["Lanzhou beef noodles", "Hand-torn lamb naan (Gansu style)", "Roast camel (traditional)", "Cumin lamb"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Silk Road grape cultivation ancient; modern winery production 1980s–90s state farms",
  },

  {
    id: "inner_mongolia_china",
    name: "Inner Mongolia — Wuhai",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 39.6553, lng: 106.8251 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Pinot Noir"],
      white: ["Chardonnay", "Riesling"],
    },
    famousWines: [
      "Hansen Winery (Wuhai)",
      "Inner Mongolia Great Wall Wine",
      "Wuhai Vineyard Reserve",
    ],
    climate:
      "Extreme arid continental steppe — 1,000m altitude; Yellow River valley moderates some heat; very cold winters with deep vine burial; minimal rainfall; intense summer sun",
    soil:
      "Sandy loam, yellow riverine alluvial from Yellow River, calcareous steppe soils",
    description:
      "Wuhai, a city in Inner Mongolia where the Yellow River cuts through the steppe plateau, is one of China's most unusual emerging wine regions. The area benefits from a unique microclimate created by the Yellow River — its vast water body moderates summer heat and winter cold, creating a corridor suitable for viticulture in an otherwise inhospitable steppe. Hansen Winery is the regional pioneer, producing Cabernet Sauvignon and Chardonnay from vines that must be buried under insulating soil blankets each winter to survive temperatures that can plunge to -25°C. The region sits just south of Ningxia and shares some geological similarities with the Helan Mountain region. Wine tourism here connects with the dramatic Yellow River canyon landscapes and Inner Mongolian steppe culture.",
    pairings: ["Mongolian roast lamb (whole roast)", "Hand-picked mutton (shoupa rou)", "Steppe dairy dishes", "Grilled horsemeat (traditional)"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Hansen Winery established 2000; expanding rapidly with government tourism support",
  },

  {
    id: "liaoning_china",
    name: "Liaoning — Huanren (Ice Wine Region)",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 41.2655, lng: 125.3607 },
    colors: [COLOR.WHITE, COLOR.RED],
    taste: [TASTE.SWEET],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Vidal (hybrid)", "Cabernet Franc"],
      white: ["Vidal Blanc", "Riesling"],
    },
    famousWines: [
      "Huanren Wine Industry Ice Wine (Vidal)",
      "Benxi Ice Wine (Liaoning)",
      "Changyu Ice Wine (Liaoning sourced)",
    ],
    climate:
      "Cold continental — Manchurian winters regularly reach -15 to -25°C; natural freeze concentrates Vidal grapes for authentic Eiswein production; short warm summer growing season",
    soil:
      "Clay loam, granite-based mountain soil; Hunhe River valley influence",
    description:
      "Liaoning province in northeastern China (Manchuria) is the country's dedicated ice wine region — leveraging its brutally cold Manchurian winters to produce authentic Eiswein-style sweet wines from Vidal Blanc grapes. Huanren county near Benxi has developed China's most credible ice wine production, with natural winter temperatures reliably freezing grapes on the vine between -8°C and -15°C — the authentic production method recognised by Canadian and German ice wine standards (as opposed to cryoextraction shortcuts). Changyu sources Vidal grapes here for its ice wine range. The region produces China's most internationally award-winning dessert wines — several Huanren ice wines have taken gold at Decanter and the International Wine Challenge. The harsh growing environment limits red wine ambition, but Vidal's natural cold-hardiness makes it perfectly adapted to Manchurian viticulture.",
    pairings: ["Foie gras", "Blue cheese", "Fruit tarts", "Panna cotta", "Dried apricot desserts"],
    ageability: AGE.MID,
    priceRange: "$$",
    established: "Ice wine production developed 1990s–2000s; Huanren officially recognised as ice wine zone 2008",
  },

  {
    id: "beijing_miyun",
    name: "Beijing — Miyun / Fangshan",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 40.3763, lng: 116.8438 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Syrah"],
      white: ["Chardonnay", "Riesling"],
    },
    famousWines: [
      "Beijing Bolongbao Winery",
      "Château Bolongbao (Fangshan district)",
      "Beijing Dragon Seal Fangshan",
    ],
    climate:
      "Cold continental — capital city outskirts; 200–600m altitude in Yan Mountains foothills; cold dry winters; warm summers; vine burial in most sites",
    soil:
      "Mountain granite and schist soils, sandy loam, alluvial; Miyun Reservoir water table influence",
    description:
      "Beijing's suburban wine regions — particularly the Miyun and Fangshan districts in the Yan Mountain foothills — represent China's most strategically located wine production, sitting at the doorstep of the world's most wine-curious urban population. Château Bolongbao in Fangshan (Great Wall country, close to the Ming Tombs) is among Beijing's most visited wine tourism destinations, combining wine tasting with history tourism. The proximity to Beijing's 21 million consumers creates an insatiable demand that the local wine industry is increasingly positioned to serve. While not producing wines of the complexity of Ningxia or Yunnan, the Beijing periurban wine scene is a compelling example of wine as urban-rural lifestyle bridge, with 'vineyard weekend' tourism driving significant investment in hospitality infrastructure.",
    pairings: ["Peking duck", "Beijing zhajiangmian noodles", "Mongolian hotpot", "Roasted chestnuts"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Dragon Seal Fangshan operation 1980s; Bolongbao and boutique wineries 2000s–2010s",
  },

  {
    id: "sichuan_china",
    name: "Sichuan — Aba / Garzê (Tibetan Plateau Edge)",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 31.8994, lng: 101.9624 },
    colors: [COLOR.RED],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Syrah"],
      white: ["Chardonnay"],
    },
    famousWines: [
      "Tibet Plateau Winery (Experimental — Garzê)",
      "Sichuan Highland Wine (Aba district)",
    ],
    climate:
      "High altitude Tibetan plateau edge — 2,500–3,000m; intense UV; large diurnal range; dry growing season; cold winters; dramatic mountain microclimate",
    soil:
      "Rocky granite plateau, thin mountain soils, glacial river alluvial",
    description:
      "The eastern edge of the Tibetan Plateau in Sichuan's Garzê and Aba Tibetan Autonomous Prefectures represents China's most extreme and experimental wine frontier — vineyards at altitudes of 2,500–3,000m that rival some of the highest in Yunnan and rival world altitude records. The harsh environment, dramatic landscapes, and intense growing conditions are attracting adventurous winemakers inspired by the extraordinary results emerging from LVMH's Ao Yun project just across the provincial border in Yunnan's Deqin. Production is currently artisanal and very small-scale, but the region's proximity to Chengdu's enormous and prosperous consumer base makes commercial development increasingly plausible. A nascent 'Tibetan Plateau Wine Route' concept linking Yunnan's Shangri-La through Garzê to Lhasa is in early discussion stages.",
    pairings: ["Sichuan mala hotpot", "Tibetan tsampa (barley flour dishes)", "Yak stew", "Kung pao chicken"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Experimental viticulture from 2010s; emerging as next frontier after Yunnan's success",
  },

  {
    id: "tianjin_binhai",
    name: "Tianjin — Jixian",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 40.0456, lng: 117.4023 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Merlot", "Syrah"],
      white: ["Chardonnay"],
    },
    famousWines: [
      "Tianjin Dynasty Reserve Cabernet",
      "COFCO Jixian Vineyard",
    ],
    climate:
      "Cold continental maritime — Bohai Sea influence; cold dry winters; hot summers; frost risk spring",
    soil:
      "Alluvial plain, clay loam, some sandy soils near Bohai coast",
    description:
      "Tianjin's Jixian district, in the Yanshan Mountain foothills north of the Bohai Sea port city, has developed a small but commercially significant wine zone linked to the Dynasty Fine Wines brand — one of China's most iconic wine labels, established as a Sino-French joint venture with Rémy Martin in 1980. Dynasty Winery was among the first in China to produce European-style wines under a joint venture with French expertise, and for decades was China's most recognised premium wine brand. The Tianjin region is now one of several northern China zones competing for the growing premium domestic market, with Dynasty's historic brand equity giving it a resilience that newer players lack.",
    pairings: ["Tianjin goubuli baozi (steamed buns)", "Braised fish in brown sauce", "Tianjin-style pork"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Dynasty Winery Sino-French JV 1980 — one of China's first quality wine joint ventures",
  },

  {
    id: "qinghai_china",
    name: "Qinghai — Qinghai Lake Terroir",
    country: "China",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 37.0043, lng: 99.9997 },
    colors: [COLOR.WHITE, COLOR.RED],
    taste: [TASTE.DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Pinot Noir"],
      white: ["Riesling", "Chardonnay"],
    },
    famousWines: [
      "Qinghai Lake Winery (Experimental)",
    ],
    climate:
      "Cold Tibetan plateau continental — 3,200–3,800m altitude; world's highest wine experiments; extreme UV; cold winters; Qinghai Lake thermoregulation effect on immediate lakeshore",
    soil:
      "Rocky alpine plateau, volcanic deposits, sandy lakeshore soils",
    description:
      "Qinghai represents perhaps the most extreme wine-growing experiment in the world — vineyards near Qinghai Lake at 3,200–3,800m altitude, in the high-altitude Tibetan Plateau. The Qinghai Lake (China's largest inland lake and one of the highest major lakes on Earth) provides rare thermoregulation in an otherwise frigid plateau environment. Experimental viticulture here is driven by adventurous Chinese entrepreneurs who see altitude terroir — following the success of Yunnan's Ao Yun — as the next frontier of Chinese fine wine. UV intensity at these altitudes is among the highest of any wine region on Earth, producing intense anthocyanin accumulation in red grapes. Commercial production is at nascent stage, but Qinghai's breathtaking landscapes — the azure lake, Tibetan grasslands, migrating birds — make wine tourism a compelling adjacent opportunity.",
    pairings: ["Yak butter tea", "Tibetan barley bread", "Braised yak meat", "Wild mushroom dishes"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Experimental plantings 2015–present; world-altitude-record wine experiments ongoing",
  },

  {
    id: "telangana_andhra",
    name: "Telangana / Andhra Pradesh",
    country: "India",
    continent: "Asia",
    world: WORLD.NEW,
    coordinates: { lat: 17.3850, lng: 78.4867 },
    colors: [COLOR.RED, COLOR.WHITE],
    taste: [TASTE.DRY, TASTE.OFF_DRY],
    nature: [NATURE.STILL],
    grapes: {
      red: ["Cabernet Sauvignon", "Shiraz", "Merlot"],
      white: ["Chenin Blanc", "Sauvignon Blanc"],
    },
    famousWines: [
      "Heritage Wines Reserve Cabernet",
      "N.D. Wines (Andhra Pradesh)",
      "Golkonda Winery",
    ],
    climate:
      "Hot semi-arid plateau (Deccan) — elevation 450–600m; very hot summers reaching 45°C; harvest January–February",
    soil: "Red loamy laterite, black cotton soil, granite outcrops",
    description:
      "The Deccan Plateau regions of Telangana and Andhra Pradesh represent India's growing southern wine frontier. Heritage Wines, established near Hyderabad, was one of India's early established producers, combining Deccan terroir with French technical expertise. The extreme heat of the plateau requires careful viticultural management — harvest typically occurs in January–February, well ahead of the summer peak. The region benefits from the increasing consumer demand from Hyderabad's large, prosperous urban population. The flat plateau terrain allows mechanised viticulture at larger scale than the steep terrain of Maharashtra and Karnataka. While not yet producing wines of the complexity of Nashik or Nandi Hills, these wineries are rapidly improving in technique.",
    pairings: ["Hyderabadi biryani", "Gongura mutton", "Haleem", "Pesarattu"],
    ageability: AGE.YOUNG,
    priceRange: "$",
    established: "Heritage Wines established 1993; growing rapidly post-2010",
  },

];

// ─── FILTER UTILITIES ────────────────────────────────────────

/**
 * Filter wine regions by one or more criteria.
 * All provided criteria use AND logic (must match all).
 *
 * @param {Object} filters
 * @param {"Old World"|"New World"} [filters.world]
 * @param {"Red"|"White"|"Rosé"} [filters.color]
 * @param {"Dry"|"Off-Dry"|"Sweet"} [filters.taste]
 * @param {"Still"|"Sparkling"|"Fortified"|"Aromatised"} [filters.nature]
 * @param {string} [filters.country]
 * @param {string} [filters.continent]
 * @returns {Array} Filtered array of wine region objects
 */
export function filterRegions(filters = {}) {
  return wineRegions.filter((region) => {
    if (filters.world && region.world !== filters.world) return false;
    if (filters.color && !region.colors.includes(filters.color)) return false;
    if (filters.taste && !region.taste.includes(filters.taste)) return false;
    if (filters.nature && !region.nature.includes(filters.nature)) return false;
    if (filters.country && region.country !== filters.country) return false;
    if (filters.continent && region.continent !== filters.continent) return false;
    return true;
  });
}

/**
 * Get all unique values for a given field across all regions.
 * Useful for building filter dropdowns dynamically.
 * @param {"colors"|"taste"|"nature"|"country"|"continent"|"world"} field
 */
export function getUniqueValues(field) {
  const vals = new Set();
  wineRegions.forEach((r) => {
    const v = r[field];
    if (Array.isArray(v)) v.forEach((x) => vals.add(x));
    else if (v) vals.add(v);
  });
  return [...vals].sort();
}

/**
 * Search regions by keyword across name, description, grapes, and famousWines.
 * @param {string} keyword
 * @returns {Array}
 */
export function searchRegions(keyword) {
  const kw = keyword.toLowerCase();
  return wineRegions.filter((r) => {
    const haystack = [
      r.name, r.country, r.description,
      ...r.famousWines,
      ...(r.grapes.red || []),
      ...(r.grapes.white || []),
    ].join(" ").toLowerCase();
    return haystack.includes(kw);
  });
}

// ─── STATS / SUMMARY ────────────────────────────────────────

export const dbStats = {
  totalRegions: wineRegions.length,
  oldWorld: wineRegions.filter((r) => r.world === WORLD.OLD).length,
  newWorld: wineRegions.filter((r) => r.world === WORLD.NEW).length,
  byContinent: wineRegions.reduce((acc, r) => {
    acc[r.continent] = (acc[r.continent] || 0) + 1;
    return acc;
  }, {}),
  byCountry: wineRegions.reduce((acc, r) => {
    acc[r.country] = (acc[r.country] || 0) + 1;
    return acc;
  }, {}),
};

export default wineRegions;
