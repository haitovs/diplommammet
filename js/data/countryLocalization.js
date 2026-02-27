/**
 * GeoQuest - Country Content Localization
 * Localized gameplay data for country names, capitals, hints, and fact clues.
 */

const RU_CONTINENTS = {
  'Europe': 'Европа',
  'Asia': 'Азия',
  'Africa': 'Африка',
  'North America': 'Северная Америка',
  'South America': 'Южная Америка',
  'Oceania': 'Океания'
};

const TK_CONTINENTS = {
  'Europe': 'Ýewropa',
  'Asia': 'Aziýa',
  'Africa': 'Afrika',
  'North America': 'Demirgazyk Amerika',
  'South America': 'Günorta Amerika',
  'Oceania': 'Okeaniýa'
};

const RU_REGIONS = {
  'Western Europe': 'Западная Европа',
  'Central Europe': 'Центральная Европа',
  'Southern Europe': 'Южная Европа',
  'Northern Europe': 'Северная Европа',
  'East Asia': 'Восточная Азия',
  'South Asia': 'Южная Азия',
  'Southeast Asia': 'Юго-Восточная Азия',
  'Middle East': 'Ближний Восток',
  'North Africa': 'Северная Африка',
  'Southern Africa': 'Южная Африка',
  'East Africa': 'Восточная Африка',
  'West Africa': 'Западная Африка',
  'North America': 'Северная Америка',
  'Central America': 'Центральная Америка',
  'Caribbean': 'Карибский регион',
  'South America': 'Южная Америка',
  'Oceania': 'Океания'
};

const TK_REGIONS = {
  'Western Europe': 'Günbatar Ýewropa',
  'Central Europe': 'Merkezi Ýewropa',
  'Southern Europe': 'Günorta Ýewropa',
  'Northern Europe': 'Demirgazyk Ýewropa',
  'East Asia': 'Gündogar Aziýa',
  'South Asia': 'Günorta Aziýa',
  'Southeast Asia': 'Günorta-Gündogar Aziýa',
  'Middle East': 'Ýakyn Gündogar',
  'North Africa': 'Demirgazyk Afrika',
  'Southern Africa': 'Günorta Afrika',
  'East Africa': 'Gündogar Afrika',
  'West Africa': 'Günbatar Afrika',
  'North America': 'Demirgazyk Amerika',
  'Central America': 'Merkezi Amerika',
  'Caribbean': 'Karib sebiti',
  'South America': 'Günorta Amerika',
  'Oceania': 'Okeaniýa'
};

