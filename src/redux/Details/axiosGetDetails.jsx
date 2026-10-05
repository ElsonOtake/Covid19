import covidData from '../../data/south_america_2021.json';

function getSimulated2021Date() {
  const now = new Date();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  return `2021-${month}-${day}`;
}

const axiosGetDetails = async (slug) => {
  const records = covidData[slug];
  if (!records) {
    throw new Error('Country not found');
  }

  const targetDate = getSimulated2021Date();
  const pastRecords = records.filter((r) => r.date <= targetDate);
  const recentDays = pastRecords.slice(-8);

  const timeline = recentDays.map((r) => ({
    date: r.date.slice(8, 10),
    newConfirmed: r.newConfirmed,
    newDeaths: r.newDeaths,
  }));

  const latest = recentDays[recentDays.length - 1] || records[0];

  return {
    name: latest.country,
    confirmed: latest.confirmed,
    deaths: latest.deaths,
    timeline,
  };
};

export default axiosGetDetails;
