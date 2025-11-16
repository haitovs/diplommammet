const COUNTRIES = [
  {
    iso: 'FRA',
    name: 'France',
    capital: 'Paris',
    region: 'Europe',
    subregion: 'Western Europe',
    populationMillions: 67.5,
    areaKm2: 551695,
    currencies: ['Euro'],
    languages: ['French'],
    clues: {
      easy: [
        'Its capital is known as the City of Light.',
        'Home to the Louvre, the most visited museum on Earth.',
        'Famous for baguettes, cheese, and haute couture.'
      ],
      medium: [
        'Shares land borders with Belgium, Germany, Italy, and Spain.',
        'Hosts the annual Tour de France cycling race.',
        'Loire Valley and Bordeaux are key wine regions.'
      ],
      hard: [
        'The Guiana Space Centre launches rockets near the equator.',
        'The TGV network pioneered high speed rail in Europe.',
        'Its overseas departments include Reunion and Guadeloupe.'
      ]
    },
    hints: [
      'Think Romance language powerhouse in Western Europe.',
      'Flag is the classic blue white red tricolor.'
    ]
  },
  {
    iso: 'JPN',
    name: 'Japan',
    capital: 'Tokyo',
    region: 'Asia',
    subregion: 'East Asia',
    populationMillions: 125.1,
    areaKm2: 377975,
    currencies: ['Yen'],
    languages: ['Japanese'],
    clues: {
      easy: [
        'Island nation famous for sushi and cherry blossoms.',
        'Capital region is the world\'s largest metro area.',
        'Home to brands like Sony, Nintendo, and Toyota.'
      ],
      medium: [
        'Composed of Honshu, Hokkaido, Kyushu, and Shikoku as main islands.',
        'Mount Fuji is a sacred stratovolcano here.',
        'Hosts the Shinkansen bullet train network.'
      ],
      hard: [
        'The Meiji Restoration rapidly modernized this country.',
        'Uses prefectures instead of states.',
        'Writing mixes kanji with hiragana and katakana.'
      ]
    },
    hints: [
      'Look across the Sea of Japan from the Korean Peninsula.',
      'Anime, robotics, and meticulous craftsmanship shine here.'
    ]
  },
  {
    iso: 'BRA',
    name: 'Brazil',
    capital: 'Brasilia',
    region: 'Americas',
    subregion: 'South America',
    populationMillions: 214,
    areaKm2: 8515767,
    currencies: ['Real'],
    languages: ['Portuguese'],
    clues: {
      easy: [
        'Largest country in South America by area and population.',
        'Rio de Janeiro hosts an iconic Carnival.',
        'Legendary footballers like Pelé hail from here.'
      ],
      medium: [
        'Contains most of the Amazon River basin.',
        'Capital was a planned city inaugurated in 1960.',
        'Borders every South American country except Chile and Ecuador.'
      ],
      hard: [
        'Flag features a blue globe with Ordem e Progresso.',
        'Industrial hubs include Sao Paulo and Minas Gerais.',
        'Was once part of the Portuguese Empire as a united kingdom.'
      ]
    },
    hints: [
      'Only nation in the Americas with Portuguese as the official language.',
      'Think rainforest, samba, and coffee exports.'
    ]
  },
  {
    iso: 'CAN',
    name: 'Canada',
    capital: 'Ottawa',
    region: 'Americas',
    subregion: 'North America',
    populationMillions: 39,
    areaKm2: 9984670,
    currencies: ['Canadian Dollar'],
    languages: ['English', 'French'],
    clues: {
      easy: [
        'Second largest country on Earth by area.',
        'Its symbol is the red maple leaf.',
        'Ice hockey is considered a national winter sport.'
      ],
      medium: [
        'Has ten provinces and three territories.',
        'Contains Banff and Jasper in the Rocky Mountains.',
        'Shares the world\'s longest international border with the United States.'
      ],
      hard: [
        'Indigenous Inuit people primarily reside in Nunavut.',
        'Motto is A Mari Usque Ad Mare.',
        'St Lawrence Seaway connects the Atlantic to the Great Lakes.'
      ]
    },
    hints: [
      'Bilingual federal government in North America.',
      'Think of poutine, polar bears, and auroras.'
    ]
  },
  {
    iso: 'KEN',
    name: 'Kenya',
    capital: 'Nairobi',
    region: 'Africa',
    subregion: 'Eastern Africa',
    populationMillions: 53,
    areaKm2: 580367,
    currencies: ['Kenyan Shilling'],
    languages: ['Swahili', 'English'],
    clues: {
      easy: [
        'Home to safaris across the Maasai Mara.',
        'Long distance runners from here dominate marathons.',
        'Sits on the equator along the Indian Ocean.'
      ],
      medium: [
        'Mount Kenya is the second highest peak in Africa.',
        'Hosts the Great Rift Valley and Lake Turkana.',
        'Shares a famous lake feeding the Nile with Uganda and Tanzania.'
      ],
      hard: [
        'Capital hosts the United Nations Environment Programme HQ.',
        'Gained independence in 1963 led by Jomo Kenyatta.',
        'Port of Mombasa sits on a coral island.'
      ]
    },
    hints: [
      'National language is Swahili.',
      'Flag has black, red, and green stripes with a Maasai shield.'
    ]
  },
  {
    iso: 'AUS',
    name: 'Australia',
    capital: 'Canberra',
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    populationMillions: 26,
    areaKm2: 7692024,
    currencies: ['Australian Dollar'],
    languages: ['English'],
    clues: {
      easy: [
        'A continent and a country surrounded by two oceans.',
        'Home to kangaroos and koalas.',
        'Hosts the Great Barrier Reef.'
      ],
      medium: [
        'Sydney is the largest city though not the capital.',
        'Features the vast interior known as the Outback.',
        'Part of the Commonwealth with a Governor General.'
      ],
      hard: [
        'Uluru is a sandstone monolith sacred to the Anangu people.',
        'Snowy Mountains scheme is a massive hydro project.',
        'States include Victoria, Queensland, and Tasmania.'
      ]
    },
    hints: [
      'Think Southern Hemisphere with marsupials.',
      'Flag combines the Union Jack with the Southern Cross.'
    ]
  },
  {
    iso: 'IND',
    name: 'India',
    capital: 'New Delhi',
    region: 'Asia',
    subregion: 'Southern Asia',
    populationMillions: 1400,
    areaKm2: 3287263,
    currencies: ['Indian Rupee'],
    languages: ['Hindi', 'English', 'Numerous regional languages'],
    clues: {
      easy: [
        'Second most populous country in the world.',
        'Home to the Taj Mahal.',
        'Bollywood film industry thrives here.'
      ],
      medium: [
        'Borders both the Arabian Sea and the Bay of Bengal.',
        'Hosts the sacred Ganges River.',
        'Includes 28 states and 8 union territories.'
      ],
      hard: [
        'The Green Revolution boosted agriculture in the 1960s.',
        'ISRO launched the Mars Orbiter Mission.',
        'States were reorganized primarily by language after independence.'
      ]
    },
    hints: [
      'Look at the Indian Ocean rim.',
      'Tricolor flag with a navy blue Ashoka Chakra wheel.'
    ]
  },
  {
    iso: 'ISL',
    name: 'Iceland',
    capital: 'Reykjavik',
    region: 'Europe',
    subregion: 'Northern Europe',
    populationMillions: 0.37,
    areaKm2: 103000,
    currencies: ['Icelandic Krona'],
    languages: ['Icelandic'],
    clues: {
      easy: [
        'Nordic island famous for geysers and volcanoes.',
        'Runs almost entirely on geothermal and hydro power.',
        'Capital hosts the annual Airwaves music festival.'
      ],
      medium: [
        'Thingvellir houses the world\'s oldest parliament site.',
        'Ring Road encircles the entire island.',
        'Blue Lagoon spa is fed by geothermal water.'
      ],
      hard: [
        'Sagas of the settlers are key medieval literature.',
        'Eyjafjallajokull eruption disrupted flights in 2010.',
        'Has no standing army, relying on NATO arrangements.'
      ]
    },
    hints: [
      'Locate between Greenland and Norway.',
      'Flag has a blue field with a red cross outlined in white.'
    ]
  },
  {
    iso: 'EGY',
    name: 'Egypt',
    capital: 'Cairo',
    region: 'Africa',
    subregion: 'Northern Africa',
    populationMillions: 110,
    areaKm2: 1002450,
    currencies: ['Egyptian Pound'],
    languages: ['Arabic'],
    clues: {
      easy: [
        'Home to the Pyramids of Giza and the Sphinx.',
        'The Nile River flows north through this country.',
        'Cairo is the largest city in the Arab world.'
      ],
      medium: [
        'Controls the Suez Canal linking the Red Sea and Mediterranean.',
        'Sinai Peninsula connects Africa to Asia here.',
        'Ancient writing system of hieroglyphs originated here.'
      ],
      hard: [
        'Building a New Administrative Capital east of Cairo.',
        'Ruled by the Muhammad Ali dynasty before becoming a republic.',
        'Modern Bibliotheca Alexandrina honors an ancient library.'
      ]
    },
    hints: [
      'Northeast corner of Africa.',
      'Flag uses red, white, and black with the Eagle of Saladin.'
    ]
  },
  {
    iso: 'CHL',
    name: 'Chile',
    capital: 'Santiago',
    region: 'Americas',
    subregion: 'South America',
    populationMillions: 19,
    areaKm2: 756102,
    currencies: ['Chilean Peso'],
    languages: ['Spanish'],
    clues: {
      easy: [
        'Long, narrow country along the Pacific coast of South America.',
        'Known for the Atacama Desert, one of the driest places on Earth.',
        'Produces acclaimed wines from the Central Valley.'
      ],
      medium: [
        'Governs Easter Island with its moai statues.',
        'The Andes form its entire eastern border.',
        'Capital sits in a basin between mountains and coast.'
      ],
      hard: [
        'Part of the Pacific Ring of Fire with frequent quakes.',
        'ALMA observatory studies the cosmos from high plateaus.',
        'Regions were historically labeled with Roman numerals.'
      ]
    },
    hints: [
      'Borders only Peru, Bolivia, and Argentina.',
      'Flag resembles Texas but symbolizes the Andean sky.'
    ]
  },
  {
    iso: 'KOR',
    name: 'South Korea',
    capital: 'Seoul',
    region: 'Asia',
    subregion: 'East Asia',
    populationMillions: 51,
    areaKm2: 100210,
    currencies: ['Won'],
    languages: ['Korean'],
    clues: {
      easy: [
        'Birthplace of K-pop and brands like Samsung and Hyundai.',
        'Capital city is split by the Han River.',
        'Shares the Demilitarized Zone with its northern neighbor.'
      ],
      medium: [
        'Hangul alphabet was created by King Sejong.',
        'Home to tech forward city of Songdo built on reclaimed land.',
        'Cuisine features kimchi, bibimbap, and barbecue.'
      ],
      hard: [
        'Rapid transit networks connect Seoul and Busan.',
        'Education fervor is nicknamed hagwon culture.',
        'Bordered by the Yellow Sea and the Sea of Japan (East Sea).'
      ]
    },
    hints: [
      'Look to the southern half of the Korean Peninsula.',
      'Flag shows a taegeuk circle with four trigrams.'
    ]
  },
  {
    iso: 'MAR',
    name: 'Morocco',
    capital: 'Rabat',
    region: 'Africa',
    subregion: 'Northern Africa',
    populationMillions: 37,
    areaKm2: 446550,
    currencies: ['Moroccan Dirham'],
    languages: ['Arabic', 'Berber'],
    clues: {
      easy: [
        'North African kingdom known for Marrakech and Casablanca.',
        'Atlas Mountains run across this country.',
        'Famous for mint tea, tagine, and vibrant souks.'
      ],
      medium: [
        'Borders both the Atlantic Ocean and the Mediterranean Sea.',
        'Chefchaouen is the iconic blue city in the Rif Mountains.',
        'Western Sahara is largely administered by this country.'
      ],
      hard: [
        'Historic Al Quaraouiyine university is located in Fez.',
        'Port of Tangier overlooks the Strait of Gibraltar.',
        'Traditional music includes gnawa and andalusian styles.'
      ]
    },
    hints: [
      'Only African nation on both sides of the Strait of Gibraltar.',
      'Flag is red with a green five pointed star.'
    ]
  },
  {
    iso: 'NZL',
    name: 'New Zealand',
    capital: 'Wellington',
    region: 'Oceania',
    subregion: 'Australia and New Zealand',
    populationMillions: 5.1,
    areaKm2: 268021,
    currencies: ['New Zealand Dollar'],
    languages: ['English', 'Maori'],
    clues: {
      easy: [
        'Island nation split between North and South Islands.',
        'Home to the All Blacks rugby team.',
        'Landscapes featured in the Lord of the Rings films.'
      ],
      medium: [
        'Rotorua steams with geothermal activity.',
        'Capital is windy Wellington on Cook Strait.',
        'Country has more sheep than people.'
      ],
      hard: [
        'Maori name is Aotearoa meaning Land of the Long White Cloud.',
        'Waitangi Treaty grounds mark its founding agreement.',
        'Hosts Dark Sky reserves like Aoraki Mackenzie.'
      ]
    },
    hints: [
      'Located southeast of Australia.',
      'Flag features the Union Jack plus four red stars.'
    ]
  },
  {
    iso: 'PER',
    name: 'Peru',
    capital: 'Lima',
    region: 'Americas',
    subregion: 'South America',
    populationMillions: 34,
    areaKm2: 1285216,
    currencies: ['Sol'],
    languages: ['Spanish', 'Quechua', 'Aymara'],
    clues: {
      easy: [
        'Home to Machu Picchu in the Andes.',
        'Cuisine features ceviche and quinoa.',
        'Contains the Amazon River headwaters.'
      ],
      medium: [
        'Capital Lima sits on the Pacific coast.',
        'Divided into coastal desert, highlands, and rainforest zones.',
        'Humboldt Current shapes its marine climate.'
      ],
      hard: [
        'Nazca Lines are etched into its southern desert.',
        'Former heart of the Inca Empire.',
        'Shares Lake Titicaca with Bolivia.'
      ]
    },
    hints: [
      'South American nation west of Brazil.',
      'Flag is vertical red white red with a coat of arms.'
    ]
  },
  {
    iso: 'SWE',
    name: 'Sweden',
    capital: 'Stockholm',
    region: 'Europe',
    subregion: 'Northern Europe',
    populationMillions: 10.5,
    areaKm2: 450295,
    currencies: ['Swedish Krona'],
    languages: ['Swedish'],
    clues: {
      easy: [
        'Scandinavian country known for IKEA and Volvo.',
        'Capital is built on 14 islands.',
        'Hosts the Nobel Prize ceremonies.'
      ],
      medium: [
        'Extends into the Arctic Circle in Lapland.',
        'Shares the Torne River border with Finland.',
        'Long tradition of social welfare policies.'
      ],
      hard: [
        'Island of Gotland sits in the Baltic Sea.',
        'Vasa Museum preserves a 17th century warship.',
        'Parliament meets in the Riksdagshuset on Helgeandsholmen.'
      ]
    },
    hints: [
      'Blue and yellow cross flag.',
      'Think fika culture and ABBA.'
    ]
  },
  {
    iso: 'USA',
    name: 'United States',
    capital: 'Washington, D.C.',
    region: 'Americas',
    subregion: 'North America',
    populationMillions: 333,
    areaKm2: 9833517,
    currencies: ['US Dollar'],
    languages: ['English (de facto)'],
    clues: {
      easy: [
        'Composed of 50 states spanning two oceans.',
        'Home to Silicon Valley, Hollywood, and Wall Street.',
        'Flag is known as the Stars and Stripes.'
      ],
      medium: [
        'Contains the Grand Canyon and Yellowstone.',
        'Hosts the world\'s largest economy by GDP.',
        'Constitution begins with We the People.'
      ],
      hard: [
        'Louisiana Purchase doubled its size in 1803.',
        'Interstate Highway System spans over 75,000 km.',
        'National laboratories like Los Alamos and Oak Ridge pioneered research.'
      ]
    },
    hints: [
      'Borders Canada to the north and Mexico to the south.',
      'Capital is a federal district, not within any state.'
    ]
  },
  {
    iso: 'GBR',
    name: 'United Kingdom',
    capital: 'London',
    region: 'Europe',
    subregion: 'Northern Europe',
    populationMillions: 67,
    areaKm2: 243610,
    currencies: ['Pound Sterling'],
    languages: ['English', 'Welsh', 'Scottish Gaelic', 'Irish'],
    clues: {
      easy: [
        'Made up of England, Scotland, Wales, and Northern Ireland.',
        'Monarch resides in Buckingham Palace when in London.',
        'Home of Big Ben, the BBC, and the Thames river.'
      ],
      medium: [
        'Birthplace of the Industrial Revolution.',
        'Universities of Oxford and Cambridge date back centuries.',
        'Parliament meets at Westminster.'
      ],
      hard: [
        'The Union Jack combines three crosses.',
        'Has devolved administrations in Edinburgh, Cardiff, and Belfast.',
        'Underground rail network opened in 1863, the world\'s first.'
      ]
    },
    hints: [
      'Island nation just off mainland Europe.',
      'Frequently referred to simply as the UK.'
    ]
  },
  {
    iso: 'DEU',
    name: 'Germany',
    capital: 'Berlin',
    region: 'Europe',
    subregion: 'Western Europe',
    populationMillions: 84,
    areaKm2: 357022,
    currencies: ['Euro'],
    languages: ['German'],
    clues: {
      easy: [
        'Famous for Oktoberfest, autobahns, and engineering.',
        'Hosts the Rhine and Danube rivers.',
        'Flag has black, red, and gold stripes.'
      ],
      medium: [
        'Economy is Europe\'s largest by GDP.',
        'Reunified in 1990 after decades of division.',
        'Car makers like BMW, Mercedes, and Volkswagen hail from here.'
      ],
      hard: [
        'Bundestag meets in the Reichstag building.',
        'Black Forest inspired Brothers Grimm tales.',
        'Shares borders with nine different countries.'
      ]
    },
    hints: [
      'Heart of Central Europe.',
      'Known locally as Deutschland.'
    ]
  },
  {
    iso: 'ITA',
    name: 'Italy',
    capital: 'Rome',
    region: 'Europe',
    subregion: 'Southern Europe',
    populationMillions: 60,
    areaKm2: 301340,
    currencies: ['Euro'],
    languages: ['Italian'],
    clues: {
      easy: [
        'Boot shaped peninsula in the Mediterranean.',
        'Birthplace of pizza, pasta, and espresso.',
        'Home to ancient ruins like the Colosseum.'
      ],
      medium: [
        'Hosts independent microstates of Vatican City and San Marino.',
        'Northern region includes the Alps and Lake Como.',
        'Design powerhouses like Ferrari, Armani, and Prada live here.'
      ],
      hard: [
        'Operates provinces within 20 regions.',
        'The Apennine Mountains run its spine.',
        'Renaissance art flourished in Florence and Venice.'
      ]
    },
    hints: [
      'Surrounded by seas on three sides.',
      'National flag is green, white, and red vertical bands.'
    ]
  },
  {
    iso: 'ESP',
    name: 'Spain',
    capital: 'Madrid',
    region: 'Europe',
    subregion: 'Southern Europe',
    populationMillions: 48,
    areaKm2: 505990,
    currencies: ['Euro'],
    languages: ['Spanish', 'Catalan', 'Galician', 'Basque'],
    clues: {
      easy: [
        'Known for flamenco, tapas, and La Tomatina festival.',
        'Hosts the cities of Madrid, Barcelona, and Seville.',
        'Shares the Iberian Peninsula with one neighbor.'
      ],
      medium: [
        'Has autonomous communities including Catalonia and Andalusia.',
        'Controls the Balearic and Canary Islands.',
        'Built Europe\'s first high speed rail line outside France.'
      ],
      hard: [
        'The reconquista concluded here in 1492.',
        'Architect Antoni Gaudí shaped Barcelona\'s skyline.',
        'Owns enclaves Ceuta and Melilla in North Africa.'
      ]
    },
    hints: [
      'Capital sits on the Manzanares River.',
      'Flag is red-yellow-red with the Pillars of Hercules crest.'
    ]
  },
  {
    iso: 'CHN',
    name: 'China',
    capital: 'Beijing',
    region: 'Asia',
    subregion: 'Eastern Asia',
    populationMillions: 1410,
    areaKm2: 9596961,
    currencies: ['Renminbi (Yuan)'],
    languages: ['Mandarin Chinese', 'numerous regional languages'],
    clues: {
      easy: [
        'Most populous nation on Earth.',
        'Great Wall winds across its northern mountains.',
        'Birthplace of paper, gunpowder, and compass.'
      ],
      medium: [
        'Holds autonomous regions like Tibet and Xinjiang.',
        'Yangtze and Yellow rivers sustain huge populations.',
        'Shanghai towers over the Yangtze River delta.'
      ],
      hard: [
        'Operates Special Administrative Regions such as Hong Kong.',
        'Massive Belt and Road Initiative finances infrastructure abroad.',
        'Dynastic rule ended with the Xinhai Revolution in 1911.'
      ]
    },
    hints: [
      'Covers much of East Asia.',
      'Flag is red with five yellow stars.'
    ]
  },
  {
    iso: 'RUS',
    name: 'Russia',
    capital: 'Moscow',
    region: 'Europe/Asia',
    subregion: 'Eastern Europe / Northern Asia',
    populationMillions: 146,
    areaKm2: 17098242,
    currencies: ['Russian Ruble'],
    languages: ['Russian'],
    clues: {
      easy: [
        'Largest country in the world by area.',
        'Trans-Siberian Railway crosses it from Moscow to Vladivostok.',
        'Known for onion domes like Saint Basil\'s Cathedral.'
      ],
      medium: [
        'Spans eleven time zones.',
        'Lake Baikal holds the most freshwater by volume.',
        'Cosmodrome at Baikonur launched the first human into space.'
      ],
      hard: [
        'Name changed from USSR in 1991.',
        'Federal subjects include oblasts, krais, and republics.',
        'Capital moved from Saint Petersburg to Moscow in 1918.'
      ]
    },
    hints: [
      'Extends from Europe across Siberia to the Pacific.',
      'Flag has horizontal white, blue, and red stripes.'
    ]
  },
  {
    iso: 'MEX',
    name: 'Mexico',
    capital: 'Mexico City',
    region: 'Americas',
    subregion: 'North America',
    populationMillions: 128,
    areaKm2: 1964375,
    currencies: ['Mexican Peso'],
    languages: ['Spanish', 'dozens of indigenous languages'],
    clues: {
      easy: [
        'Birthplace of tacos, mariachi, and Frida Kahlo.',
        'Capital built on the former Aztec city of Tenochtitlan.',
        'Chichen Itza pyramids stand on the Yucatan Peninsula.'
      ],
      medium: [
        'Borders the United States to the north and Guatemala/Belize to the south.',
        'Features copper canyons deeper than the Grand Canyon.',
        'Hosts both Pacific and Gulf of Mexico coastlines.'
      ],
      hard: [
        'Divided into 31 states plus a federal entity.',
        'Day of the Dead blends indigenous and Catholic traditions.',
        'Oil company PEMEX was nationalized in 1938.'
      ]
    },
    hints: [
      'North American country with a tricolor flag and eagle eating a snake.',
      'Name of the capital matches the country.'
    ]
  },
  {
    iso: 'ARG',
    name: 'Argentina',
    capital: 'Buenos Aires',
    region: 'Americas',
    subregion: 'South America',
    populationMillions: 46,
    areaKm2: 2780400,
    currencies: ['Argentine Peso'],
    languages: ['Spanish'],
    clues: {
      easy: [
        'Second largest country in South America.',
        'Famous for tango, Patagonia, and Malbec wine.',
        'Home to football legends like Maradona and Messi.'
      ],
      medium: [
        'Shares Iguazu Falls with Brazil.',
        'Capital sits along the Rio de la Plata estuary.',
        'Has fertile pampas plains for cattle and soy.'
      ],
      hard: [
        'Claims sovereignty over the Falkland Islands.',
        'Operates provinces grouped into regions like Cuyo and Patagonia.',
        'Hosts the southernmost city, Ushuaia.'
      ]
    },
    hints: [
      'Southern cone nation stretching to Antarctica claims.',
      'Flag features a sun with a face.'
    ]
  },
  {
    iso: 'ZAF',
    name: 'South Africa',
    capital: 'Pretoria (administrative)',
    region: 'Africa',
    subregion: 'Southern Africa',
    populationMillions: 60,
    areaKm2: 1221037,
    currencies: ['South African Rand'],
    languages: ['11 official languages including Zulu, Xhosa, Afrikaans, English'],
    clues: {
      easy: [
        'Country at the southern tip of Africa.',
        'Has three capital cities serving different branches.',
        'Hosted the 2010 FIFA World Cup.'
      ],
      medium: [
        'Table Mountain overlooks Cape Town harbor.',
        'Kruger National Park protects iconic wildlife.',
        'Constitutional Court sits in Johannesburg.'
      ],
      hard: [
        'Underwent transition from apartheid in the 1990s.',
        'Flag introduced in 1994 with a unique Y pattern.',
        'Naval base at Simon\'s Town guards the Cape Sea Route.'
      ]
    },
    hints: [
      'Only country with three separate capitals.',
      'Nickname is the Rainbow Nation.'
    ]
  },
  {
    iso: 'NGA',
    name: 'Nigeria',
    capital: 'Abuja',
    region: 'Africa',
    subregion: 'Western Africa',
    populationMillions: 216,
    areaKm2: 923768,
    currencies: ['Naira'],
    languages: ['English', 'Hausa', 'Yoruba', 'Igbo', 'hundreds more'],
    clues: {
      easy: [
        'Most populous country in Africa.',
        'Nollywood film industry is based here.',
        'Lagos is a megacity on the Gulf of Guinea.'
      ],
      medium: [
        'River Niger and Benue meet near the capital.',
        'Economy relies on oil fields in the Niger Delta.',
        'Has 36 states plus the Federal Capital Territory.'
      ],
      hard: [
        'Gained independence from Britain in 1960.',
        'Home to ancient Nok terracotta culture.',
        'Jollof rice debate often centers on this nation.'
      ]
    },
    hints: [
      'West African powerhouse nicknamed the Giant of Africa.',
      'Flag is green-white-green vertical stripes.'
    ]
  },
  {
    iso: 'SAU',
    name: 'Saudi Arabia',
    capital: 'Riyadh',
    region: 'Asia',
    subregion: 'Western Asia',
    populationMillions: 36,
    areaKm2: 2149690,
    currencies: ['Saudi Riyal'],
    languages: ['Arabic'],
    clues: {
      easy: [
        'Covers most of the Arabian Peninsula.',
        'Custodian of Islam\'s holiest cities, Mecca and Medina.',
        'World\'s largest proven oil reserves under its sands.'
      ],
      medium: [
        'Vision 2030 aims to diversify its economy.',
        'Hosts the futuristic NEOM megaproject.',
        'Desert climate dominated by the Rub al Khali (Empty Quarter).'
      ],
      hard: [
        'Kingdom founded by Ibn Saud in 1932.',
        'Operates a Shura Council as advisory body.',
        'National airline is Saudia based in Jeddah.'
      ]
    },
    hints: [
      'Located between the Red Sea and the Persian Gulf.',
      'Flag bears the shahada and a sword.'
    ]
  },
  {
    iso: 'IDN',
    name: 'Indonesia',
    capital: 'Jakarta',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    populationMillions: 276,
    areaKm2: 1904569,
    currencies: ['Rupiah'],
    languages: ['Indonesian', 'hundreds of local languages'],
    clues: {
      easy: [
        'World\'s largest archipelago nation with over 17,000 islands.',
        'Home to Bali beaches and Komodo dragons.',
        'Sits on the Pacific Ring of Fire with many volcanoes.'
      ],
      medium: [
        'Capital is relocating to Nusantara on Borneo.',
        'Major islands include Java, Sumatra, Kalimantan, Sulawesi, Papua.',
        'Largest Muslim population globally lives here.'
      ],
      hard: [
        'Borobudur is the world\'s biggest Buddhist temple.',
        'Spice trade through the Moluccas shaped colonial history.',
        'National motto Bhinneka Tunggal Ika means Unity in Diversity.'
      ]
    },
    hints: [
      'Straddles the equator between the Indian and Pacific Oceans.',
      'Flag is simple red over white.'
    ]
  },
  {
    iso: 'THA',
    name: 'Thailand',
    capital: 'Bangkok',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    populationMillions: 70,
    areaKm2: 513120,
    currencies: ['Baht'],
    languages: ['Thai'],
    clues: {
      easy: [
        'Known for tropical beaches, ornate temples, and street food.',
        'Capital city features the Chao Phraya River and vibrant markets.',
        'Formerly called Siam.'
      ],
      medium: [
        'Only Southeast Asian nation never colonized by Europe.',
        'Hosts the ancient capital Ayutthaya ruins.',
        'Loy Krathong and Songkran festivals celebrate water and lights.'
      ],
      hard: [
        'Northern region features misty mountains around Chiang Mai.',
        'Monarchy is revered and protected by strict laws.',
        'Rail line to Nong Khai connects to Laos via the Friendship Bridge.'
      ]
    },
    hints: [
      'Shaped like an elephant head on the map.',
      'Flag has red-white-blue stripes with blue twice as thick.'
    ]
  },
  {
    iso: 'TUR',
    name: 'Turkey',
    capital: 'Ankara',
    region: 'Asia/Europe',
    subregion: 'Western Asia / Southern Europe',
    populationMillions: 86,
    areaKm2: 783562,
    currencies: ['Turkish Lira'],
    languages: ['Turkish'],
    clues: {
      easy: [
        'Bridges Europe and Asia across the Bosporus.',
        'Istanbul was historically known as Constantinople.',
        'Famous for baklava, kebabs, and Turkish delight.'
      ],
      medium: [
        'Cappadocia\'s fairy chimneys host hot air balloons.',
        'Controls the Dardanelles and Bosporus straits.',
        'Home to ancient ruins like Ephesus and Gobekli Tepe.'
      ],
      hard: [
        'Republic founded by Mustafa Kemal Atatürk in 1923.',
        'Uses provinces grouped into seven geographical regions.',
        'Mount Ararat is the country\'s highest peak.'
      ]
    },
    hints: [
      'Only nation spanning both Thrace and Anatolia.',
      'Flag features a white star and crescent on red.'
    ]
  },
  {
    iso: 'GRC',
    name: 'Greece',
    capital: 'Athens',
    region: 'Europe',
    subregion: 'Southern Europe',
    populationMillions: 10.3,
    areaKm2: 131957,
    currencies: ['Euro'],
    languages: ['Greek'],
    clues: {
      easy: [
        'Birthplace of democracy and the Olympic Games.',
        'Parthenon overlooks its capital city.',
        'Islands like Santorini and Crete attract millions.'
      ],
      medium: [
        'Uses the Hellenic Republic as its official name.',
        'Mount Olympus was home to the ancient gods.',
        'Has thousands of islands scattered across the Aegean and Ionian Seas.'
      ],
      hard: [
        'Underwent a financial crisis in the 2010s requiring EU assistance.',
        'Produces feta cheese with protected origin status.',
        'Blue and white cross flag represents sea and faith.'
      ]
    },
    hints: [
      'Southern tip of the Balkans.',
      'Language uses its own alphabet that scientists borrow for math symbols.'
    ]
  },
  {
    iso: 'CHE',
    name: 'Switzerland',
    capital: 'Bern',
    region: 'Europe',
    subregion: 'Western Europe',
    populationMillions: 8.8,
    areaKm2: 41284,
    currencies: ['Swiss Franc'],
    languages: ['German', 'French', 'Italian', 'Romansh'],
    clues: {
      easy: [
        'Renowned for chocolate, watches, and alpine scenery.',
        'Neutral state hosting many international organizations.',
        'Flag is a white cross on a red square.'
      ],
      medium: [
        'Operates a system of direct democracy with frequent referendums.',
        'Matterhorn peaks straddle its border with Italy.',
        'Home to CERN and the World Economic Forum meetings.'
      ],
      hard: [
        'Divided into 26 cantons with strong autonomy.',
        'Four official languages share equal status.',
        'Not part of the European Union despite being surrounded by EU states.'
      ]
    },
    hints: [
      'Landlocked between Germany, France, Italy, Austria, and Liechtenstein.',
      'Nickname is the Swiss Confederation.'
    ]
  },
  {
    iso: 'PRT',
    name: 'Portugal',
    capital: 'Lisbon',
    region: 'Europe',
    subregion: 'Southern Europe',
    populationMillions: 10.4,
    areaKm2: 92090,
    currencies: ['Euro'],
    languages: ['Portuguese'],
    clues: {
      easy: [
        'Shares the Iberian Peninsula with only one neighbor.',
        'Explorer Vasco da Gama sailed under its flag.',
        'Famous for fado music, pasteis de nata, and azulejo tiles.'
      ],
      medium: [
        'Controls Atlantic archipelagos of Madeira and the Azores.',
        'Lisbon\'s trams climb steep hills along the Tagus River.',
        'Port wine originates from the Douro Valley.'
      ],
      hard: [
        'Carnation Revolution in 1974 restored democracy.',
        'Manueline architecture blends maritime motifs.',
        'Oldest alliance treaty still in force is with England (1386).'
      ]
    },
    hints: [
      'Westernmost mainland country of continental Europe.',
      'Flag combines green and red with a navigational sphere.'
    ]
  },
  {
    iso: 'NLD',
    name: 'Netherlands',
    capital: 'Amsterdam',
    region: 'Europe',
    subregion: 'Western Europe',
    populationMillions: 17.5,
    areaKm2: 41543,
    currencies: ['Euro'],
    languages: ['Dutch', 'Frisian'],
    clues: {
      easy: [
        'Known for windmills, tulips, and canals.',
        'Large parts of the country lie below sea level.',
        'Bicycles outnumber people in many cities.'
      ],
      medium: [
        'Government sits in The Hague while Amsterdam is capital.',
        'Built the Delta Works to keep out the North Sea.',
        'Famous painters include Rembrandt and Van Gogh.'
      ],
      hard: [
        'Constitutional monarchy officially called the Kingdom of the Netherlands.',
        'Provincial structure includes North and South Holland.',
        'Hosts the International Court of Justice.'
      ]
    },
    hints: [
      'Low Countries along the North Sea coast.',
      'Flag has horizontal red, white, blue stripes.'
    ]
  },
  {
    iso: 'COL',
    name: 'Colombia',
    capital: 'Bogotá',
    region: 'Americas',
    subregion: 'South America',
    populationMillions: 52,
    areaKm2: 1141748,
    currencies: ['Colombian Peso'],
    languages: ['Spanish'],
    clues: {
      easy: [
        'Only South American country with Caribbean and Pacific coastlines.',
        'Produces world famous coffee from Andean slopes.',
        'Birthplace of singer Shakira and writer Gabriel García Márquez.'
      ],
      medium: [
        'Capital sits on a high plateau called the Sabana.',
        'Cartagena\'s walled city is a UNESCO site.',
        'Has biodiverse Amazon, Andes, Llanos, and coasts.'
      ],
      hard: [
        'Operates departments similar to states.',
        'Magdalena River is a key transport artery.',
        'Peace accords with FARC were signed in 2016.'
      ]
    },
    hints: [
      'Northwest corner of South America.',
      'Flag colors are yellow, blue, red with uneven stripes.'
    ]
  },
  {
    iso: 'ETH',
    name: 'Ethiopia',
    capital: 'Addis Ababa',
    region: 'Africa',
    subregion: 'Eastern Africa',
    populationMillions: 123,
    areaKm2: 1104300,
    currencies: ['Birr'],
    languages: ['Amharic', 'Oromo', 'Tigrinya', 'many more'],
    clues: {
      easy: [
        'Landlocked nation known for coffee origin legends.',
        'Calendar is seven to eight years behind the Gregorian calendar.',
        'Never colonized apart from a short Italian occupation.'
      ],
      medium: [
        'Capital hosts the African Union headquarters.',
        'Blue Nile flows from Lake Tana here.',
        'Lalibela has rock hewn churches carved into the ground.'
      ],
      hard: [
        'Adopts a federal system of ethnically based regions.',
        'Rift Valley cuts through its highlands.',
        'Reggae colors of green, yellow, red trace back to this flag.'
      ]
    },
    hints: [
      'Horn of Africa highlands.',
      'Ancient empire once ruled by Emperor Haile Selassie.'
    ]
  },
  {
    iso: 'POL',
    name: 'Poland',
    capital: 'Warsaw',
    region: 'Europe',
    subregion: 'Central Europe',
    populationMillions: 38,
    areaKm2: 312679,
    currencies: ['Zloty'],
    languages: ['Polish'],
    clues: {
      easy: [
        'Central European country rebuilt after World War II.',
        'Home to Krakow, Gdansk, and the Tatra Mountains.',
        'Flag is white over red.'
      ],
      medium: [
        'Shared solidarity movement led by Lech Walesa.',
        'Salt mine of Wieliczka descends hundreds of meters underground.',
        'Bialowieza Forest shelters European bison.'
      ],
      hard: [
        'Partitions erased it from maps for 123 years.',
        'Constitution of May 3, 1791 was Europe\'s first modern charter.',
        'Vistula River runs through its capital.'
      ]
    },
    hints: [
      'Bridges Germany and Belarus.',
      'Name locally is Polska.'
    ]
  },
  {
    iso: 'UKR',
    name: 'Ukraine',
    capital: 'Kyiv',
    region: 'Europe',
    subregion: 'Eastern Europe',
    populationMillions: 37,
    areaKm2: 603550,
    currencies: ['Hryvnia'],
    languages: ['Ukrainian'],
    clues: {
      easy: [
        'Second largest country in Europe by area (excluding Russia).',
        'Breadbasket known for sunflower and wheat fields.',
        'Shares shores with the Black Sea and Sea of Azov.'
      ],
      medium: [
        'Capital features the golden domes of Saint Sophia Cathedral.',
        'Carpathian Mountains sweep across the west.',
        'Chernobyl Exclusion Zone lies north of Kyiv.'
      ],
      hard: [
        'Gained independence in 1991 after the Soviet collapse.',
        'Home to vibrant IT outsourcing hubs in Lviv and Kharkiv.',
        'National poet Taras Shevchenko is revered as a cultural icon.'
      ]
    },
    hints: [
      'Flag is blue over yellow representing sky and wheat.',
      'Borders Poland, Slovakia, Hungary, Romania, Moldova, Belarus, and Russia.'
    ]
  },
  {
    iso: 'NOR',
    name: 'Norway',
    capital: 'Oslo',
    region: 'Europe',
    subregion: 'Northern Europe',
    populationMillions: 5.4,
    areaKm2: 385207,
    currencies: ['Norwegian Krone'],
    languages: ['Norwegian Bokmal', 'Nynorsk', 'Sami'],
    clues: {
      easy: [
        'Fjords carve deep inlets along its lengthy coastline.',
        'Wealth stems from North Sea oil and gas.',
        'Skiing and winter sports are national passions.'
      ],
      medium: [
        'Owns the remote Svalbard archipelago.',
        'Electric vehicles dominate its car market due to incentives.',
        'Hurtigruten coastal ferry connects Arctic communities.'
      ],
      hard: [
        'Parliament is called the Storting.',
        'Has one of the world\'s largest sovereign wealth funds.',
        'Government seed vault stores global crops near Longyearbyen.'
      ]
    },
    hints: [
      'Western Scandinavian nation bordering Sweden, Finland, and Russia.',
      'Flag is a blue cross outlined in white on red.'
    ]
  },
  {
    iso: 'ARE',
    name: 'United Arab Emirates',
    capital: 'Abu Dhabi',
    region: 'Asia',
    subregion: 'Western Asia',
    populationMillions: 9.4,
    areaKm2: 83600,
    currencies: ['UAE Dirham'],
    languages: ['Arabic'],
    clues: {
      easy: [
        'Federation on the Arabian Peninsula famed for futuristic skylines.',
        'Dubai hosts the world’s tallest building.',
        'Sits along the Persian Gulf with vast desert dunes.'
      ],
      medium: [
        'Composed of seven emirates including Sharjah and Ajman.',
        'Palm-shaped artificial islands extend its coastline.',
        'Strategically near the Strait of Hormuz.'
      ],
      hard: [
        'Economy shifted from pearl diving to aviation and finance.',
        'National airline hubs include Emirates and Etihad.',
        'Hosts Masdar, a planned low-carbon city experiment.'
      ]
    },
    hints: [
      'Look between Oman and Saudi Arabia for this federation.',
      'Uses the dirham and has a falcon on some coins.'
    ]
  },
  {
    iso: 'ISR',
    name: 'Israel',
    capital: 'Jerusalem',
    region: 'Asia',
    subregion: 'Western Asia',
    populationMillions: 9.7,
    areaKm2: 22072,
    currencies: ['New Shekel'],
    languages: ['Hebrew', 'Arabic'],
    clues: {
      easy: [
        'Home to the Dead Sea and Mediterranean beaches.',
        'Tel Aviv is a global tech hub nicknamed the Startup Nation.',
        'Holds significant sites for Judaism, Christianity, and Islam.'
      ],
      medium: [
        'Borders Lebanon, Syria, Jordan, and Egypt.',
        'The Negev Desert covers much of its south.',
        'High-speed rail now links Tel Aviv and Jerusalem.'
      ],
      hard: [
        'Parliament is called the Knesset.',
        'National airline flag features the Star of David.',
        'Modern state declared independence in 1948.'
      ]
    },
    hints: [
      'Sits on the eastern Mediterranean coast.',
      'Official languages are Hebrew and Arabic.'
    ]
  },
  {
    iso: 'PAK',
    name: 'Pakistan',
    capital: 'Islamabad',
    region: 'Asia',
    subregion: 'Southern Asia',
    populationMillions: 241,
    areaKm2: 881913,
    currencies: ['Pakistani Rupee'],
    languages: ['Urdu', 'English'],
    clues: {
      easy: [
        'Houses the world’s second highest peak, K2.',
        'Cricket is the most popular sport.',
        'Karachi and Lahore are mega cities.'
      ],
      medium: [
        'Formed during the 1947 partition of British India.',
        'The Indus River flows its length into the Arabian Sea.',
        'Hosts ancient ruins of Mohenjo-daro.'
      ],
      hard: [
        'National poet Allama Iqbal imagined its creation.',
        'Gwadar deep-sea port anchors a key trade corridor.',
        'Traditional truck art decorates freight vehicles.'
      ]
    },
    hints: [
      'Borders Afghanistan, India, Iran, and China.',
      'Flag is green with a white crescent and star.'
    ]
  },
  {
    iso: 'VNM',
    name: 'Vietnam',
    capital: 'Hanoi',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    populationMillions: 98,
    areaKm2: 331212,
    currencies: ['Vietnamese Dong'],
    languages: ['Vietnamese'],
    clues: {
      easy: [
        'S-shaped country along the South China Sea.',
        'Famous for pho, banh mi, and coffee with condensed milk.',
        'Motorbikes swarm cities like Ho Chi Minh City.'
      ],
      medium: [
        'The Mekong Delta is its rice bowl.',
        'Hoi An preserves lantern-lit Old Town charm.',
        'UNESCO site Ha Long Bay features limestone karsts.'
      ],
      hard: [
        'Adopted the Doi Moi economic reforms in 1986.',
        'Uses a Latin-based script with tonal markers.',
        'Historical imperial capital is Hue.'
      ]
    },
    hints: [
      'Shares land borders with China, Laos, and Cambodia.',
      'Flag is red with a single yellow star.'
    ]
  },
  {
    iso: 'PHL',
    name: 'Philippines',
    capital: 'Manila',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    populationMillions: 113,
    areaKm2: 300000,
    currencies: ['Philippine Peso'],
    languages: ['Filipino', 'English'],
    clues: {
      easy: [
        'Archipelago of over 7,000 islands in the Pacific.',
        'Jeepneys serve as colorful public transport.',
        'World-famous beaches include Boracay and Palawan.'
      ],
      medium: [
        'Named after a Spanish king.',
        'Taal and Mayon are among its active volcanoes.',
        'Hosts vibrant festivals like Sinulog and Ati-Atihan.'
      ],
      hard: [
        'Boxing champion Manny Pacquiao hails from here.',
        'BPO industry is a major economic pillar.',
        'The EDSA People Power Revolution sparked global headlines.'
      ]
    },
    hints: [
      'Southeast Asian nation once governed by Spain and the United States.',
      'Two official languages: Filipino and English.'
    ]
  },
  {
    iso: 'MYS',
    name: 'Malaysia',
    capital: 'Kuala Lumpur',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    populationMillions: 33,
    areaKm2: 330803,
    currencies: ['Malaysian Ringgit'],
    languages: ['Malay'],
    clues: {
      easy: [
        'Split between a peninsular region and Borneo island territory.',
        'Petronas Twin Towers dominate its capital skyline.',
        'Cuisine blends Malay, Chinese, and Indian influences.'
      ],
      medium: [
        'Shares Borneo with Brunei and Indonesia.',
        'Cameron Highlands are famed for tea plantations.',
        'National car brands include Proton and Perodua.'
      ],
      hard: [
        'Formerly known as Malaya before 1963 federation.',
        'Mount Kinabalu rises in Sabah.',
        'Hosts the Strait of Malacca, a vital shipping lane.'
      ]
    },
    hints: [
      'Look south of Thailand and north of Singapore.',
      'Ringgit is the local currency.'
    ]
  },
  {
    iso: 'FIN',
    name: 'Finland',
    capital: 'Helsinki',
    region: 'Europe',
    subregion: 'Northern Europe',
    populationMillions: 5.6,
    areaKm2: 338424,
    currencies: ['Euro'],
    languages: ['Finnish', 'Swedish'],
    clues: {
      easy: [
        'Land of a thousand lakes and the midnight sun.',
        'Home of saunas and Santa’s Lapland village.',
        'Produces famous mobile phones and rubber boots.'
      ],
      medium: [
        'Neighboring Sweden, Norway, and Russia.',
        'Design heroes include Alvar Aalto and Marimekko.',
        'Education system often tops global rankings.'
      ],
      hard: [
        'Declared independence from Russia in 1917.',
        'National epic is the Kalevala.',
        'Uses a unique Finno-Ugric language unrelated to most of Europe.'
      ]
    },
    hints: [
      'Northern European state with Helsinki on the Baltic Sea.',
      'Eurozone member known for clean tech and saunas.'
    ]
  },
  {
    iso: 'DNK',
    name: 'Denmark',
    capital: 'Copenhagen',
    region: 'Europe',
    subregion: 'Northern Europe',
    populationMillions: 5.9,
    areaKm2: 43094,
    currencies: ['Danish Krone'],
    languages: ['Danish'],
    clues: {
      easy: [
        'Famous for hygge culture and cycling cities.',
        'Birthplace of LEGO bricks.',
        'Capital is linked by bridge to Sweden.'
      ],
      medium: [
        'Queen Margrethe II reigns in this constitutional monarchy.',
        'Owns Greenland and the Faroe Islands.',
        'Noma popularized new Nordic cuisine here.'
      ],
      hard: [
        'Won independence from Norway in 1814 union changes.',
        'Parliament is called the Folketing.',
        'Pharmaceutical giants include Novo Nordisk and Lundbeck.'
      ]
    },
    hints: [
      'Jutland peninsula plus many islands in Northern Europe.',
      'Uses the krone and ranks high on happiness indexes.'
    ]
  },
  {
    iso: 'IRN',
    name: 'Iran',
    capital: 'Tehran',
    region: 'Asia',
    subregion: 'Southern Asia',
    populationMillions: 86,
    areaKm2: 1648195,
    currencies: ['Iranian Rial'],
    languages: ['Persian'],
    clues: {
      easy: [
        'Historic Persia with cities like Isfahan and Shiraz.',
        'Houses the ruins of Persepolis.',
        'Sits along the Persian Gulf and Caspian Sea.'
      ],
      medium: [
        'Zagros Mountains run through it.',
        'Known for carpets, saffron, and pistachios.',
        'Nuclear program has drawn global negotiations.'
      ],
      hard: [
        'Persian New Year is celebrated as Nowruz.',
        'Once ruled by the Achaemenid and Safavid dynasties.',
        'Currency is the rial; supreme leader holds ultimate authority.'
      ]
    },
    hints: [
      'Borders Turkey, Iraq, Pakistan, and the Caspian Sea.',
      'Official language is Persian (Farsi).'
    ]
  },
  {
    iso: 'URY',
    name: 'Uruguay',
    capital: 'Montevideo',
    region: 'Americas',
    subregion: 'South America',
    populationMillions: 3.5,
    areaKm2: 176215,
    currencies: ['Uruguayan Peso'],
    languages: ['Spanish'],
    clues: {
      easy: [
        'Small coastal nation sandwiched between Brazil and Argentina.',
        'Known for mate tea and gaucho traditions.',
        'Capital city sits on the Rio de la Plata.'
      ],
      medium: [
        'Punta del Este is a glitzy resort destination.',
        'Ranked highly for democracy and low corruption in the region.',
        'Football legends like Luis Suárez come from here.'
      ],
      hard: [
        'Hosted the first FIFA World Cup in 1930 and won it.',
        'Renewables now power most of its electricity.',
        'Historic quarter of Colonia reflects Portuguese and Spanish roots.'
      ]
    },
    hints: [
      'South American nation south of Brazil.',
      'Shares the Rio de la Plata estuary with Argentina.'
    ]
  },
  {
    iso: 'IRL',
    name: 'Ireland',
    capital: 'Dublin',
    region: 'Europe',
    subregion: 'Northern Europe',
    populationMillions: 5,
    areaKm2: 70273,
    currencies: ['Euro'],
    languages: ['English', 'Irish'],
    clues: {
      easy: [
        'Emerald Isle known for rolling green countryside.',
        'Celebrates St. Patrick’s Day worldwide.',
        'Home of Guinness stout.'
      ],
      medium: [
        'Tech giants base European HQs in its capital.',
        'Shares the island with a UK constituent country.',
        'River Liffey splits its biggest city.'
      ],
      hard: [
        'Gaelic games like hurling and Gaelic football are native sports.',
        'Irish language is co-official though widely anglicized.',
        'Joined the European Economic Community in 1973.'
      ]
    },
    hints: [
      'Island nation west of Great Britain.',
      'Euro-using state with shamrock iconography.'
    ]
  },
  {
    iso: 'BEL',
    name: 'Belgium',
    capital: 'Brussels',
    region: 'Europe',
    subregion: 'Western Europe',
    populationMillions: 11.6,
    areaKm2: 30528,
    currencies: ['Euro'],
    languages: ['Dutch', 'French', 'German'],
    clues: {
      easy: [
        'Renowned for waffles, chocolate, and fries with mayo.',
        'Hosts NATO and EU headquarters.',
        'Divided linguistically between Flemish and Walloon regions.'
      ],
      medium: [
        'Original home of comic heroes like Tintin and the Smurfs.',
        'Port of Antwerp is among Europe’s largest.',
        'Medieval city of Bruges features canals and guild houses.'
      ],
      hard: [
        'Experienced a linguistic compromise forming Brussels-Capital Region.',
        'Battle of Waterloo occurred near its capital.',
        'National soccer team nicknamed the Red Devils.'
      ]
    },
    hints: [
      'Borders France, Germany, Luxembourg, and the Netherlands.',
      'Tri-lingual state in Western Europe using the euro.'
    ]
  },
  {
    iso: 'CZE',
    name: 'Czechia',
    capital: 'Prague',
    region: 'Europe',
    subregion: 'Central Europe',
    populationMillions: 10.7,
    areaKm2: 78867,
    currencies: ['Czech Koruna'],
    languages: ['Czech'],
    clues: {
      easy: [
        'Prague Castle overlooks a city of bridges across the Vltava.',
        'Famed for pilsner beer styles.',
        'Tourists flock to its astronomical clock.'
      ],
      medium: [
        'Split peacefully from Slovakia in 1993.',
        'Landlocked between Germany, Poland, Austria, and Slovakia.',
        'Karlovy Vary is renowned for spa culture.'
      ],
      hard: [
        'Historical lands of Bohemia and Moravia.',
        'Currency retains its koruna outside the eurozone.',
        'Jan Hus and Vaclav Havel are pivotal historical figures.'
      ]
    },
    hints: [
      'Central European state with Gothic and baroque architecture.',
      'Beer consumption per capita is among the world’s highest.'
    ]
  },
  {
    iso: 'HUN',
    name: 'Hungary',
    capital: 'Budapest',
    region: 'Europe',
    subregion: 'Central Europe',
    populationMillions: 9.7,
    areaKm2: 93028,
    currencies: ['Forint'],
    languages: ['Hungarian'],
    clues: {
      easy: [
        'Capital split by the Danube into Buda and Pest.',
        'Goulash and paprika are culinary staples.',
        'Thermal baths are a popular pastime.'
      ],
      medium: [
        'Language is unrelated to its Slavic neighbors.',
        'Lake Balaton is a major freshwater resort.',
        'Member of the Visegrád Group.'
      ],
      hard: [
        'Once part of the Austro-Hungarian Empire.',
        'Invented the Rubik’s Cube.',
        'Forint remains its currency outside the eurozone.'
      ]
    },
    hints: [
      'Landlocked between Slovakia, Austria, Romania, and more.',
      'Budapest’s Chain Bridge is a key icon.'
    ]
  },
  {
    iso: 'ROU',
    name: 'Romania',
    capital: 'Bucharest',
    region: 'Europe',
    subregion: 'Eastern Europe',
    populationMillions: 19.1,
    areaKm2: 238397,
    currencies: ['Romanian Leu'],
    languages: ['Romanian'],
    clues: {
      easy: [
        'Transylvania is home to castles linked with Dracula lore.',
        'Carpathian Mountains arc through this country.',
        'The Danube River empties into the Black Sea here.'
      ],
      medium: [
        'Parliament Palace in its capital is among the world’s largest buildings.',
        'Shares the Black Sea coast with Bulgaria and Ukraine.',
        'Famous gymnast Nadia Comăneci trained here.'
      ],
      hard: [
        'Romance language island amid Slavic neighbors.',
        'United principalities of Wallachia and Moldavia in 1859.',
        'Currency called the leu means “lion.”'
      ]
    },
    hints: [
      'Eastern European state north of Bulgaria.',
      'Speaks a Romance language and uses the leu.'
    ]
  },
  {
    iso: 'KAZ',
    name: 'Kazakhstan',
    capital: 'Astana',
    region: 'Asia',
    subregion: 'Central Asia',
    populationMillions: 19.5,
    areaKm2: 2724900,
    currencies: ['Tenge'],
    languages: ['Kazakh', 'Russian'],
    clues: {
      easy: [
        'World’s largest landlocked country by area.',
        'Baikonur Cosmodrome launched early space missions.',
        'Steppe landscapes dominate its terrain.'
      ],
      medium: [
        'Shares long borders with Russia and China.',
        'Nur-Sultan reverted to its former name Astana in 2022.',
        'Hosts part of the Caspian Sea shoreline.'
      ],
      hard: [
        'Traditional nomadic culture features yurts and horse games.',
        'Significant uranium exporter.',
        'Almaty was the capital before 1997 relocation.'
      ]
    },
    hints: [
      'Central Asian republic and former Soviet state.',
      'Uses the tenge and straddles Europe-Asia borderlands.'
    ]
  },
  {
    iso: 'SGP',
    name: 'Singapore',
    capital: 'Singapore',
    region: 'Asia',
    subregion: 'South-Eastern Asia',
    populationMillions: 5.9,
    areaKm2: 728,
    currencies: ['Singapore Dollar'],
    languages: ['English', 'Malay', 'Mandarin', 'Tamil'],
    clues: {
      easy: [
        'City-state at the tip of the Malay Peninsula.',
        'Known for spotless streets and hawker food centers.',
        'Iconic Merlion statue faces Marina Bay.'
      ],
      medium: [
        'Merged then separated from Malaysia in the 1960s.',
        'Changi Airport is repeatedly ranked world’s best.',
        'Esplanade theatre resembles durian shells.'
      ],
      hard: [
        'Founded as a British trading post by Stamford Raffles.',
        'National pledge mentions building a democratic society.',
        'Maintains compulsory national service for males.'
      ]
    },
    hints: [
      'Tiny Southeast Asian island nation with four official languages.',
      'Currency is the Singapore dollar.'
    ]
  }
];

module.exports = { COUNTRIES };







