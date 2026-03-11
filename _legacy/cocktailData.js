const categories = {
    vodka: [
        {
            name: "SCREWDRIVER",
            glass: "Bucket",
            mixingMethod: "Build",
            garnish: "Orange",
            ingredients: "1½ oz. Vodka, OJ"
        },
        {
            name: "CAPE COD",
            glass: "Bucket",
            mixingMethod: "Build",
            garnish: "Lime",
            ingredients: "1½ oz. Vodka, cranberry"
        },
        {
            name: "SEA BREEZE",
            glass: "Bucket",
            mixingMethod: "Build",
            garnish: "Lime (or grapefruit)",
            ingredients: "1½ oz. Vodka, grapefruit, cranberry"
        },
        {
            name: "BAY BREEZE",
            glass: "Bucket",
            mixingMethod: "Build",
            garnish: "Lime",
            ingredients: "1½ oz. Vodka, pineapple, cranberry"
        },
        {
            name: "MADRAS",
            glass: "Bucket",
            mixingMethod: "Build",
            garnish: "Orange",
            ingredients: "1½ oz. Vodka, OJ, cranberry"
        },
        {
            name: "GREYHOUND",
            glass: "Bucket",
            mixingMethod: "Build",
            garnish: "Lime (or grapefruit)",
            ingredients: "1½ oz. Vodka, grapefruit",
            note: "Variation: Salty Dog is a Greyhound with a salted rim on the glass"
        },
        {
            name: "BLACK RUSSIAN",
            glass: "Rocks",
            mixingMethod: "Build",
            garnish: "None",
            ingredients: "1 oz. Vodka, 1 oz. Kahlua"
        },
        {
            name: "WHITE RUSSIAN",
            glass: "Bucket",
            mixingMethod: "Build",
            garnish: "None",
            ingredients: "1 oz. Vodka, 1 oz. Kahlua, cream"
        },
        {
            name: "VODKA GIMLET",
            glass: "Rocks or Martini",
            mixingMethod: "Shake & strain",
            garnish: "Lime",
            ingredients: "1½ oz. Vodka, Rose's Lime Juice",
            note: "Served on the rocks or in a martini glass. Can also be served w/ fresh lime juice"
        },
        {
            name: "MOSCOW MULE",
            glass: "Copper Mug",
            mixingMethod: "Roll",
            garnish: "Lime",
            ingredients: "2 oz. Vodka, lime juice, ginger beer"
        },
        {
            name: "BLOODY MARY",
            glass: "Pint or Hurricane",
            mixingMethod: "Roll",
            garnish: "Celery, green bean, lime, olive",
            ingredients: "1½ oz. Vodka, Bloody Mary mix, celery salt, Worcestershire sauce",
            note: "Bloody Mary mixes and additives will vary from bar to bar"
        },
        {
            name: "COSMOPOLITAN",
            glass: "Martini",
            mixingMethod: "Shake and strain",
            garnish: "Lime",
            ingredients: "1½ oz. Citron vodka, ¾ oz. triple sec, cranberry, lime juice"
        },
        {
            name: "LEMON DROP",
            glass: "Martini or shot",
            mixingMethod: "Shake and strain",
            garnish: "Lemon wedge on a sugar rim",
            ingredients: "1½ oz. citron Vodka, ¾ oz. triple sec, lemon juice, simple syrup"
        },
        {
            name: "APPLETINI",
            glass: "Martini",
            mixingMethod: "Shake and strain",
            garnish: "Cherry or apple slice",
            ingredients: "1½ oz. Vodka, ¾ oz. apple pucker, splash of sweet/sour"
        },
        {
            name: "CHOCOLATE MARTINI",
            glass: "Martini",
            mixingMethod: "Shake and strain",
            garnish: "Chocolate syrup swirled in glass",
            ingredients: "1½ oz. Vanilla vodka, ¾ oz. Godiva liqueur, ½ oz. Baileys, cream",
            note: "Recipe varies"
        }
    ],
    gin: [
        {
            name: "GIBSON",
            glass: "Martini or Rocks",
            mixingMethod: "Stir and strain",
            garnish: "Onion",
            ingredients: "2.5 oz. Gin, dash of dry vermouth"
        },
        {
            name: "RAMOS GIN FIZZ",
            glass: "Collins",
            mixingMethod: "Shake and strain",
            garnish: "Lemon",
            ingredients: "1½ oz. Gin, heavy cream, egg white, lemon & lime juice, sugar, flower water"
        },
        {
            name: "SINGAPORE SLING",
            glass: "Hurricane or Collins",
            mixingMethod: "Shake & strain over ice",
            garnish: "Pineapple cherry flag",
            ingredients: "1 oz. Gin, ¾ oz. sloe gin, ¾ oz. Herring Cherry Liqueur, ½ oz. Benedictine, grenadine, pineapple, lemon juice, Angostura bitters"
        },
        {
            name: "NEGRONI",
            glass: "Bucket",
            mixingMethod: "Stir & strain over ice",
            garnish: "Lemon twist",
            ingredients: "½ oz. Gin, ¾ oz. sweet vermouth, ¾ oz. Campari"
        },
        {
            name: "CORPSE REVIVER #2",
            glass: "Martini or Coupe",
            mixingMethod: "Stir & strain",
            garnish: "Lemon twist",
            ingredients: "1 oz. Gin, ¾ oz. Cointreau, ½ oz. Lillet Blanc, lemon juice, dash of absinthe"
        },
        {
            name: "FRENCH 75",
            glass: "Champagne flute",
            mixingMethod: "Shake and strain",
            garnish: "Lemon twist",
            ingredients: "1 oz. Gin, lemon juice, ½ oz. Cointreau, champagne",
            note: "Shake and strain gin, lemon juice and Cointreau, then fill with champagne"
        },
        {
            name: "TOM COLLINS",
            glass: "Collins",
            mixingMethod: "Build",
            garnish: "Lime or lemon twist",
            ingredients: "1½ oz. Gin, soda, sweet/sour"
        },
        {
            name: "AVIATION",
            glass: "Martini or Coupe",
            mixingMethod: "Shake & strain",
            garnish: "Lemon twist or cherry",
            ingredients: "1 oz. Gin, ½ oz. maraschino liqueur, lemon juice, ½ oz. crème de violette"
        }
    ],
    rum: [
        {
            name: "MOJITO",
            glass: "Pint or Collins",
            mixingMethod: "Muddle, Shake and Roll",
            garnish: "Mint and Limes (in drink)",
            ingredients: "2 oz. Light rum, simple syrup, limes, mint, soda water"
        },
        {
            name: "BLUE HAWAIIAN",
            glass: "Hurricane",
            mixingMethod: "Shake & strain over ice",
            garnish: "Pineapple flag",
            ingredients: "1 oz. Rum, 1 oz. vodka, ½ oz. blue curacao, pineapple, sweet & sour mix"
        },
        {
            name: "DARK & STORMY",
            glass: "Pint or collins",
            mixingMethod: "Build",
            garnish: "Lime",
            ingredients: "2 oz. Goslings dark rum, ginger beer"
        },
        {
            name: "DAIQUIRI",
            glass: "Multiple options",
            mixingMethod: "Blend or shake & strain",
            garnish: "Lime",
            ingredients: "1½ oz. Rum, lime juice, simple syrup"
        },
        {
            name: "PINA COLADA",
            glass: "Hurricane",
            mixingMethod: "Blend",
            garnish: "Pineapple cherry flag",
            ingredients: "2 oz. Rum, pineapple, coco Lopez, cream"
        },
        {
            name: "HURRICANE",
            glass: "Hurricane",
            mixingMethod: "Shake & strain over ice",
            garnish: "Pineapple cherry flag",
            ingredients: "¾ oz. Dark rum, 1 oz. light rum, passion fruit syrup, lime juice",
            note: "Float dark rum on top"
        }
    ],
    tequila: [
        {
            name: "MARGARITA",
            glass: "Margarita, bucket, pint, Collins",
            mixingMethod: "Shake & strain or blend",
            garnish: "Lime",
            ingredients: "2 oz. Tequila, 2 oz. lime juice, 1½ oz. agave nectar",
            note: "Margaritas are often made with triple sec and sweet/sour as well."
        },
        {
            name: "PALOMA",
            glass: "Margarita, bucket, pint, Collins",
            mixingMethod: "Shake & strain over blend",
            garnish: "Lime",
            ingredients: "2 oz. Tequila, 2 oz. lime juice, 1½ oz. agave nectar, grapefruit, soda water"
        },
        {
            name: "TEQUILA SUNRISE",
            glass: "Collins",
            mixingMethod: "Build",
            garnish: "Orange & cherry",
            ingredients: "1½ oz. Tequila, OJ, grenadine"
        },
        {
            name: "TEQUILA SUNSET",
            glass: "Collins",
            mixingMethod: "Build",
            garnish: "Cherry",
            ingredients: "1½ oz. Tequila, OJ, ¾ oz. blackberry brandy"
        }
    ],
    whiskey: [
        {
            name: "SAZERAC",
            glass: "Bucket",
            mixingMethod: "Muddle, stir, strain",
            garnish: "Lemon twist",
            ingredients: "2 oz. Rye Whiskey, sugar cube, Peychaud's bitters, absinthe"
        },
        {
            name: "MINT JULEP",
            glass: "Copper mug or bucket",
            mixingMethod: "Muddle, shake & strain",
            garnish: "Mint sprig",
            ingredients: "2 oz. Bourbon, sugar, mint, water"
        },
        {
            name: "OLD FASHIONED",
            glass: "Bucket",
            mixingMethod: "Muddle, roll",
            garnish: "Orange peels",
            ingredients: "2 oz. Bourbon or rye, sugar, Angostura bitters, splash of soda",
            note: "Classic version is orange or peel only. Modern version is orange slices and cherries muddled."
        },
        {
            name: "MANHATTAN",
            glass: "Martini or rocks",
            mixingMethod: "Stirred & strained in martini glass or on the rocks",
            garnish: "Cherry",
            ingredients: "2 oz. Bourbon, ¾ oz. sweet vermouth, Angostura bitters"
        }
    ],
    other: [
        {
            name: "LONG ISLAND",
            glass: "Collins or pint",
            mixingMethod: "Shake & roll",
            garnish: "Lemon",
            ingredients: "½ oz. Vodka, ½ oz. rum, ½ oz. gin, ½ oz. triple sec, sweet/sour, coke",
            note: "Original Long Island adds tequila"
        },
        {
            name: "TEXAS TEA",
            glass: "Collins or pint",
            mixingMethod: "Shake & roll",
            garnish: "Lemon",
            ingredients: "½ oz. Vodka, ½ oz. rum, ½ oz. gin, ½ oz. triple sec, ½ oz. bourbon, sweet/sour, Coke"
        },
        {
            name: "TOKYO TEA",
            glass: "Collins or pint",
            mixingMethod: "Shake & roll",
            garnish: "Lemon, cherry",
            ingredients: "½ oz. Vodka, ½ oz. rum, ½ oz. gin, ½ oz., melon liqueur, sweet/sour"
        },
        {
            name: "MIMOSA",
            glass: "Champagne flute",
            mixingMethod: "Pour",
            garnish: "Orange peel",
            ingredients: "Champagne, OJ"
        },
        {
            name: "BELLINI",
            glass: "Champagne flute",
            mixingMethod: "Pour & stir",
            garnish: "Peach or orange peel",
            ingredients: "2 oz. peach nectar, Champagne"
        }
    ],

    Mocktail: 
[
{
            name: "VIRGIN MOJITO",
            glass: "Highball",
            mixingMethod: "Muddle & Build",
            garnish: "Mint Sprig, Lime Wedge",
            ingredients: "Mint Leaves, Lime Juice, Sugar, Soda Water"
        },
{
            name: "SHIRLEY TEMPLE",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Maraschino Cherry, Orange Slice",
            ingredients: "Ginger Ale, Grenadine, Lime Juice"
        },
{
            name: "ARNOLD PALMER",
            glass: "Collins",
            mixingMethod: "Build",
            garnish: "Lemon Wedge",
            ingredients: "Iced Tea, Lemonade"
        },
{
            name: "VIRGIN PINA COLADA",
            glass: "Hurricane",
            mixingMethod: "Blend",
            garnish: "Pineapple Slice, Cherry",
            ingredients: "Pineapple Juice, Coconut Cream, Crushed Ice"
        },
{
            name: "NOJITO",
            glass: "Collins",
            mixingMethod: "Muddle & Build",
            garnish: "Mint Sprig",
            ingredients: "Mint Leaves, Lime Juice, Sugar, Soda Water"
        },
{
            name: "SAFE SEX ON THE BEACH",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Orange Slice",
            ingredients: "Cranberry Juice, Orange Juice, Peach Nectar"
        },
{
            name: "VIRGIN MARY",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Celery, Lemon Wedge",
            ingredients: "Tomato Juice, Lemon Juice, Worcestershire, Tabasco"
        },
{
            name: "CINDERELLA",
            glass: "Hurricane",
            mixingMethod: "Build",
            garnish: "Orange Slice, Cherry",
            ingredients: "Orange Juice, Pineapple Juice, Lemon Juice, Grenadine"
        },
{
            name: "ROY ROGERS",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Lime Wedge",
            ingredients: "Cola, Grenadine"
        },
{
            name: "FRUIT PUNCH",
            glass: "Punch Bowl",
            mixingMethod: "Mix",
            garnish: "Mixed Fruit Slices",
            ingredients: "Orange Juice, Pineapple Juice, Lemon Juice, Ginger Ale"
        },
{
            name: "VIRGIN DAIQUIRI",
            glass: "Coupe",
            mixingMethod: "Blend",
            garnish: "Lime Wheel",
            ingredients: "Strawberry, Lime Juice, Simple Syrup, Crushed Ice"
        },
{
            name: "BASIL LEMONADE",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Basil Leaf, Lemon Wedge",
            ingredients: "Lemon Juice, Basil, Simple Syrup, Water"
        },
{
            name: "SPARKLING BERRY COOLER",
            glass: "Wine Glass",
            mixingMethod: "Build",
            garnish: "Mixed Berries",
            ingredients: "Mixed Berry Puree, Lemon Juice, Soda Water"
        },
{
            name: "GINGER LIME FIZZ",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Lime Wheel",
            ingredients: "Ginger Beer, Lime Juice, Simple Syrup"
        },
{
            name: "VIRGIN CUBA LIBRE",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Lime Wedge",
            ingredients: "Cola, Lime Juice"
        },
],
};

// Create an 'all' category that includes all cocktails
categories.all = Object.values(categories).flat();
