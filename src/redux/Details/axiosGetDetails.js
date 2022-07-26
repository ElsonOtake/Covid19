import axios from 'axios';
import urlWHO from '../Global';

export const filterDetails = (country) => (
  {
    code: country.data.code,
    name: country.data.name,
    population: country.data.population,
    confirmed: country.data.latest_data.confirmed,
    critical: country.data.latest_data.critical,
    deaths: country.data.latest_data.deaths,
    casesPerMillion: country.data.latest_data.calculated.cases_per_million_population,
    deathRate: country.data.latest_data.calculated.death_rate,
    timeline: country.data.timeline.slice(0, 7).map((info) => ({
      date: info.date,
      newConfirmed: info.new_confirmed,
      newDeaths: info.new_deaths,
    })),
  }
);

const axiosGetDetails = async (code) => {
  try {
    const response = await axios.get(`${urlWHO}/${code}`);
    return filterDetails(response.data);
  } catch (error) {
    throw new Error(error);
  }
};

export default axiosGetDetails;
