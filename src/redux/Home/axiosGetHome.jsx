import covidData from '../../data/south_america_2021.json';

function getSimulated2021Date() {
  const now = new Date();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  return `2021-${month}-${day}`;
}

const axiosGetHome = async () => {
  const targetDate = getSimulated2021Date();
  const summary = [];

  Object.keys(covidData).forEach((slug) => {
    const records = covidData[slug];
    const record = records.filter((r) => r.date <= targetDate).pop() || records[0];

    if (record) {
      summary.push({
        slug: record.slug,
        code: record.code,
        name: record.country,
        confirmed: record.confirmed,
        deaths: record.deaths,
        date: record.date,
      });
    }
  });

  return summary;
};

export default axiosGetHome;
