import axios from 'axios';

const urlWHO = 'https://corona-api.com/countries';

export const filterWHO = (countries) => (
  {
    code: countries.data.code,
    name: countries.data.name,
    population: countries.data.population,
    confirmed: countries.data.latest_data.confirmed,
    critical: countries.data.latest_data.critical,
    deaths: countries.data.latest_data.deaths,
    casesPerMillion: countries.data.latest_data.calculated.cases_per_million_population,
    deathRate: countries.data.latest_data.calculated.death_rate,
    timeline: countries.data.timeline.slice(0, 7).map((info) => ({
      date: info.date,
      newConfirmed: info.new_confirmed,
      newDeaths: info.new_deaths,
    })),
  }
);

const axiosGetWHO = async (code = '') => {
  try {
    const response = await axios.get(`${urlWHO}/${code}`);
    return filterWHO(response.data);
  } catch (error) {
    throw new Error(error);
  }
};

export default axiosGetWHO;
