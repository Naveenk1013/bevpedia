// Master data index — exports all beverage data with a unified shape
import { cocktails } from './cocktails.js';
import { mocktails } from './mocktails.js';
import { spirits } from './spirits.js';
import { wines } from './wines.js';
import { beers } from './beers.js';
import { techniques, glassware } from './techniques.js';
import { glossary } from './glossary.js';

export { cocktails, mocktails, spirits, wines, beers, techniques, glassware, glossary };

// Quiz questions auto-generated from data
export const quizQuestions = [
  // Original techniques & glossary
  { q:'What technique is used for a Mojito (pressing the mint)?', a:'Muddle', options:['Shake','Build','Muddle','Blend'], category:'techniques', level: 'Beginner' },
  { q:'Which technique is used for spirit-only cocktails like a Negroni?', a:'Stir', options:['Shake','Muddle','Stir','Roll'], category:'techniques', level: 'Intermediate' },
  { q:'What does ABV stand for?', a:'Alcohol by Volume', options:['Alcoholic Barrel Volume','Alcohol by Volume','Aged Bottled Vintage','Alcoholic Beverage Value'], category:'glossary', level: 'Beginner' },
  { q:'What is orgeat?', a:'An almond and orange blossom syrup', options:['A lemon-based syrup','An almond and orange blossom syrup','A grenadine substitute','A pomegranate syrup'], category:'glossary', level: 'Intermediate' },
  { q:'What does "on the rocks" mean?', a:'Served over ice', options:['Served with soda','Served chilled with no ice','Served neat','Served over ice'], category:'glossary', level: 'Beginner' },

  // New User Provided Questions - Cocktails
  { q: "What is the main ingredient in a Margarita cocktail?", a: "Tequila", options: ["Vodka", "Tequila", "Rum", "Gin"], category: "cocktails", level: "Beginner" },
  { q: "Which cocktail is traditionally made with bourbon, mint, and sugar?", a: "Mint Julep", options: ["Old Fashioned", "Mint Julep", "Whiskey Sour", "Manhattan"], category: "cocktails", level: "Intermediate" },
  { q: "What is the primary ingredient in a Piña Colada?", a: "Rum", options: ["Vodka", "Rum", "Gin", "Tequila"], category: "cocktails", level: "Beginner" },
  { q: "Which cocktail is known for being shaken, not stirred?", a: "Martini", options: ["Margarita", "Martini", "Old Fashioned", "Daiquiri"], category: "cocktails", level: "Intermediate" },
  { q: "What is the main ingredient in a Mojito?", a: "Rum", options: ["Vodka", "Rum", "Gin", "Tequila"], category: "cocktails", level: "Beginner" },
  { q: "What is the primary ingredient in a Daiquiri?", a: "Rum", options: ["Vodka", "Rum", "Gin", "Tequila"], category: "cocktails", level: "Beginner" },
  { q: "Which cocktail is made with gin, vermouth, and Campari?", a: "Negroni", options: ["Martini", "Negroni", "Manhattan", "Old Fashioned"], category: "cocktails", level: "Intermediate" },
  { q: "What is the main ingredient in a Manhattan cocktail?", a: "Whiskey", options: ["Vodka", "Whiskey", "Rum", "Gin"], category: "cocktails", level: "Intermediate" },
  { q: "Which cocktail is made with vodka, coffee liqueur, and cream?", a: "White Russian", options: ["Black Russian", "White Russian", "Espresso Martini", "Manhattan"], category: "cocktails", level: "Beginner" },
  { q: "What is the primary ingredient in a Caipirinha?", a: "Cachaça", options: ["Vodka", "Cachaça", "Rum", "Tequila"], category: "cocktails", level: "Intermediate" },
  { q: "What is the main ingredient in a Bloody Mary cocktail?", a: "Vodka", options: ["Vodka", "Gin", "Rum", "Tequila"], category: "cocktails", level: "Beginner" },
  { q: "Which cocktail is made with gin, lemon juice, and sugar?", a: "Gin Fizz", options: ["Gin Fizz", "Tom Collins", "Gin and Tonic", "Martini"], category: "cocktails", level: "Intermediate" },
  { q: "What is the primary ingredient in a Cosmopolitan cocktail?", a: "Vodka", options: ["Vodka", "Gin", "Rum", "Tequila"], category: "cocktails", level: "Intermediate" },
  { q: "Which cocktail is made with tequila, orange liqueur, and lime juice?", a: "Margarita", options: ["Margarita", "Daiquiri", "Mojito", "Piña Colada"], category: "cocktails", level: "Beginner" },
  { q: "What is the main ingredient in a Whiskey Sour cocktail?", a: "Whiskey", options: ["Whiskey", "Gin", "Rum", "Tequila"], category: "cocktails", level: "Intermediate" },
  { q: "Which cocktail is made with vodka, cranberry juice, and lime juice?", a: "Cape Codder", options: ["Cape Codder", "Cosmopolitan", "Bloody Mary", "Screwdriver"], category: "cocktails", level: "Intermediate" },
  { q: "What is the primary ingredient in a Mai Tai cocktail?", a: "Rum", options: ["Rum", "Gin", "Vodka", "Tequila"], category: "cocktails", level: "Expert" },
  { q: "Which cocktail is made with rum, ginger beer, and lime juice?", a: "Dark 'n' Stormy", options: ["Dark 'n' Stormy", "Mojito", "Daiquiri", "Piña Colada"], category: "cocktails", level: "Intermediate" },
  { q: "Which cocktail is made with bourbon, sugar, and bitters?", a: "Old Fashioned", options: ["Old Fashioned", "Manhattan", "Whiskey Sour", "Mint Julep"], category: "cocktails", level: "Intermediate" },
  { q: "What is the main ingredient in a Tom Collins cocktail?", a: "Gin", options: ["Gin", "Vodka", "Rum", "Tequila"], category: "cocktails", level: "Intermediate" },

  // New User Provided Questions - Spirits
  { q: "What is the primary ingredient in vodka?", a: "Water and ethanol", options: ["Barley", "Water and ethanol", "Grapes", "Potatoes"], category: "spirits", level: "Intermediate" },
  { q: "Which country is known for producing rum?", a: "Jamaica", options: ["Mexico", "Jamaica", "France", "United States"], category: "spirits", level: "Beginner" },
  { q: "What is the main flavor profile of whiskey?", a: "Oak", options: ["Fruity", "Oak", "Spicy", "Floral"], category: "spirits", level: "Beginner" },
  { q: "Which spirit is made from the distillation of wine?", a: "Brandy", options: ["Vodka", "Brandy", "Rum", "Gin"], category: "spirits", level: "Intermediate" },
  { q: "What is the primary ingredient in gin?", a: "Juniper berries", options: ["Barley", "Juniper berries", "Grapes", "Potatoes"], category: "spirits", level: "Beginner" },
  { q: "Which country is known for producing tequila?", a: "Mexico", options: ["Jamaica", "Mexico", "France", "United States"], category: "spirits", level: "Beginner" },
  { q: "What is the main ingredient in rum?", a: "Sugarcane", options: ["Barley", "Sugarcane", "Grapes", "Potatoes"], category: "spirits", level: "Beginner" },
  { q: "Which spirit is made from the distillation of beer?", a: "Whiskey", options: ["Vodka", "Whiskey", "Rum", "Gin"], category: "spirits", level: "Intermediate" },
  { q: "What is the primary ingredient in brandy?", a: "Wine", options: ["Barley", "Wine", "Grapes", "Potatoes"], category: "spirits", level: "Intermediate" },
  { q: "Which country is known for producing sake?", a: "Japan", options: ["China", "Japan", "Korea", "Thailand"], category: "spirits", level: "Beginner" },
  { q: "What is the primary ingredient in bourbon?", a: "Corn", options: ["Corn", "Barley", "Rye", "Wheat"], category: "spirits", level: "Intermediate" },
  { q: "Which country is known for producing Scotch whisky?", a: "Scotland", options: ["Ireland", "Scotland", "United States", "Canada"], category: "spirits", level: "Beginner" },
  { q: "What is the main flavor profile of rum?", a: "Sweet", options: ["Sweet", "Smoky", "Spicy", "Floral"], category: "spirits", level: "Beginner" },
  { q: "Which spirit is made from the distillation of rice?", a: "Sake", options: ["Sake", "Vodka", "Gin", "Rum"], category: "spirits", level: "Expert" },
  { q: "What is the primary ingredient in mezcal?", a: "Agave", options: ["Agave", "Corn", "Barley", "Rye"], category: "spirits", level: "Intermediate" },
  { q: "Which country is known for producing vodka?", a: "Russia", options: ["Russia", "Poland", "Sweden", "Finland"], category: "spirits", level: "Beginner" },
  { q: "Which spirit is made from the distillation of agave?", a: "Tequila", options: ["Tequila", "Mezcal", "Rum", "Vodka"], category: "spirits", level: "Intermediate" },
  { q: "Which country is known for producing gin?", a: "England", options: ["England", "Netherlands", "France", "Germany"], category: "spirits", level: "Beginner" },

  // New User Provided Questions - Wine
  { q: "Which grape variety is used to make Chardonnay wine?", a: "Chardonnay", options: ["Cabernet Sauvignon", "Chardonnay", "Merlot", "Pinot Noir"], category: "wine", level: "Beginner" },
  { q: "What is the difference between red and white wine?", a: "Type of grape and fermentation process", options: ["Type of grape", "Fermentation process", "Type of grape and fermentation process", "Aging process"], category: "wine", level: "Beginner" },
  { q: "Which region is famous for its Bordeaux wines?", a: "France", options: ["Italy", "Spain", "France", "Germany"], category: "wine", level: "Intermediate" },
  { q: "What is the process called where wine is exposed to oxygen to improve its flavor?", a: "Aeration", options: ["Fermentation", "Aeration", "Distillation", "Pasteurization"], category: "wine", level: "Beginner" },
  { q: "Which grape variety is used to make Cabernet Sauvignon wine?", a: "Cabernet Sauvignon", options: ["Chardonnay", "Cabernet Sauvignon", "Merlot", "Pinot Noir"], category: "wine", level: "Beginner" },
  { q: "What is the difference between sparkling wine and champagne?", a: "Region of production", options: ["Grape variety", "Region of production", "Production method", "Aging process"], category: "wine", level: "Intermediate" },
  { q: "Which region is famous for its Chianti wines?", a: "Italy", options: ["Italy", "Spain", "France", "Germany"], category: "wine", level: "Intermediate" },
  { q: "What is the process called where grapes are pressed to extract juice?", a: "Pressing", options: ["Fermentation", "Pressing", "Distillation", "Pasteurization"], category: "wine", level: "Beginner" },
  { q: "Which grape variety is used to make Pinot Noir wine?", a: "Pinot Noir", options: ["Chardonnay", "Cabernet Sauvignon", "Merlot", "Pinot Noir"], category: "wine", level: "Intermediate" },
  { q: "What is the difference between dry and sweet wine?", a: "Residual sugar", options: ["Alcohol content", "Residual sugar", "Aging process", "Grape variety"], category: "wine", level: "Beginner" },
  { q: "Which grape variety is used to make Sauvignon Blanc wine?", a: "Sauvignon Blanc", options: ["Chardonnay", "Sauvignon Blanc", "Pinot Grigio", "Riesling"], category: "wine", level: "Intermediate" },
  { q: "What is the difference between rosé and red wine?", a: "Fermentation process", options: ["Grape variety", "Fermentation process", "Aging process", "Color"], category: "wine", level: "Intermediate" },
  { q: "Which region is famous for its Burgundy wines?", a: "France", options: ["Italy", "Spain", "France", "Germany"], category: "wine", level: "Intermediate" },
  { q: "What is the process called where wine is aged in oak barrels?", a: "Aging", options: ["Fermentation", "Aging", "Distillation", "Pasteurization"], category: "wine", level: "Beginner" },
  { q: "Which grape variety is used to make Zinfandel wine?", a: "Zinfandel", options: ["Cabernet Sauvignon", "Zinfandel", "Merlot", "Pinot Noir"], category: "wine", level: "Expert" },
  { q: "What is the difference between sparkling wine and still wine?", a: "Carbonation", options: ["Grape variety", "Carbonation", "Aging process", "Color"], category: "wine", level: "Beginner" },
  { q: "Which region is famous for its Barolo wines?", a: "Italy", options: ["Italy", "Spain", "France", "Germany"], category: "wine", level: "Expert" },
  { q: "What is the process called where wine is clarified before bottling?", a: "Fining", options: ["Fermentation", "Fining", "Distillation", "Pasteurization"], category: "wine", level: "Expert" },
  { q: "Which grape variety is used to make Syrah wine?", a: "Syrah", options: ["Chardonnay", "Syrah", "Merlot", "Pinot Noir"], category: "wine", level: "Intermediate" },

  // New User Provided Questions - Beer
  { q: "What are the main ingredients in beer?", a: "Water, malt, hops, and yeast", options: ["Water, malt, hops, and yeast", "Water, sugar, hops, and yeast", "Water, malt, sugar, and yeast", "Water, malt, hops, and sugar"], category: "beer", level: "Beginner" },
  { q: "Which country is known for its beer purity law (Reinheitsgebot)?", a: "Germany", options: ["Belgium", "Germany", "Czech Republic", "United States"], category: "beer", level: "Intermediate" },
  { q: "What is the difference between ale and lager?", a: "Type of yeast and fermentation temperature", options: ["Type of yeast", "Fermentation temperature", "Type of yeast and fermentation temperature", "Color"], category: "beer", level: "Expert" },
  { q: "What gives beer its bitterness?", a: "Hops", options: ["Malt", "Hops", "Yeast", "Water"], category: "beer", level: "Beginner" },
  { q: "Which type of beer is typically made with wheat?", a: "Wheat beer", options: ["Ale", "Wheat beer", "Lager", "Stout"], category: "beer", level: "Intermediate" },
  { q: "What is the process called where beer is fermented at high temperatures?", a: "Top fermentation", options: ["Bottom fermentation", "Top fermentation", "Cold fermentation", "Warm fermentation"], category: "beer", level: "Intermediate" },
  { q: "Which country is known for producing Guinness?", a: "Ireland", options: ["Belgium", "Germany", "Ireland", "United States"], category: "beer", level: "Beginner" },
  { q: "What is the main ingredient in stout beer?", a: "Roasted barley", options: ["Malt", "Roasted barley", "Hops", "Yeast"], category: "beer", level: "Intermediate" },
  { q: "Which type of beer is typically made with hops?", a: "IPA", options: ["Ale", "IPA", "Lager", "Stout"], category: "beer", level: "Intermediate" },
  { q: "What is the difference between light and dark beer?", a: "Color and flavor", options: ["Alcohol content", "Color and flavor", "Production method", "Aging process"], category: "beer", level: "Beginner" },
  { q: "Which country is known for producing Pilsner beer?", a: "Czech Republic", options: ["Belgium", "Germany", "Czech Republic", "United States"], category: "beer", level: "Intermediate" },
  { q: "What gives beer its color?", a: "Malt", options: ["Malt", "Hops", "Yeast", "Water"], category: "beer", level: "Beginner" },
  { q: "What is the process called where beer is fermented at low temperatures?", a: "Bottom fermentation", options: ["Bottom fermentation", "Top fermentation", "Cold fermentation", "Warm fermentation"], category: "beer", level: "Intermediate" },
  { q: "What is the main ingredient in wheat beer?", a: "Wheat", options: ["Malt", "Wheat", "Hops", "Yeast"], category: "beer", level: "Beginner" },
  { q: "Which type of beer is typically made with barley?", a: "Ale", options: ["Ale", "Wheat beer", "Lager", "Stout"], category: "beer", level: "Beginner" },
  { q: "What is the process called where beer is pasteurized?", a: "Pasteurization", options: ["Fermentation", "Pasteurization", "Distillation", "Aging"], category: "beer", level: "Intermediate" },
  { q: "Which country is known for producing Hefeweizen beer?", a: "Germany", options: ["Belgium", "Germany", "Czech Republic", "United States"], category: "beer", level: "Intermediate" },
  { q: "What is the main ingredient in pale ale?", a: "Pale malt", options: ["Malt", "Pale malt", "Hops", "Yeast"], category: "beer", level: "Intermediate" },
  { q: "Which type of beer is typically made with malt?", a: "Lager", options: ["Ale", "Wheat beer", "Lager", "Stout"], category: "beer", level: "Beginner" },

  // New User Provided Questions - Techniques
  { q: "What is the purpose of shaking a cocktail?", a: "To mix and chill the ingredients", options: ["To mix the ingredients", "To chill the ingredients", "To mix and chill the ingredients", "To dilute the ingredients"], category: "techniques", level: "Beginner" },
  { q: "What does it mean to \"build\" a cocktail?", a: "To assemble the drink directly in the glass", options: ["To shake the ingredients", "To stir the ingredients", "To assemble the drink directly in the glass", "To blend the ingredients"], category: "techniques", level: "Beginner" },
  { q: "What is the technique called when you pour a drink from one container to another to mix it?", a: "Rolling", options: ["Shaking", "Stirring", "Rolling", "Muddling"], category: "techniques", level: "Expert" },
  { q: "What is the purpose of muddling in cocktail making?", a: "To extract flavors from ingredients", options: ["To mix the ingredients", "To chill the ingredients", "To extract flavors from ingredients", "To dilute the ingredients"], category: "techniques", level: "Beginner" },
  { q: "What is the technique called when you mix ingredients by stirring?", a: "Stirring", options: ["Shaking", "Stirring", "Rolling", "Muddling"], category: "techniques", level: "Beginner" },
  { q: "What is the purpose of straining a cocktail?", a: "To remove ice and other solids", options: ["To mix the ingredients", "To chill the ingredients", "To remove ice and other solids", "To dilute the ingredients"], category: "techniques", level: "Beginner" },
  { q: "What is the technique called when you layer ingredients in a cocktail?", a: "Layering", options: ["Shaking", "Stirring", "Layering", "Muddling"], category: "techniques", level: "Intermediate" },
  { q: "What is the purpose of garnishing a cocktail?", a: "To enhance the appearance and flavor", options: ["To mix the ingredients", "To chill the ingredients", "To enhance the appearance and flavor", "To dilute the ingredients"], category: "techniques", level: "Beginner" },
  { q: "What is the technique called when you chill a drink with ice?", a: "Chilling", options: ["Shaking", "Stirring", "Chilling", "Muddling"], category: "techniques", level: "Beginner" },
  { q: "What is the purpose of aerating wine?", a: "To expose it to oxygen", options: ["To mix the ingredients", "To chill the ingredients", "To expose it to oxygen", "To dilute the ingredients"], category: "techniques", level: "Intermediate" },
  { q: "What is the technique called when you blend ingredients in a cocktail?", a: "Blending", options: ["Shaking", "Stirring", "Blending", "Muddling"], category: "techniques", level: "Beginner" },
  { q: "What is the purpose of using a jigger in cocktail making?", a: "To measure ingredients", options: ["To mix the ingredients", "To chill the ingredients", "To measure ingredients", "To dilute the ingredients"], category: "techniques", level: "Beginner" },
  { q: "What is the purpose of using a bar spoon in cocktail making?", a: "To stir ingredients", options: ["To mix the ingredients", "To chill the ingredients", "To stir ingredients", "To dilute the ingredients"], category: "techniques", level: "Beginner" },

  // New User Provided Questions - Glossary
  { q: "What does \"vintage\" mean in the context of wine?", a: "The year the grapes were harvested", options: ["The year the wine was bottled", "The year the grapes were harvested", "The age of the wine", "The type of grape used"], category: "glossary", level: "Intermediate" },
  { q: "What is the meaning of \"dry\" in the context of wine?", a: "Low residual sugar", options: ["High alcohol content", "Low residual sugar", "Aged in oak barrels", "High tannin content"], category: "glossary", level: "Beginner" },
  { q: "What is the definition of \"fermentation\" in beverage production?", a: "The process of converting sugar to alcohol", options: ["The process of converting sugar to alcohol", "The process of aging the beverage", "The process of filtering the beverage", "The process of carbonating the beverage"], category: "glossary", level: "Beginner" },
  { q: "What does \"proof\" refer to in spirits?", a: "The measure of alcohol content", options: ["The measure of alcohol content", "The measure of sweetness", "The measure of bitterness", "The measure of acidity"], category: "glossary", level: "Intermediate" },
  { q: "What is the meaning of \"tannins\" in wine?", a: "Compounds that contribute to the bitterness and astringency", options: ["Compounds that contribute to the sweetness", "Compounds that contribute to the bitterness and astringency", "Compounds that contribute to the acidity", "Compounds that contribute to the alcohol content"], category: "glossary", level: "Intermediate" },
  { q: "What is the definition of \"malt\" in beer production?", a: "Germinated cereal grains", options: ["Germinated cereal grains", "Hops", "Yeast", "Water"], category: "glossary", level: "Intermediate" },
  { q: "What does \"IBU\" stand for in beer?", a: "International Bitterness Units", options: ["Indian Brewing Unit", "International Bitterness Units", "Integrated Bitterness Ume", "International Brewing Unit"], category: "glossary", level: "Intermediate" },
  { q: "What is the meaning of \"body\" in wine?", a: "The weight or mouthfeel of the wine", options: ["The alcohol content", "The weight or mouthfeel of the wine", "The age of the wine", "The type of grape used"], category: "glossary", level: "Intermediate" },
  { q: "What is the definition of \"hops\" in beer production?", a: "Flowers used to add bitterness and flavor", options: ["Flowers used to add bitterness and flavor", "Germinated cereal grains", "Yeast", "Water"], category: "glossary", level: "Intermediate" }
];

// All beverages unified for global search
export const allBeverages = [
  ...cocktails.map(b => ({ ...b, section: 'Cocktails' })),
  ...mocktails.map(b => ({ ...b, section: 'Mocktails' })),
  ...spirits.map(b => ({ ...b, section: 'Spirits' })),
  ...wines.map(b => ({ ...b, section: 'Wine' })),
  ...beers.map(b => ({ ...b, section: 'Beer' })),
];
