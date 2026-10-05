const fs = require('fs');
const readline = require('readline');

// Mapping WHO Country Names to your app's slugs and codes
const COUNTRY_MAP = {
  'Argentina': { slug: 'argentina', code: 'AR' },
  'Bolivia (Plurinational State of)': { slug: 'bolivia', code: 'BO' },
  'Brazil': { slug: 'brazil', code: 'BR' },
  'Chile': { slug: 'chile', code: 'CL' },
  'Colombia': { slug: 'colombia', code: 'CO' },
  'Ecuador': { slug: 'ecuador', code: 'EC' },
  'French Guiana': { slug: 'french-guiana', code: 'GF' },
  'Guyana': { slug: 'guyana', code: 'GY' },
  'Peru': { slug: 'peru', code: 'PE' },
  'Paraguay': { slug: 'paraguay', code: 'PY' },
  'Suriname': { slug: 'suriname', code: 'SR' },
  'Uruguay': { slug: 'uruguay', code: 'UY' },
  'Venezuela (Bolivarian Republic of)': { slug: 'venezuela', code: 'VE' },
};

async function processData() {
  const fileStream = fs.createReadStream('WHO-COVID-19-global-daily-data.csv');
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const dataset = {};
  Object.values(COUNTRY_MAP).forEach((c) => {
    dataset[c.slug] = [];
  });

  let isHeader = true;

  for await (const line of rl) {
    if (isHeader) {
      isHeader = false;
      continue;
    }

    // Split CSV (handling simple comma separations)
    const [date, countryCode, countryName, , newCases, cumCases, newDeaths, cumDeaths] = line.split(',');

    // Filter strictly for 2021 and South American countries
    const isTargetDate = date >= '2020-12-24' && date <= '2021-12-31';

    if (date && isTargetDate && COUNTRY_MAP[countryName]) {
      const { slug, code } = COUNTRY_MAP[countryName];
      dataset[slug].push({
        date: date.trim(),
        country: countryName.trim(),
        slug,
        code,
        newConfirmed: Math.max(0, parseInt(newCases, 10) || 0),
        confirmed: parseInt(cumCases, 10) || 0,
        newDeaths: Math.max(0, parseInt(newDeaths, 10) || 0),
        deaths: parseInt(cumDeaths, 10) || 0,
      });
    }
  }

  // Ensure output directory exists and save
  if (!fs.existsSync('data')) fs.mkdirSync('data');
  fs.writeFileSync('data/south_america_2021.json', JSON.stringify(dataset, null, 2));
  console.log('✅ Created data/south_america_2021.json successfully!');
}

processData();