const COUNTRY_LOCALIZATION_CORE = {
  fr: {
    ruName: 'Франция',
    ruCapital: 'Париж',
    tkName: 'Fransiýa',
    tkCapital: 'Pariž'
  },
  de: {
    ruName: 'Германия',
    ruCapital: 'Берлин',
    tkName: 'Germaniýa',
    tkCapital: 'Berlin'
  },
  it: {
    ruName: 'Италия',
    ruCapital: 'Рим',
    tkName: 'Italiýa',
    tkCapital: 'Rim'
  },
  es: {
    ruName: 'Испания',
    ruCapital: 'Мадрид',
    tkName: 'Ispaniýa',
    tkCapital: 'Madrid'
  },
  gb: {
    ruName: 'Великобритания',
    ruCapital: 'Лондон',
    ruAliases: ['Соединенное Королевство', 'Британия', 'UK', 'U.K.', 'Great Britain'],
    tkName: 'Beýik Britaniýa',
    tkCapital: 'London',
    tkAliases: ['Britaniýa', 'UK', 'U.K.', 'Great Britain']
  },
  pt: {
    ruName: 'Португалия',
    ruCapital: 'Лиссабон',
    tkName: 'Portugaliýa',
    tkCapital: 'Lissabon'
  },
  nl: {
    ruName: 'Нидерланды',
    ruCapital: 'Амстердам',
    ruAliases: ['Голландия', 'Holland'],
    tkName: 'Niderlandlar',
    tkCapital: 'Amsterdam',
    tkAliases: ['Gollandiýa', 'Holland']
  },
  ch: {
    ruName: 'Швейцария',
    ruCapital: 'Берн',
    tkName: 'Şweýsariýa',
    tkCapital: 'Bern'
  },
  no: {
    ruName: 'Норвегия',
    ruCapital: 'Осло',
    tkName: 'Norwegiýa',
    tkCapital: 'Oslo'
  },
  se: {
    ruName: 'Швеция',
    ruCapital: 'Стокгольм',
    tkName: 'Şwesiýa',
    tkCapital: 'Stokgolm'
  },
  pl: {
    ruName: 'Польша',
    ruCapital: 'Варшава',
    tkName: 'Polşa',
    tkCapital: 'Warşawa'
  },
  gr: {
    ruName: 'Греция',
    ruCapital: 'Афины',
    tkName: 'Gresiýa',
    tkCapital: 'Afina'
  },
  at: {
    ruName: 'Австрия',
    ruCapital: 'Вена',
    tkName: 'Awstriýa',
    tkCapital: 'Wena'
  },
  is: {
    ruName: 'Исландия',
    ruCapital: 'Рейкьявик',
    tkName: 'Islandiýa',
    tkCapital: 'Reýkýawik'
  },
  jp: {
    ruName: 'Япония',
    ruCapital: 'Токио',
    tkName: 'Ýaponiýa',
    tkCapital: 'Tokio'
  },
  cn: {
    ruName: 'Китай',
    ruCapital: 'Пекин',
    tkName: 'Hytaý',
    tkCapital: 'Pekin'
  },
  in: {
    ruName: 'Индия',
    ruCapital: 'Нью-Дели',
    tkName: 'Hindistan',
    tkCapital: 'Nýu-Deli'
  },
  kr: {
    ruName: 'Южная Корея',
    ruCapital: 'Сеул',
    ruAliases: ['Корея', 'Республика Корея', 'Korea', 'Republic of Korea'],
    tkName: 'Günorta Koreýa',
    tkCapital: 'Seul',
    tkAliases: ['Koreýa', 'Republic of Korea', 'Korea']
  },
  th: {
    ruName: 'Таиланд',
    ruCapital: 'Бангкок',
    tkName: 'Taýland',
    tkCapital: 'Bangkok'
  },
  vn: {
    ruName: 'Вьетнам',
    ruCapital: 'Ханой',
    tkName: 'Wýetnam',
    tkCapital: 'Hanoý'
  },
  id: {
    ruName: 'Индонезия',
    ruCapital: 'Джакарта',
    tkName: 'Indoneziýa',
    tkCapital: 'Jakarta'
  },
  ph: {
    ruName: 'Филиппины',
    ruCapital: 'Манила',
    tkName: 'Filippinler',
    tkCapital: 'Manila'
  },
  sg: {
    ruName: 'Сингапур',
    ruCapital: 'Сингапур',
    tkName: 'Singapur',
    tkCapital: 'Singapur'
  },
  ae: {
    ruName: 'Объединенные Арабские Эмираты',
    ruCapital: 'Абу-Даби',
    ruAliases: ['ОАЭ', 'Эмираты', 'UAE', 'U.A.E.'],
    tkName: 'Birleşen Arap Emirlikleri',
    tkCapital: 'Abu-Dabi',
    tkAliases: ['BAE', 'Emirlikler', 'UAE', 'U.A.E.']
  },
  eg: {
    ruName: 'Египет',
    ruCapital: 'Каир',
    tkName: 'Müsür',
    tkCapital: 'Kair'
  },
  za: {
    ruName: 'Южная Африка',
    ruCapital: 'Претория',
    ruAliases: ['ЮАР', 'South Africa'],
    tkName: 'Günorta Afrika',
    tkCapital: 'Pretoriýa',
    tkAliases: ['GAR', 'South Africa']
  },
  ke: {
    ruName: 'Кения',
    ruCapital: 'Найроби',
    tkName: 'Keniýa',
    tkCapital: 'Naýrobi'
  },
  ng: {
    ruName: 'Нигерия',
    ruCapital: 'Абуджа',
    tkName: 'Nigeriýa',
    tkCapital: 'Abuja'
  },
  ma: {
    ruName: 'Марокко',
    ruCapital: 'Рабат',
    tkName: 'Marokko',
    tkCapital: 'Rabat'
  },
  et: {
    ruName: 'Эфиопия',
    ruCapital: 'Аддис-Абеба',
    tkName: 'Efiopiýa',
    tkCapital: 'Addis-Abeba'
  },
  us: {
    ruName: 'Соединенные Штаты',
    ruCapital: 'Вашингтон',
    ruAliases: ['США', 'Соединенные Штаты Америки', 'Америка', 'USA', 'U.S.A.', 'United States of America'],
    tkName: 'Amerikanyň Birleşen Ştatlary',
    tkCapital: 'Waşington',
    tkAliases: ['ABŞ', 'Amerika', 'USA', 'U.S.A.', 'United States of America']
  },
  ca: {
    ruName: 'Канада',
    ruCapital: 'Оттава',
    tkName: 'Kanada',
    tkCapital: 'Ottawa'
  },
  mx: {
    ruName: 'Мексика',
    ruCapital: 'Мехико',
    tkName: 'Meksika',
    tkCapital: 'Mehiko'
  },
  cu: {
    ruName: 'Куба',
    ruCapital: 'Гавана',
    tkName: 'Kuba',
    tkCapital: 'Gawana'
  },
  jm: {
    ruName: 'Ямайка',
    ruCapital: 'Кингстон',
    tkName: 'Ýamaýka',
    tkCapital: 'Kingston'
  },
  br: {
    ruName: 'Бразилия',
    ruCapital: 'Бразилиа',
    tkName: 'Braziliýa',
    tkCapital: 'Brazilia'
  },
  ar: {
    ruName: 'Аргентина',
    ruCapital: 'Буэнос-Айрес',
    tkName: 'Argentina',
    tkCapital: 'Buenos-Aýres'
  },
  pe: {
    ruName: 'Перу',
    ruCapital: 'Лима',
    tkName: 'Peru',
    tkCapital: 'Lima'
  },
  co: {
    ruName: 'Колумбия',
    ruCapital: 'Богота',
    tkName: 'Kolumbiýa',
    tkCapital: 'Bogota'
  },
  cl: {
    ruName: 'Чили',
    ruCapital: 'Сантьяго',
    tkName: 'Çili',
    tkCapital: 'Santýago'
  },
  au: {
    ruName: 'Австралия',
    ruCapital: 'Канберра',
    tkName: 'Awstraliýa',
    tkCapital: 'Kanberra'
  },
  nz: {
    ruName: 'Новая Зеландия',
    ruCapital: 'Веллингтон',
    tkName: 'Täze Zelandiýa',
    tkCapital: 'Vellington'
  },
  fj: {
    ruName: 'Фиджи',
    ruCapital: 'Сува',
    tkName: 'Fiji',
    tkCapital: 'Suwa'
  }
};

