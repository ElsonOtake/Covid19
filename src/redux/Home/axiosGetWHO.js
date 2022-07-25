import axios from 'axios';

const urlWHO = 'https://corona-api.com/';

export const filterWHO = (countries) => {
  const response = [];
  countries.forEach((country) => {
    response.push({
      code: country.data.code,
      name: country.data.name,
      population: country.data.population,
      confirmed: country.data.latest_data.confirmed,
      critical: country.data.latest_data.critical,
      deaths: country.data.latest_data.deaths,
      casesPerMillion: country.data.calculated.cases_per_million_population,
      deathRate: country.data.calculated.death_rate,
      timeline: [],
    });
  });
  return response;
};

const axiosGetWHO = async () => {
  try {
    const response = await axios.get(urlWHO);
    return filterWHO(response.data);
  } catch (error) {
    throw new Error(error);
  }
};

export default axiosGetWHO;