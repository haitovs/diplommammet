/**
 * GeoQuest - Countries Database
 * Complete dataset with flags, capitals, facts, and more
 */

const COUNTRIES = [
  // ============================================
  // EUROPE
  // ============================================
  {
    id: "fr",
    name: "France",
    capital: "Paris",
    continent: "Europe",
    region: "Western Europe",
    population: 67390000,
    area: 643801,
    languages: ["French"],
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    flag: "🇫🇷",
    difficulty: "easy",
    facts: [
      "This country is famous for the Eiffel Tower",
      "Home to the world's most visited museum, the Louvre",
      "Known for wine, cheese, and haute cuisine",
      "The capital is called the 'City of Light'",
      "French is the official language"
    ],
    neighbors: ["Germany", "Spain", "Italy", "Belgium", "Switzerland"]
  },
  {
    id: "de",
    name: "Germany",
    capital: "Berlin",
    continent: "Europe",
    region: "Central Europe",
    population: 83240000,
    area: 357386,
    languages: ["German"],
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    flag: "🇩🇪",
    difficulty: "easy",
    facts: [
      "This country is famous for its automotive industry",
      "Home to Oktoberfest, the world's largest beer festival",
      "The Berlin Wall divided this country until 1989",
      "Known for precision engineering and punctuality",
      "Has Europe's largest economy"
    ],
    neighbors: ["France", "Poland", "Austria", "Netherlands", "Czech Republic"]
  },
  {
    id: "it",
    name: "Italy",
    capital: "Rome",
    continent: "Europe",
    region: "Southern Europe",
    population: 60360000,
    area: 301340,
    languages: ["Italian"],
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    flag: "🇮🇹",
    difficulty: "easy",
    facts: [
      "Home to the ancient Roman Colosseum",
      "Famous for pizza, pasta, and gelato",
      "The Vatican City is located within this country",
      "Has the most UNESCO World Heritage sites",
      "Shaped like a boot on the map"
    ],
    neighbors: ["France", "Switzerland", "Austria", "Slovenia"]
  },
  {
    id: "es",
    name: "Spain",
    capital: "Madrid",
    continent: "Europe",
    region: "Southern Europe",
    population: 47420000,
    area: 505990,
    languages: ["Spanish"],
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    flag: "🇪🇸",
    difficulty: "easy",
    facts: [
      "Famous for flamenco dancing and bullfighting",
      "Home to FC Barcelona and Real Madrid",
      "Known for the running of the bulls in Pamplona",
      "Has beautiful beaches along the Mediterranean",
      "The Sagrada Familia is in Barcelona"
    ],
    neighbors: ["France", "Portugal", "Andorra"]
  },
  {
    id: "gb",
    name: "United Kingdom",
    capital: "London",
    continent: "Europe",
    region: "Northern Europe",
    population: 67886000,
    area: 242495,
    languages: ["English"],
    currency: { name: "Pound Sterling", code: "GBP", symbol: "£" },
    flag: "🇬🇧",
    difficulty: "easy",
    facts: [
      "Home to Big Ben and Buckingham Palace",
      "The Queen lived here until 2022",
      "Famous for fish and chips and afternoon tea",
      "Driving is on the left side of the road",
      "English originated from this island nation"
    ],
    neighbors: ["Ireland"]
  },
  {
    id: "pt",
    name: "Portugal",
    capital: "Lisbon",
    continent: "Europe",
    region: "Southern Europe",
    population: 10310000,
    area: 92212,
    languages: ["Portuguese"],
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    flag: "🇵🇹",
    difficulty: "medium",
    facts: [
      "Westernmost country in mainland Europe",
      "Famous for port wine and pastéis de nata",
      "Once had a vast colonial empire including Brazil",
      "Known for Fado music and azulejo tiles",
      "Vasco da Gama was from here"
    ],
    neighbors: ["Spain"]
  },
  {
    id: "nl",
    name: "Netherlands",
    capital: "Amsterdam",
    continent: "Europe",
    region: "Western Europe",
    population: 17440000,
    area: 41850,
    languages: ["Dutch"],
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    flag: "🇳🇱",
    difficulty: "medium",
    facts: [
      "Famous for tulips, windmills, and wooden shoes",
      "Much of the country is below sea level",
      "Known for its liberal policies and cycling culture",
      "Home to Vincent van Gogh and Rembrandt",
      "Has an extensive canal system"
    ],
    neighbors: ["Germany", "Belgium"]
  },
  {
    id: "ch",
    name: "Switzerland",
    capital: "Bern",
    continent: "Europe",
    region: "Central Europe",
    population: 8654000,
    area: 41285,
    languages: ["German", "French", "Italian", "Romansh"],
    currency: { name: "Swiss Franc", code: "CHF", symbol: "Fr" },
    flag: "🇨🇭",
    difficulty: "medium",
    facts: [
      "Famous for chocolate, cheese, and watches",
      "Home to the Alps and beautiful mountain scenery",
      "Has remained neutral in major conflicts",
      "Banking secrecy is legendary here",
      "Has four official languages"
    ],
    neighbors: ["Germany", "France", "Italy", "Austria", "Liechtenstein"]
  },
  {
    id: "no",
    name: "Norway",
    capital: "Oslo",
    continent: "Europe",
    region: "Northern Europe",
    population: 5379000,
    area: 385207,
    languages: ["Norwegian"],
    currency: { name: "Norwegian Krone", code: "NOK", symbol: "kr" },
    flag: "🇳🇴",
    difficulty: "medium",
    facts: [
      "Famous for stunning fjords and Northern Lights",
      "One of the world's wealthiest countries per capita",
      "Vikings originated from this region",
      "Home to the Nobel Peace Prize",
      "Has the midnight sun in summer"
    ],
    neighbors: ["Sweden", "Finland", "Russia"]
  },
  {
    id: "se",
    name: "Sweden",
    capital: "Stockholm",
    continent: "Europe",
    region: "Northern Europe",
    population: 10380000,
    area: 450295,
    languages: ["Swedish"],
    currency: { name: "Swedish Krona", code: "SEK", symbol: "kr" },
    flag: "🇸🇪",
    difficulty: "medium",
    facts: [
      "Home to IKEA and ABBA",
      "Famous for meatballs and minimalist design",
      "Known for its welfare state and high quality of life",
      "Has a royal family still today",
      "Nobel Prizes are awarded in Stockholm"
    ],
    neighbors: ["Norway", "Finland"]
  },
  {
    id: "pl",
    name: "Poland",
    capital: "Warsaw",
    continent: "Europe",
    region: "Central Europe",
    population: 37950000,
    area: 312685,
    languages: ["Polish"],
    currency: { name: "Polish Zloty", code: "PLN", symbol: "zł" },
    flag: "🇵🇱",
    difficulty: "medium",
    facts: [
      "Home to Auschwitz memorial and historic Krakow",
      "Marie Curie was born here",
      "Famous for pierogi dumplings",
      "The country was divided between empires for 123 years",
      "Has beautiful medieval old towns"
    ],
    neighbors: ["Germany", "Czech Republic", "Slovakia", "Ukraine", "Belarus", "Lithuania"]
  },
  {
    id: "gr",
    name: "Greece",
    capital: "Athens",
    continent: "Europe",
    region: "Southern Europe",
    population: 10720000,
    area: 131957,
    languages: ["Greek"],
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    flag: "🇬🇷",
    difficulty: "medium",
    facts: [
      "Birthplace of democracy and the Olympic Games",
      "Home to the Parthenon and Acropolis",
      "Has thousands of islands in the Aegean Sea",
      "Greek mythology originated here",
      "Famous for feta cheese and olive oil"
    ],
    neighbors: ["Turkey", "Bulgaria", "North Macedonia", "Albania"]
  },
  {
    id: "at",
    name: "Austria",
    capital: "Vienna",
    continent: "Europe",
    region: "Central Europe",
    population: 9010000,
    area: 83879,
    languages: ["German"],
    currency: { name: "Euro", code: "EUR", symbol: "€" },
    flag: "🇦🇹",
    difficulty: "medium",
    facts: [
      "Home to Mozart and classical music tradition",
      "Famous for the Vienna Opera and Schnitzel",
      "The Sound of Music was filmed here",
      "Known for ski resorts in the Alps",
      "Vienna is consistently ranked most livable city"
    ],
    neighbors: ["Germany", "Switzerland", "Italy", "Czech Republic", "Hungary", "Slovakia", "Slovenia", "Liechtenstein"]
  },
  {
    id: "is",
    name: "Iceland",
    capital: "Reykjavik",
    continent: "Europe",
    region: "Northern Europe",
    population: 372000,
    area: 103000,
    languages: ["Icelandic"],
    currency: { name: "Icelandic Króna", code: "ISK", symbol: "kr" },
    flag: "🇮🇸",
    difficulty: "hard",
    facts: [
      "Land of fire and ice with glaciers and volcanoes",
      "Famous for the Blue Lagoon geothermal spa",
      "One of the safest countries in the world",
      "Has no standing army",
      "Northern Lights are visible here"
    ],
    neighbors: []
  },
  
  // ============================================
  // ASIA
  // ============================================
  {
    id: "jp",
    name: "Japan",
    capital: "Tokyo",
    continent: "Asia",
    region: "East Asia",
    population: 125800000,
    area: 377975,
    languages: ["Japanese"],
    currency: { name: "Japanese Yen", code: "JPY", symbol: "¥" },
    flag: "🇯🇵",
    difficulty: "easy",
    facts: [
      "Land of the Rising Sun",
      "Famous for sushi, anime, and technology",
      "Home to Mount Fuji, a sacred volcano",
      "Has the world's busiest pedestrian crossing in Shibuya",
      "Cherry blossom season is celebrated nationwide"
    ],
    neighbors: []
  },
  {
    id: "cn",
    name: "China",
    capital: "Beijing",
    continent: "Asia",
    region: "East Asia",
    population: 1412000000,
    area: 9596961,
    languages: ["Mandarin Chinese"],
    currency: { name: "Chinese Yuan", code: "CNY", symbol: "¥" },
    flag: "🇨🇳",
    difficulty: "easy",
    facts: [
      "Home to the Great Wall, visible from space (myth but famous)",
      "World's most populous country",
      "Invented paper, gunpowder, and the compass",
      "Has a 5000-year-old civilization",
      "Pandas are native only here"
    ],
    neighbors: ["Russia", "India", "Mongolia", "Nepal", "Pakistan", "Vietnam"]
  },
  {
    id: "in",
    name: "India",
    capital: "New Delhi",
    continent: "Asia",
    region: "South Asia",
    population: 1380000000,
    area: 3287263,
    languages: ["Hindi", "English"],
    currency: { name: "Indian Rupee", code: "INR", symbol: "₹" },
    flag: "🇮🇳",
    difficulty: "easy",
    facts: [
      "Home to the Taj Mahal",
      "Birthplace of yoga and Buddhism",
      "Has the world's largest film industry (Bollywood)",
      "Invented the number zero",
      "Is the world's largest democracy"
    ],
    neighbors: ["China", "Pakistan", "Nepal", "Bangladesh", "Myanmar"]
  },
  {
    id: "kr",
    name: "South Korea",
    capital: "Seoul",
    continent: "Asia",
    region: "East Asia",
    population: 51780000,
    area: 100210,
    languages: ["Korean"],
    currency: { name: "South Korean Won", code: "KRW", symbol: "₩" },
    flag: "🇰🇷",
    difficulty: "medium",
    facts: [
      "Home to Samsung and K-pop",
      "Known for Korean BBQ and kimchi",
      "Has the fastest internet in the world",
      "Gangnam Style broke YouTube records",
      "Still technically at war with the North"
    ],
    neighbors: ["North Korea"]
  },
  {
    id: "th",
    name: "Thailand",
    capital: "Bangkok",
    continent: "Asia",
    region: "Southeast Asia",
    population: 69800000,
    area: 513120,
    languages: ["Thai"],
    currency: { name: "Thai Baht", code: "THB", symbol: "฿" },
    flag: "🇹🇭",
    difficulty: "medium",
    facts: [
      "Known as the Land of Smiles",
      "Famous for Pad Thai and street food",
      "Has ornate Buddhist temples everywhere",
      "Never colonized by European powers",
      "Bangkok has the longest city name in the world"
    ],
    neighbors: ["Myanmar", "Laos", "Cambodia", "Malaysia"]
  },
  {
    id: "vn",
    name: "Vietnam",
    capital: "Hanoi",
    continent: "Asia",
    region: "Southeast Asia",
    population: 97340000,
    area: 331212,
    languages: ["Vietnamese"],
    currency: { name: "Vietnamese Dong", code: "VND", symbol: "₫" },
    flag: "🇻🇳",
    difficulty: "medium",
    facts: [
      "Famous for pho noodle soup",
      "Ha Long Bay has thousands of limestone islands",
      "Was once divided into North and South",
      "Coffee culture is huge here",
      "Motorcycles dominate the streets"
    ],
    neighbors: ["China", "Laos", "Cambodia"]
  },
  {
    id: "id",
    name: "Indonesia",
    capital: "Jakarta",
    continent: "Asia",
    region: "Southeast Asia",
    population: 273500000,
    area: 1904569,
    languages: ["Indonesian"],
    currency: { name: "Indonesian Rupiah", code: "IDR", symbol: "Rp" },
    flag: "🇮🇩",
    difficulty: "medium",
    facts: [
      "World's largest archipelago with 17,000+ islands",
      "Bali is a famous tourist destination here",
      "Home to Komodo dragons",
      "Fourth most populous country",
      "Has more than 700 languages spoken"
    ],
    neighbors: ["Malaysia", "Papua New Guinea", "Timor-Leste"]
  },
  {
    id: "ph",
    name: "Philippines",
    capital: "Manila",
    continent: "Asia",
    region: "Southeast Asia",
    population: 109580000,
    area: 300000,
    languages: ["Filipino", "English"],
    currency: { name: "Philippine Peso", code: "PHP", symbol: "₱" },
    flag: "🇵🇭",
    difficulty: "medium",
    facts: [
      "Made up of over 7,000 islands",
      "Only Asian country with a Catholic majority",
      "Christmas season starts in September here",
      "Known for friendly people and beautiful beaches",
      "Was once a Spanish and American colony"
    ],
    neighbors: []
  },
  {
    id: "sg",
    name: "Singapore",
    capital: "Singapore",
    continent: "Asia",
    region: "Southeast Asia",
    population: 5686000,
    area: 728,
    languages: ["English", "Mandarin", "Malay", "Tamil"],
    currency: { name: "Singapore Dollar", code: "SGD", symbol: "S$" },
    flag: "🇸🇬",
    difficulty: "medium",
    facts: [
      "One of the world's smallest countries",
      "Known for being extremely clean and safe",
      "Chewing gum is banned here",
      "Marina Bay Sands is an iconic hotel",
      "Has four official languages"
    ],
    neighbors: ["Malaysia"]
  },
  {
    id: "ae",
    name: "United Arab Emirates",
    capital: "Abu Dhabi",
    continent: "Asia",
    region: "Middle East",
    population: 9890000,
    area: 83600,
    languages: ["Arabic"],
    currency: { name: "UAE Dirham", code: "AED", symbol: "د.إ" },
    flag: "🇦🇪",
    difficulty: "medium",
    facts: [
      "Dubai has the world's tallest building, Burj Khalifa",
      "Has palm-shaped artificial islands",
      "Known for luxury shopping and architecture",
      "Was once a poor desert region before oil",
      "Has indoor ski slopes in the desert"
    ],
    neighbors: ["Saudi Arabia", "Oman"]
  },
  
  // ============================================
  // AFRICA
  // ============================================
  {
    id: "eg",
    name: "Egypt",
    capital: "Cairo",
    continent: "Africa",
    region: "North Africa",
    population: 102300000,
    area: 1002450,
    languages: ["Arabic"],
    currency: { name: "Egyptian Pound", code: "EGP", symbol: "E£" },
    flag: "🇪🇬",
    difficulty: "easy",
    facts: [
      "Home to the ancient pyramids of Giza",
      "The Nile River flows through this country",
      "King Tutankhamun's tomb was discovered here",
      "Has the Great Sphinx monument",
      "One of the oldest civilizations in history"
    ],
    neighbors: ["Libya", "Sudan", "Israel", "Palestine"]
  },
  {
    id: "za",
    name: "South Africa",
    capital: "Pretoria",
    continent: "Africa",
    region: "Southern Africa",
    population: 59310000,
    area: 1221037,
    languages: ["Zulu", "Xhosa", "Afrikaans", "English"],
    currency: { name: "South African Rand", code: "ZAR", symbol: "R" },
    flag: "🇿🇦",
    difficulty: "medium",
    facts: [
      "Nelson Mandela led the fight against apartheid here",
      "Has 11 official languages",
      "Known for safari wildlife and Table Mountain",
      "Hosted the 2010 FIFA World Cup",
      "Has three capital cities"
    ],
    neighbors: ["Namibia", "Botswana", "Zimbabwe", "Mozambique", "Eswatini", "Lesotho"]
  },
  {
    id: "ke",
    name: "Kenya",
    capital: "Nairobi",
    continent: "Africa",
    region: "East Africa",
    population: 53770000,
    area: 580367,
    languages: ["Swahili", "English"],
    currency: { name: "Kenyan Shilling", code: "KES", symbol: "KSh" },
    flag: "🇰🇪",
    difficulty: "medium",
    facts: [
      "Famous for safari wildlife and the Big Five",
      "Maasai warriors live here",
      "Home to world-class long-distance runners",
      "The Great Rift Valley runs through here",
      "Obama's father was from this country"
    ],
    neighbors: ["Tanzania", "Uganda", "Ethiopia", "Somalia", "South Sudan"]
  },
  {
    id: "ng",
    name: "Nigeria",
    capital: "Abuja",
    continent: "Africa",
    region: "West Africa",
    population: 206140000,
    area: 923768,
    languages: ["English"],
    currency: { name: "Nigerian Naira", code: "NGN", symbol: "₦" },
    flag: "🇳🇬",
    difficulty: "medium",
    facts: [
      "Africa's most populous country",
      "Known as the Giant of Africa",
      "Nollywood is the 2nd largest film industry by volume",
      "Has over 500 ethnic groups",
      "One of the largest oil producers in the world"
    ],
    neighbors: ["Benin", "Niger", "Chad", "Cameroon"]
  },
  {
    id: "ma",
    name: "Morocco",
    capital: "Rabat",
    continent: "Africa",
    region: "North Africa",
    population: 36910000,
    area: 446550,
    languages: ["Arabic", "Berber"],
    currency: { name: "Moroccan Dirham", code: "MAD", symbol: "DH" },
    flag: "🇲🇦",
    difficulty: "medium",
    facts: [
      "Famous for Marrakech's markets and riads",
      "The Sahara Desert extends into this country",
      "Known for mint tea and tagine dishes",
      "Has beautiful blue-painted cities like Chefchaouen",
      "Separated from Europe by just 14 km of sea"
    ],
    neighbors: ["Algeria", "Mauritania", "Spain"]
  },
  {
    id: "et",
    name: "Ethiopia",
    capital: "Addis Ababa",
    continent: "Africa",
    region: "East Africa",
    population: 114960000,
    area: 1104300,
    languages: ["Amharic"],
    currency: { name: "Ethiopian Birr", code: "ETB", symbol: "Br" },
    flag: "🇪🇹",
    difficulty: "hard",
    facts: [
      "Birthplace of coffee",
      "Never colonized by a European power",
      "Has its own unique calendar with 13 months",
      "Lucy, the famous fossil, was found here",
      "The oldest independent country in Africa"
    ],
    neighbors: ["Eritrea", "Djibouti", "Somalia", "Kenya", "South Sudan", "Sudan"]
  },
  
  // ============================================
  // NORTH AMERICA
  // ============================================
  {
    id: "us",
    name: "United States",
    capital: "Washington, D.C.",
    continent: "North America",
    region: "North America",
    population: 331000000,
    area: 9833520,
    languages: ["English"],
    currency: { name: "US Dollar", code: "USD", symbol: "$" },
    flag: "🇺🇸",
    difficulty: "easy",
    facts: [
      "Has 50 states and is home to Hollywood",
      "The Statue of Liberty was a gift from France",
      "First country to land humans on the moon",
      "Home to the Grand Canyon and Yellowstone",
      "World's largest economy"
    ],
    neighbors: ["Canada", "Mexico"]
  },
  {
    id: "ca",
    name: "Canada",
    capital: "Ottawa",
    continent: "North America",
    region: "North America",
    population: 38010000,
    area: 9984670,
    languages: ["English", "French"],
    currency: { name: "Canadian Dollar", code: "CAD", symbol: "C$" },
    flag: "🇨🇦",
    difficulty: "easy",
    facts: [
      "Second largest country by total area",
      "Famous for maple syrup and hockey",
      "Has two official languages",
      "Known for being polite and friendly",
      "Niagara Falls is on the border with the US"
    ],
    neighbors: ["United States"]
  },
  {
    id: "mx",
    name: "Mexico",
    capital: "Mexico City",
    continent: "North America",
    region: "Central America",
    population: 128900000,
    area: 1964375,
    languages: ["Spanish"],
    currency: { name: "Mexican Peso", code: "MXN", symbol: "$" },
    flag: "🇲🇽",
    difficulty: "easy",
    facts: [
      "Home to ancient Mayan and Aztec ruins",
      "Famous for tacos, tequila, and Day of the Dead",
      "Mexico City was built on a lake",
      "Has beautiful beaches in Cancún and Puerto Vallarta",
      "World's largest Spanish-speaking country by population"
    ],
    neighbors: ["United States", "Guatemala", "Belize"]
  },
  {
    id: "cu",
    name: "Cuba",
    capital: "Havana",
    continent: "North America",
    region: "Caribbean",
    population: 11330000,
    area: 109884,
    languages: ["Spanish"],
    currency: { name: "Cuban Peso", code: "CUP", symbol: "$" },
    flag: "🇨🇺",
    difficulty: "medium",
    facts: [
      "Famous for classic vintage cars from the 1950s",
      "Known for cigars, rum, and salsa music",
      "Fidel Castro led a revolution here",
      "Just 90 miles from Florida",
      "Has free healthcare and education"
    ],
    neighbors: []
  },
  {
    id: "jm",
    name: "Jamaica",
    capital: "Kingston",
    continent: "North America",
    region: "Caribbean",
    population: 2961000,
    area: 10991,
    languages: ["English"],
    currency: { name: "Jamaican Dollar", code: "JMD", symbol: "J$" },
    flag: "🇯🇲",
    difficulty: "medium",
    facts: [
      "Birthplace of reggae music and Bob Marley",
      "Known for jerk chicken and rum",
      "Has produced many Olympic sprinting champions",
      "Usain Bolt is from here",
      "Famous phrase: 'No problem, mon!'"
    ],
    neighbors: []
  },
  
  // ============================================
  // SOUTH AMERICA
  // ============================================
  {
    id: "br",
    name: "Brazil",
    capital: "Brasília",
    continent: "South America",
    region: "South America",
    population: 212600000,
    area: 8515767,
    languages: ["Portuguese"],
    currency: { name: "Brazilian Real", code: "BRL", symbol: "R$" },
    flag: "🇧🇷",
    difficulty: "easy",
    facts: [
      "Home to the Amazon rainforest",
      "Famous for Carnival in Rio de Janeiro",
      "Christ the Redeemer overlooks Rio",
      "Has won 5 FIFA World Cup titles",
      "Only Portuguese-speaking country in South America"
    ],
    neighbors: ["Argentina", "Uruguay", "Paraguay", "Bolivia", "Peru", "Colombia", "Venezuela"]
  },
  {
    id: "ar",
    name: "Argentina",
    capital: "Buenos Aires",
    continent: "South America",
    region: "South America",
    population: 45380000,
    area: 2780400,
    languages: ["Spanish"],
    currency: { name: "Argentine Peso", code: "ARS", symbol: "$" },
    flag: "🇦🇷",
    difficulty: "medium",
    facts: [
      "Birthplace of tango dancing",
      "Home to Lionel Messi and Diego Maradona",
      "Famous for beef and wine",
      "Has beautiful Patagonia glaciers",
      "Won the 2022 FIFA World Cup"
    ],
    neighbors: ["Chile", "Bolivia", "Paraguay", "Brazil", "Uruguay"]
  },
  {
    id: "pe",
    name: "Peru",
    capital: "Lima",
    continent: "South America",
    region: "South America",
    population: 32970000,
    area: 1285216,
    languages: ["Spanish", "Quechua"],
    currency: { name: "Peruvian Sol", code: "PEN", symbol: "S/" },
    flag: "🇵🇪",
    difficulty: "medium",
    facts: [
      "Home to Machu Picchu, the lost city of the Incas",
      "The Andes mountains run through the country",
      "Birthplace of the potato",
      "Ceviche is a famous dish here",
      "The ancient Nazca Lines are mysterious geoglyphs"
    ],
    neighbors: ["Ecuador", "Colombia", "Brazil", "Bolivia", "Chile"]
  },
  {
    id: "co",
    name: "Colombia",
    capital: "Bogotá",
    continent: "South America",
    region: "South America",
    population: 50880000,
    area: 1141748,
    languages: ["Spanish"],
    currency: { name: "Colombian Peso", code: "COP", symbol: "$" },
    flag: "🇨🇴",
    difficulty: "medium",
    facts: [
      "Famous for coffee production",
      "Shakira and Gabriel García Márquez are from here",
      "Has both Caribbean and Pacific coastlines",
      "Named after Christopher Columbus",
      "Known for emeralds and biodiversity"
    ],
    neighbors: ["Venezuela", "Brazil", "Peru", "Ecuador", "Panama"]
  },
  {
    id: "cl",
    name: "Chile",
    capital: "Santiago",
    continent: "South America",
    region: "South America",
    population: 19120000,
    area: 756102,
    languages: ["Spanish"],
    currency: { name: "Chilean Peso", code: "CLP", symbol: "$" },
    flag: "🇨🇱",
    difficulty: "medium",
    facts: [
      "World's longest country from north to south",
      "Has the driest desert on Earth (Atacama)",
      "Famous for wine and salmon",
      "Easter Island belongs to this country",
      "Has dramatic Patagonian landscapes"
    ],
    neighbors: ["Argentina", "Peru", "Bolivia"]
  },
  
  // ============================================
  // OCEANIA
  // ============================================
  {
    id: "au",
    name: "Australia",
    capital: "Canberra",
    continent: "Oceania",
    region: "Oceania",
    population: 25690000,
    area: 7692024,
    languages: ["English"],
    currency: { name: "Australian Dollar", code: "AUD", symbol: "A$" },
    flag: "🇦🇺",
    difficulty: "easy",
    facts: [
      "Home to kangaroos and koalas",
      "The Sydney Opera House is world-famous",
      "Has the Great Barrier Reef",
      "Both a country and a continent",
      "Everything seems to be trying to kill you (according to jokes)"
    ],
    neighbors: []
  },
  {
    id: "nz",
    name: "New Zealand",
    capital: "Wellington",
    continent: "Oceania",
    region: "Oceania",
    population: 5084000,
    area: 268021,
    languages: ["English", "Māori"],
    currency: { name: "New Zealand Dollar", code: "NZD", symbol: "NZ$" },
    flag: "🇳🇿",
    difficulty: "medium",
    facts: [
      "Lord of the Rings was filmed here",
      "Home to the indigenous Māori culture",
      "Known for rugby and the All Blacks team",
      "Has more sheep than people",
      "First country where women could vote"
    ],
    neighbors: []
  },
  {
    id: "fj",
    name: "Fiji",
    capital: "Suva",
    continent: "Oceania",
    region: "Oceania",
    population: 896400,
    area: 18274,
    languages: ["English", "Fijian", "Hindi"],
    currency: { name: "Fijian Dollar", code: "FJD", symbol: "FJ$" },
    flag: "🇫🇯",
    difficulty: "hard",
    facts: [
      "Made up of over 330 islands",
      "Famous for beautiful tropical resorts",
      "Known for the Fiji Water brand worldwide",
      "Rugby is the most popular sport",
      "One of the first places to see the new year"
    ],
    neighbors: []
  }
];

// Helper function to get countries by difficulty
function getCountriesByDifficulty(difficulty) {
  return COUNTRIES.filter(c => c.difficulty === difficulty);
}

// Helper function to get countries by continent
function getCountriesByContinent(continent) {
  return COUNTRIES.filter(c => c.continent === continent);
}

// Helper function to get random countries
function getRandomCountries(count, exclude = []) {
  const available = COUNTRIES.filter(c => !exclude.includes(c.id));
  const shuffled = available.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Helper function to get a random country
function getRandomCountry(difficulty = null, continent = null) {
  let pool = [...COUNTRIES];
  if (difficulty) pool = pool.filter(c => c.difficulty === difficulty);
  if (continent) pool = pool.filter(c => c.continent === continent);
  return pool[Math.floor(Math.random() * pool.length)];
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COUNTRIES, getCountriesByDifficulty, getCountriesByContinent, getRandomCountries, getRandomCountry };
}
