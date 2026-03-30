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
            name: "ESPRESSO MARTINI",
            glass: "Martini",
            mixingMethod: "Shake & strain",
            garnish: "3 coffee beans",
            ingredients: "1½ oz. Vodka, ¾ oz. Coffee liqueur, 1 shot Fresh espresso, ¼ oz. Simple syrup",
            note: "Shake hard to achieve the signature frothy top."
        },
        {
            name: "VODKA MARTINI",
            glass: "Martini",
            mixingMethod: "Stir & strain",
            garnish: "Olives or lemon twist",
            ingredients: "1½ oz. Vodka, ½ oz. Dry vermouth",
            note: "Popularised in the 1950s–60s; notably ordered 'shaken, not stirred' by James Bond."
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
        },
        {
            name: "GIN & TONIC",
            glass: "Copa / Highball",
            mixingMethod: "Build",
            garnish: "Lime wheel, cucumber",
            ingredients: "2 oz. Gin, 4 oz. Tonic water"
        },
        {
            name: "MARTINI",
            glass: "Martini coupe",
            mixingMethod: "Stir & strain",
            garnish: "Lemon twist or olive",
            ingredients: "2½ oz. Gin, ½ oz. Dry vermouth",
            note: "'Dirty' = add olive brine. 'Gibson' = cocktail onion garnish."
        },
        {
            name: "GIMLET",
            glass: "Coupe or rocks",
            mixingMethod: "Shake & strain",
            garnish: "Lime wheel",
            ingredients: "2 oz. Gin, ¾ oz. Fresh lime juice, ¾ oz. Simple syrup"
        },
        {
            name: "CLOVER CLUB",
            glass: "Coupe",
            mixingMethod: "Dry shake then shake & strain",
            garnish: "Raspberries",
            ingredients: "1½ oz. Gin, ¾ oz. Lemon juice, ½ oz. Raspberry syrup, ½ oz. Egg white"
        },
        {
            name: "BRONX COCKTAIL",
            glass: "Martini",
            mixingMethod: "Shake & strain",
            garnish: "Orange twist",
            ingredients: "1 oz. Gin, ¾ oz. Sweet vermouth, ¾ oz. Dry vermouth, 1 oz. Orange juice",
            note: "Created at the Waldorf Astoria bar circa 1906; named after the Bronx Zoo."
        },
        {
            name: "PERFECT MARTINI",
            glass: "Martini",
            mixingMethod: "Stir & strain",
            garnish: "Olive or lemon twist",
            ingredients: "1½ oz. Gin, ¾ oz. Sweet vermouth, ¾ oz. Dry vermouth",
            note: "'Perfect' means equal parts sweet and dry vermouth."
        },
        {
            name: "LAST WORD",
            glass: "Martini coupe",
            mixingMethod: "Shake & strain",
            garnish: "Maraschino cherry",
            ingredients: "¾ oz. Gin, ¾ oz. Green Chartreuse, ¾ oz. Maraschino liqueur, ¾ oz. Lime juice",
            note: "A Prohibition-era cocktail revived by Seattle bartender Murray Stenson in the 2000s."
        },
        {
            name: "WHITE LADY",
            glass: "Martini coupe",
            mixingMethod: "Shake & strain",
            garnish: "Lemon twist",
            ingredients: "1½ oz. Gin, ½ oz. Cointreau, ½ oz. Lemon juice, ½ oz. Egg white",
            note: "Created by Harry MacElhone in 1919."
        },
        {
            name: "BEES KNEES",
            glass: "Martini coupe",
            mixingMethod: "Shake & strain",
            garnish: "Lemon twist",
            ingredients: "2 oz. Gin, ¾ oz. Lemon juice, ¾ oz. Honey syrup",
            note: "A Prohibition-era speakeasy classic; honey and citrus masked the harsh bathtub gin."
        },
        {
            name: "VESPER",
            glass: "Martini",
            mixingMethod: "Shake & strain",
            garnish: "Lemon twist",
            ingredients: "1½ oz. Gin, ½ oz. Vodka, ¼ oz. Lillet Blanc",
            note: "First ordered by James Bond in Casino Royale (1953). Named after Vesper Lynd."
        },
        {
            name: "GIN MARTINI",
            glass: "Martini",
            mixingMethod: "Stir & strain",
            garnish: "3 olives or lemon twist",
            ingredients: "1½ oz. Gin, ½ oz. Dry vermouth"
        },
        {
            name: "DIRTY MARTINI",
            glass: "Martini",
            mixingMethod: "Stir & strain",
            garnish: "3 olives",
            ingredients: "2 oz. Gin or vodka, ½ oz. Dry vermouth, ¾ oz. Olive brine",
            note: "The 'dirty' modification was first published in 1901 by George Kappeler."
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
        },
        {
            name: "MAI TAI",
            glass: "Double rocks",
            mixingMethod: "Shake & strain over crushed ice",
            garnish: "Mint sprig, lime shell, orchid",
            ingredients: "1 oz. Aged rum, 1 oz. Dark Jamaican rum, ¾ oz. Lime juice, ½ oz. Orgeat, ½ oz. Dry orange curaçao",
            note: "Use quality aged rum for authentic flavour."
        },
        {
            name: "RUM PUNCH",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Orange slice, cherry",
            ingredients: "2 oz. Dark rum, 2 oz. Orange juice, 2 oz. Pineapple juice, ½ oz. Grenadine, ½ oz. Lime juice",
            note: "One sour, two sweet, three strong, four weak — traditional Caribbean punch formula."
        },
        {
            name: "ZOMBIE",
            glass: "Hurricane",
            mixingMethod: "Shake & strain over ice",
            garnish: "Pineapple flag",
            ingredients: "1 oz. White rum, ¾ oz. Dark rum, ¾ oz. Apricot brandy, 2 oz. Pineapple juice, 1 oz. Orange juice, ½ oz. Simple syrup, ½ oz. Lime juice, ½ oz. Bacardi 151 (float)",
            note: "Float the dark rum and 151 on top. Notoriously strong."
        },
        {
            name: "RUM RUNNER",
            glass: "Hurricane",
            mixingMethod: "Shake & strain or blend",
            garnish: "Pineapple flag",
            ingredients: "1 oz. White rum, ¾ oz. Dark rum, ½ oz. Crème de banana, ½ oz. Blackberry brandy, ½ oz. Grenadine, ½ oz. Rose's Lime Juice"
        },
        {
            name: "BAHAMA MAMA",
            glass: "Hurricane",
            mixingMethod: "Shake & strain or blend",
            garnish: "Pineapple flag",
            ingredients: "1½ oz. Malibu rum, ¾ oz. Dark rum, 1 oz. Coconut cream (Coco Lopez), ½ oz. Red punch / grenadine"
        },
        {
            name: "CAIPIRINHA",
            glass: "Rocks / Bucket",
            mixingMethod: "Muddle, build",
            garnish: "Lime wedges (in drink)",
            ingredients: "2 oz. Cachaça, Half lime cut in wedges, 1 oz. Simple syrup",
            note: "Brazil's national cocktail, made with cachaça — a cane spirit distinct from rum."
        },
        {
            name: "EL PRESIDENTE",
            glass: "Martini coupe",
            mixingMethod: "Stir & strain",
            garnish: "Orange peel",
            ingredients: "2 oz. White rum, ½ oz. Dry vermouth, 1 dash Grenadine"
        },
        {
            name: "SCORPION",
            glass: "Collins or Hurricane",
            mixingMethod: "Build",
            garnish: "Pineapple flag",
            ingredients: "1 oz. White rum, ½ oz. Brandy, ½ oz. Orgeat, 2 oz. Orange juice, ½ oz. Lemon juice, ½ oz. Bacardi 151 (float)"
        },
        {
            name: "PAINKILLER",
            glass: "Rocks / Highball",
            mixingMethod: "Shake & strain",
            garnish: "Freshly grated nutmeg",
            ingredients: "2 oz. Navy rum (Pusser's), 4 oz. Pineapple juice, 1 oz. Coconut cream (Coco Lopez), 1 oz. Orange juice",
            note: "Always grate fresh nutmeg on top."
        },
        {
            name: "JAMAICAN ME CRAZY",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Pineapple flag",
            ingredients: "1 oz. White rum, ½ oz. Malibu rum, ½ oz. Banana liqueur, 2 oz. Cranberry juice, 2 oz. Pineapple juice"
        },
        {
            name: "CUBA LIBRE",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Lime wedge",
            ingredients: "2 oz. Rum, Top up Cola, ½ oz. Lime juice",
            note: "The lime distinguishes a Cuba Libre from a simple Rum & Coke."
        },
        {
            name: "STRAWBERRY DAIQUIRI",
            glass: "Martini",
            mixingMethod: "Blend",
            garnish: "Strawberry or mint",
            ingredients: "1½ oz. White rum, 1 oz. Strawberry purée, ½ oz. Fraise liqueur, 1 oz. Fresh lime juice, ¼ oz. Simple syrup"
        },
        {
            name: "MANGO DAIQUIRI",
            glass: "Martini",
            mixingMethod: "Blend",
            garnish: "Mango slice or mint",
            ingredients: "1½ oz. White rum, 1 oz. Mango purée, ½ oz. Triple sec, ¾ oz. Fresh lime juice, ¼ oz. Simple syrup"
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
        },
        {
            name: "TOMMY'S MARGARITA",
            glass: "Rocks",
            mixingMethod: "Shake & strain",
            garnish: "Lime wheel",
            ingredients: "2 oz. 100% agave tequila, 1 oz. Lime juice, ½ oz. Agave nectar",
            note: "Celebrates the agave plant by replacing triple sec with agave nectar."
        },
        {
            name: "MEZCAL NEGRONI",
            glass: "Rocks",
            mixingMethod: "Stir & strain over ice",
            garnish: "Orange peel",
            ingredients: "1 oz. Mezcal, 1 oz. Sweet vermouth, 1 oz. Campari",
            note: "Espadín mezcal works best for balance."
        },
        {
            name: "EL DIABLO",
            glass: "Collins",
            mixingMethod: "Build",
            garnish: "Cherry",
            ingredients: "1½ oz. Tequila, ½ oz. Crème de cassis, ½ oz. Lime juice, Top up Ginger beer",
            note: "A Trader Vic creation from 1946."
        },
        {
            name: "BLOODY MARIA",
            glass: "Pint or Hurricane",
            mixingMethod: "Roll",
            garnish: "Celery, green bean, lime, olive",
            ingredients: "1½ oz. Tequila, 3 oz. Tomato juice, ½ oz. Lemon juice, 2 dashes Worcestershire sauce, 2 dashes Tabasco, Pinch Celery salt",
            note: "A tequila-based riff on the Bloody Mary."
        },
        {
            name: "STRAWBERRY MARGARITA",
            glass: "Margarita",
            mixingMethod: "Blend",
            garnish: "Strawberry or mint, salt/sugar rim",
            ingredients: "1½ oz. Tequila, ½ oz. Fraise liqueur, 1 oz. Strawberry purée, ½ oz. Fresh lime juice"
        },
        {
            name: "MANGO MARGARITA",
            glass: "Margarita",
            mixingMethod: "Blend",
            garnish: "Strawberry or mint, salt/sugar rim",
            ingredients: "1½ oz. Tequila, ½ oz. Triple sec, 1 oz. Mango purée, ½ oz. Lime juice"
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
        },
        {
            name: "WHISKEY SOUR",
            glass: "Rocks / coupe",
            mixingMethod: "Shake (dry shake for foam)",
            garnish: "Lemon slice, cherry, Angostura float",
            ingredients: "2 oz. Bourbon, ¾ oz. Lemon juice, ¾ oz. Simple syrup, ½ oz. Egg white (optional)",
            note: "Dry-shake with egg white first (no ice), then shake with ice for foam."
        },
        {
            name: "ROB ROY",
            glass: "Coupe",
            mixingMethod: "Stir & strain",
            garnish: "Maraschino cherry or lemon twist",
            ingredients: "2 oz. Scotch whisky, 1 oz. Sweet vermouth, 2 dashes Angostura bitters",
            note: "The Scottish Manhattan."
        },
        {
            name: "IRISH COFFEE",
            glass: "Irish coffee mug",
            mixingMethod: "Build",
            garnish: "Freshly whipped cream float",
            ingredients: "1½ oz. Irish whiskey, 4 oz. Hot coffee, 1 tsp Brown sugar",
            note: "Cream must be lightly whipped and floated — not stirred in."
        },
        {
            name: "PENICILLIN",
            glass: "Rocks",
            mixingMethod: "Shake & strain over a large ice cube",
            garnish: "Candied ginger, lemon wheel",
            ingredients: "2 oz. Blended Scotch, ¾ oz. Lemon juice, ¾ oz. Honey-ginger syrup, ¼ oz. Islay Scotch (float)",
            note: "The Islay whisky float delivers a smoky nose over a sweeter body."
        },
        {
            name: "JOHN COLLINS",
            glass: "Collins",
            mixingMethod: "Build",
            garnish: "Lime & cherry on a pick",
            ingredients: "1½ oz. Bourbon, ¾ oz. Lemon juice, ½ oz. Simple syrup, Top up Soda water",
            note: "A bourbon-based variant of the Tom Collins."
        },
        {
            name: "LYNCHBURG LEMONADE",
            glass: "Collins",
            mixingMethod: "Build",
            garnish: "Lemon slice",
            ingredients: "1½ oz. Jack Daniel's Tennessee Whiskey, ¾ oz. Triple sec, 1 oz. Lemon juice, Top up 7-Up or Sprite"
        },
        {
            name: "BOULEVARDIER",
            glass: "Rocks",
            mixingMethod: "Stir & strain over ice",
            garnish: "Orange twist",
            ingredients: "1 oz. Bourbon or rye, 1 oz. Campari, 1 oz. Sweet vermouth",
            note: "Essentially a Negroni with whiskey."
        },
        {
            name: "RUSTY NAIL",
            glass: "Rocks",
            mixingMethod: "Build & stir",
            garnish: "Lemon peel",
            ingredients: "1½ oz. Scotch whisky, ¾ oz. Drambuie",
            note: "Popularised in the 1960s by the Rat Pack in New York."
        },
        {
            name: "GODFATHER",
            glass: "Rocks",
            mixingMethod: "Build & stir",
            garnish: "None",
            ingredients: "1 oz. Scotch whisky, 1 oz. Amaretto",
            note: "A 1970s cocktail named in homage to the 1972 Coppola film."
        },
        {
            name: "AGGRAVATION",
            glass: "Rocks",
            mixingMethod: "Build",
            garnish: "None",
            ingredients: "1 oz. Scotch whisky, 1 oz. Kahlúa, Float Cream",
            note: "A lesser-known Scotch cocktail blending coffee liqueur and cream."
        },
        {
            name: "BLOOD & SAND",
            glass: "Coupe",
            mixingMethod: "Shake & strain",
            garnish: "Cherry or lemon twist",
            ingredients: "¾ oz. Scotch whisky, ¾ oz. Sweet vermouth, ¾ oz. Cherry Heering, ¾ oz. Orange juice",
            note: "Named after the 1922 bullfighting film."
        },
        {
            name: "BOILERMAKER",
            glass: "Pint or beer mug + shot glass",
            mixingMethod: "Drop shot",
            garnish: "None",
            ingredients: "1½ oz. Whiskey, 1 pint Beer",
            note: "Can be sipped side-by-side or dropped as a bomb shot."
        },
        {
            name: "DRY MANHATTAN",
            glass: "Martini",
            mixingMethod: "Stir & strain",
            garnish: "Maraschino cherry",
            ingredients: "1½ oz. Canadian or rye whisky, ½ oz. Dry vermouth, 1 dash Angostura bitters"
        },
        {
            name: "PERFECT MANHATTAN",
            glass: "Martini",
            mixingMethod: "Stir & strain",
            garnish: "Maraschino cherry",
            ingredients: "1½ oz. Canadian or rye whisky, ½ oz. Dry vermouth, ½ oz. Sweet vermouth, 1 dash Angostura bitters"
        },
        {
            name: "SWEET MANHATTAN",
            glass: "Martini",
            mixingMethod: "Stir & strain",
            garnish: "Maraschino cherry",
            ingredients: "1½ oz. Canadian or rye whisky, ¾ oz. Sweet vermouth, 1 dash Angostura bitters"
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
        },
        {
            name: "KIR ROYALE",
            glass: "Champagne flute",
            mixingMethod: "Pour",
            garnish: "Raspberry or lemon twist",
            ingredients: "4 oz. Champagne, ½ oz. Crème de cassis",
            note: "The Kir (non-royal) uses dry white wine instead of Champagne."
        },
        {
            name: "SEX ON THE BEACH",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Orange slice, cherry",
            ingredients: "1½ oz. Vodka, ¾ oz. Peach schnapps, 2 oz. Cranberry juice, 2 oz. Orange juice"
        },
        {
            name: "AMARETTO SOUR",
            glass: "Rocks",
            mixingMethod: "Dry shake, shake & strain",
            garnish: "Brandied cherry, lemon flag",
            ingredients: "1½ oz. Amaretto, ½ oz. Bourbon (optional), 1 oz. Lemon juice, ½ oz. Simple syrup, ½ oz. Egg white"
        },
        {
            name: "APEROL SPRITZ",
            glass: "Wine glass",
            mixingMethod: "Build over ice",
            garnish: "Orange slice",
            ingredients: "3 oz. Prosecco, 2 oz. Aperol, 1 oz. Soda water"
        },
        {
            name: "SIDECAR",
            glass: "Coupe",
            mixingMethod: "Shake & strain",
            garnish: "Lemon twist, sugar rim",
            ingredients: "1½ oz. Cognac, ¾ oz. Cointreau, ¾ oz. Lemon juice",
            note: "Believed created at the Ritz Bar in Paris or Buck's Club in London around 1920."
        },
        {
            name: "BRANDY ALEXANDER",
            glass: "Coupe",
            mixingMethod: "Shake & strain",
            garnish: "Freshly grated nutmeg",
            ingredients: "1 oz. Cognac, 1 oz. Dark crème de cacao, 1 oz. Heavy cream",
            note: "Evolved from the gin-based 'Alexander' around the 1920s."
        },
        {
            name: "VIEUX CARRÉ",
            glass: "Rocks",
            mixingMethod: "Stir & strain",
            garnish: "Lemon peel",
            ingredients: "¾ oz. Rye whiskey, ¾ oz. Cognac, ¾ oz. Sweet vermouth, 1 tsp. Bénédictine, 1 dash Angostura bitters, 1 dash Peychaud's bitters",
            note: "Created by Walter Bergeron at the Hotel Monteleone, New Orleans in the 1930s."
        },
        {
            name: "PIMM'S CUP",
            glass: "Collins",
            mixingMethod: "Build",
            garnish: "Cucumber spear, lemon slice",
            ingredients: "2 oz. Pimm's No. 1, Muddled Cucumber, ½ oz. Lemon juice, Top up Lemon-lime soda",
            note: "Pimm's No. 1 was created by James Pimm in 1823 in London. The Pimm's Cup became the official drink of Wimbledon."
        },
        {
            name: "HOT TODDY",
            glass: "Coffee mug or handled glass",
            mixingMethod: "Build & stir",
            garnish: "Lemon slice or lemon twist",
            ingredients: "2 oz. Brandy (or whiskey), ½ oz. Lemon juice, 1 tsp. Honey, Top up Hot water",
            note: "Whiskey is the traditional base; brandy is a common alternative."
        },
        {
            name: "STINGER",
            glass: "Martini",
            mixingMethod: "Stir & strain",
            garnish: "None",
            ingredients: "1½ oz. Brandy, ¾ oz. White crème de menthe",
            note: "A 1950s high-society after-dinner drink; reportedly favoured by the Rockefellers."
        },
        {
            name: "CLASSIC CHAMPAGNE COCKTAIL",
            glass: "Champagne flute",
            mixingMethod: "Build — no shaking",
            garnish: "Orange slice & cherry (optional)",
            ingredients: "1 sugar cube, 5 ml Angostura bitters, ¾ oz. Cognac, 3 oz. Champagne",
            note: "One of the oldest champagne cocktails. Place sugar cube in bottom, soak with bitters, add cognac, top slowly with champagne."
        },
        {
            name: "PISCO SOUR",
            glass: "Coupe",
            mixingMethod: "Dry shake then shake & strain",
            garnish: "Lime wheel, Angostura drops on foam",
            ingredients: "2 oz. Pisco, ¾ oz. Lime juice, ¾ oz. Simple syrup, ½ oz. Egg white, drops Angostura bitters",
            note: "Dry shake first without ice to build foam; add ice and shake again to chill."
        },
        {
            name: "KIR",
            glass: "White wine glass",
            mixingMethod: "Pour",
            garnish: "Lemon twist (optional)",
            ingredients: "4 oz. Dry white wine, 1 oz. Crème de cassis",
            note: "Named after Félix Kir, mayor of Dijon. Kir Royale substitutes Champagne."
        },
        {
            name: "SPRITZER",
            glass: "White wine glass",
            mixingMethod: "Build",
            garnish: "Twist of lemon",
            ingredients: "4 oz. White wine, 1½ oz. Soda water"
        },
        {
            name: "TEXAS TEA",
            glass: "Collins",
            mixingMethod: "Shake & roll",
            garnish: "Lemon",
            ingredients: "½ oz. Vodka, ½ oz. Rum, ½ oz. Gin, ½ oz. Triple sec, ½ oz. Bourbon, 1 oz. Sweet & sour mix, Splash Cola"
        },
        {
            name: "TOKYO TEA",
            glass: "Collins",
            mixingMethod: "Shake & roll",
            garnish: "Lemon, cherry",
            ingredients: "½ oz. Vodka, ½ oz. Rum, ½ oz. Gin, ½ oz. Melon liqueur (Midori), 1 oz. Sweet & sour mix, Top up Lemon-lime soda"
        },
        {
            name: "LONG BEACH ICED TEA",
            glass: "Collins",
            mixingMethod: "Shake & roll",
            garnish: "Lemon",
            ingredients: "½ oz. Vodka, ½ oz. Rum, ½ oz. Gin, ½ oz. Triple sec, 1 oz. Sweet & sour mix, Top up Cranberry juice"
        },
        {
            name: "AMF (ADIOS MOTHERFUCKER)",
            glass: "Collins",
            mixingMethod: "Shake & roll",
            garnish: "Lemon",
            ingredients: "½ oz. Vodka, ½ oz. Rum, ½ oz. Gin, ½ oz. Triple sec, 1 oz. Sweet & sour mix, ½ oz. Blue curaçao, Top up Lemon-lime soda"
        },
        {
            name: "BLACK WIDOW / GRATEFUL DEAD",
            glass: "Collins",
            mixingMethod: "Shake & roll",
            garnish: "Lemon",
            ingredients: "½ oz. Vodka, ½ oz. Rum, ½ oz. Gin, ½ oz. Triple sec, 1 oz. Sweet & sour mix, ½ oz. Chambord"
        },
        {
            name: "GEORGIA PEACH",
            glass: "Collins",
            mixingMethod: "Shake & roll",
            garnish: "Lemon",
            ingredients: "½ oz. Vodka, ½ oz. Rum, ½ oz. Gin, ½ oz. Peach schnapps, 1 oz. Orange juice, Top up Cranberry juice"
        },
        {
            name: "B-52",
            glass: "Shot glass",
            mixingMethod: "Layer",
            garnish: "None",
            ingredients: "15 ml Kahlúa, 15 ml Baileys Irish Cream, 15 ml Cointreau",
            note: "Layer over a bar spoon."
        },
        {
            name: "ORGASM",
            glass: "Rocks",
            mixingMethod: "Shake & strain over ice",
            garnish: "None",
            ingredients: "½ oz. Grand Marnier, ½ oz. Baileys Irish Cream, ½ oz. Cointreau"
        },
        {
            name: "ALABAMA SLAMMER",
            glass: "Rocks",
            mixingMethod: "Shake & strain over ice",
            garnish: "Orange slice",
            ingredients: "1 oz. Southern Comfort, ½ oz. Amaretto, ½ oz. Sloe gin, 2 oz. Orange juice, Splash Sweet & sour mix"
        },
        {
            name: "GRASSHOPPER",
            glass: "Martini or coupe",
            mixingMethod: "Shake & strain or blend",
            garnish: "Mint sprig",
            ingredients: "1 oz. White crème de cacao, 1 oz. Green crème de menthe, 1 oz. Cream"
        },
        {
            name: "FUZZY NAVEL",
            glass: "Collins",
            mixingMethod: "Build",
            garnish: "Orange slice",
            ingredients: "1½ oz. Peach schnapps, Top up Orange juice"
        },
        {
            name: "MUDSLIDE",
            glass: "Rocks or Hurricane",
            mixingMethod: "Shake & strain or blend",
            garnish: "None",
            ingredients: "1 oz. Vodka, ¾ oz. Kahlúa, ¾ oz. Baileys Irish Cream, Splash Cream"
        },
        {
            name: "NUTTY IRISHMAN",
            glass: "Rocks or shot",
            mixingMethod: "Build",
            garnish: "None",
            ingredients: "1 oz. Baileys Irish Cream, 1 oz. Frangelico"
        },
        {
            name: "FRENCH KISS",
            glass: "Martini",
            mixingMethod: "Shake & strain",
            garnish: "Raspberries or lemon twist",
            ingredients: "1 oz. Vodka, ½ oz. Chambord, ½ oz. Grand Marnier, Float Whipped cream"
        },
        {
            name: "PINK SQUIRREL",
            glass: "Martini",
            mixingMethod: "Shake & strain",
            garnish: "None",
            ingredients: "¾ oz. Crème de noyaux, ¾ oz. White crème de cacao, 1 oz. Cream"
        },
        {
            name: "FRENCH MIST",
            glass: "Martini",
            mixingMethod: "Shake & strain",
            garnish: "Chocolate syrup swirl in glass",
            ingredients: "1 oz. Baileys Irish Cream, ½ oz. Kahlúa, ½ oz. Triple sec, 1 oz. Fresh milk or cream"
        },
        {
            name: "TOBLERONE",
            glass: "Martini",
            mixingMethod: "Blend with ice",
            garnish: "Chocolate powder & chocolate syrup inside glass",
            ingredients: "1 oz. Frangelico, 1 oz. Baileys Irish Cream, 1 oz. Kahlúa, 2 oz. Cream, 1 tsp. Honey"
        },
        {
            name: "AMERICANO",
            glass: "Collins",
            mixingMethod: "Build & stir",
            garnish: "Orange peel",
            ingredients: "1 oz. Campari, 1 oz. Sweet vermouth, Top up Soda water",
            note: "The precursor to the Negroni."
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
        {
            name: "BLUE OCEAN",
            glass: "Hurricane",
            mixingMethod: "Blend",
            garnish: "Pineapple flag, butterfly pea flower",
            ingredients: "1 oz. Blue curaçao syrup (non-alc), 3 oz. Pineapple juice, 2 oz. Coconut water, ½ oz. Lime juice",
            note: "The colour fascinates guests — great for events."
        },
        {
            name: "CUCUMBER COOLER",
            glass: "Highball",
            mixingMethod: "Muddle & build",
            garnish: "Cucumber ribbon, mint",
            ingredients: "5–6 Cucumber slices, 8 Mint leaves, ¾ oz. Lime juice, ½ oz. Simple syrup, Top up Soda water",
            note: "Use a mandoline for cucumber ribbons as garnish."
        },
        {
            name: "PASSION FRUIT FIZZ",
            glass: "Highball",
            mixingMethod: "Build",
            garnish: "Passion fruit half, lime wheel",
            ingredients: "2 oz. Passion fruit purée, ½ oz. Lime juice, ½ oz. Honey syrup, Top up Soda water"
        },
        {
            name: "WATERMELON COOLER",
            glass: "Highball",
            mixingMethod: "Blend & strain",
            garnish: "Watermelon wedge, mint",
            ingredients: "4 oz (blended) Fresh watermelon, ¾ oz. Lime juice, ½ oz. Simple syrup, Top up Soda water"
        },
        {
            name: "MANGO LASSI",
            glass: "Highball",
            mixingMethod: "Blend",
            garnish: "Cardamom powder, mango slice",
            ingredients: "3 oz. Mango pulp, 2 oz. Plain yoghurt, 1 oz. Milk, 1 tsp Sugar, Pinch Ground cardamom",
            note: "A hotel management staple beverage from South Asian cuisine."
        },
        {
            name: "LYCHEE ROSE SPRITZ",
            glass: "Wine glass",
            mixingMethod: "Build",
            garnish: "Lychee on skewer, rose petal",
            ingredients: "3 oz. Lychee juice, 1 tsp Rose water, ½ oz. Lime juice, Top up Soda water",
            note: "An upscale mocktail popular in luxury hotel restaurants and high tea service."
        },
],
};

// Create an 'all' category that includes all cocktails
categories.all = Object.values(categories).flat();