function buildRuFacts(country, ruContinent, ruRegion, ruCapital) {
  return [
    `Эта страна находится в регионе: ${ruRegion}.`,
    `Ее столица: ${ruCapital}.`,
    `Она расположена на континенте: ${ruContinent}.`,
    `В международном формате используется код ${country.id.toUpperCase()}.`,
    `Флаг этой страны: ${country.flag}.`
  ];
}

function buildTkFacts(country, tkContinent, tkRegion, tkCapital) {
  return [
    `Bu ýurt ${tkRegion} sebitinde ýerleşýär.`,
    `Bu ýurduň paýtagty: ${tkCapital}.`,
    `Ol ${tkContinent} materiginde ýerleşýär.`,
    `Halkara formatda ${country.id.toUpperCase()} kody ulanylýar.`,
    `Bu ýurduň baýdagy: ${country.flag}.`
  ];
}

const COUNTRY_LOCALIZATION = (() => {
  const map = {};

  if (typeof COUNTRIES === 'undefined') {
    return map;
  }

  COUNTRIES.forEach(country => {
    const core = COUNTRY_LOCALIZATION_CORE[country.id];
    if (!core) {
      return;
    }

    const ruContinent = RU_CONTINENTS[country.continent] || country.continent;
    const tkContinent = TK_CONTINENTS[country.continent] || country.continent;
    const ruRegion = RU_REGIONS[country.region] || country.region;
    const tkRegion = TK_REGIONS[country.region] || country.region;

    map[country.id] = {
      ru: {
        name: core.ruName,
        capital: core.ruCapital,
        continent: ruContinent,
        region: ruRegion,
        facts: buildRuFacts(country, ruContinent, ruRegion, core.ruCapital),
        aliases: core.ruAliases || []
      },
      tk: {
        name: core.tkName,
        capital: core.tkCapital,
        continent: tkContinent,
        region: tkRegion,
        facts: buildTkFacts(country, tkContinent, tkRegion, core.tkCapital),
        aliases: core.tkAliases || []
      }
    };
  });

  return map;
})();

window.COUNTRY_LOCALIZATION = COUNTRY_LOCALIZATION;
