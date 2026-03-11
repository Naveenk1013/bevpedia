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
  { q:'What glass is a Martini traditionally served in?', a:'Martini / Coupe glass', options:['Rocks glass','Highball glass','Martini / Coupe glass','Hurricane glass'], category:'cocktails' },
  { q:'What is the primary botanical that MUST be in gin?', a:'Juniper', options:['Coriander','Juniper','Angelica root','Orange peel'], category:'spirits' },
  { q:'Which country is Champagne from?', a:'France', options:['Italy','Spain','France','Germany'], category:'wine' },
  { q:'What does ABV stand for?', a:'Alcohol by Volume', options:['Alcoholic Barrel Volume','Alcohol by Volume','Aged Bottled Vintage','Alcoholic Beverage Value'], category:'glossary' },
  { q:'What technique is used for a Mojito (pressing the mint)?', a:'Muddle', options:['Shake','Build','Muddle','Blend'], category:'techniques' },
  { q:'Tequila must be made from which type of agave?', a:'Blue Weber agave', options:['Espadín agave','Tobalá agave','Blue Weber agave','Any agave'], category:'spirits' },
  { q:'What gives Islay Scotch whisky its distinctive smoky flavour?', a:'Peat', options:['Charcoal','Peat','Oak barrels','Sea air'], category:'spirits' },
  { q:'Which cocktail was created at the Hotel Monteleone, New Orleans?', a:'Vieux Carré', options:['Sazerac','Hurricane','Vieux Carré','Ramos Gin Fizz'], category:'cocktails' },
  { q:'What is the standard UK pint volume?', a:'568 ml', options:['473 ml','500 ml','568 ml','600 ml'], category:'beer' },
  { q:'What is Prosecco\'s primary grape variety?', a:'Glera', options:['Chardonnay','Pinot Grigio','Glera','Moscato'], category:'wine' },
  { q:'What is the name for the protective yeast film on Fino Sherry?', a:'Flor', options:['Yeast cake','Botrytis','Flor','Sediment'], category:'wine' },
  { q:'Which technique is used for spirit-only cocktails like a Negroni?', a:'Stir', options:['Shake','Muddle','Stir','Roll'], category:'techniques' },
  { q:'What is a "Shandy"?', a:'Beer mixed with lemonade or ginger beer', options:['A dry sherry','Beer mixed with lemonade or ginger beer','A spritz of Prosecco','A type of porter'], category:'beer' },
  { q:'What does IBU stand for in beer?', a:'International Bitterness Units', options:['Indian Brewing Unit','International Bitterness Units','India Brew Union','Integrated Bitterness Ume'], category:'beer' },
  { q:'The Piña Colada was created in which country?', a:'Puerto Rico', options:['Cuba','Jamaica','Barbados','Puerto Rico'], category:'cocktails' },
  { q:'What is the ageing classification for Cognac aged 10+ years?', a:'XO (Extra Old)', options:['VS','VSOP','XO (Extra Old)','NV'], category:'spirits' },
  { q:'What makes Cognac only from the Cognac region a legal requirement?', a:'Protected Designation of Origin (PDO)', options:['French Government Decree','Protected Designation of Origin (PDO)','EU Wine Law','Distillers\' Agreement'], category:'spirits' },
  { q:'Which wine region in New Zealand is most famous for Sauvignon Blanc?', a:'Marlborough', options:['Hawke\'s Bay','Central Otago','Marlborough','Waiheke Island'], category:'wine' },
  { q:'What is orgeat?', a:'An almond and orange blossom syrup', options:['A lemon-based syrup','An almond and orange blossom syrup','A grenadine substitute','A pomegranate syrup'], category:'glossary' },
  { q:'What does "on the rocks" mean?', a:'Served over ice', options:['Served with soda','Served chilled with no ice','Served neat','Served over ice'], category:'glossary' },
];

// All beverages unified for global search
export const allBeverages = [
  ...cocktails.map(b => ({ ...b, section: 'Cocktails' })),
  ...mocktails.map(b => ({ ...b, section: 'Mocktails' })),
  ...spirits.map(b => ({ ...b, section: 'Spirits' })),
  ...wines.map(b => ({ ...b, section: 'Wine' })),
  ...beers.map(b => ({ ...b, section: 'Beer' })),
];
