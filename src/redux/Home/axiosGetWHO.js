import axios from 'axios';
import urlWHO from '../Global';

const southAmericaCountries = [
  'AR',
  'BO',
  'BR',
  'CL',
  'CO',
  'EC',
  'GF',
  'GY',
  'PE',
  'PY',
  'SR',
  'UY',
  'VE',
];

// export const filterWHO = (countries) => (
//   {
//     code: countries.data.code,
//     name: countries.data.name,
//     population: countries.data.population,
//     confirmed: countries.data.latest_data.confirmed,
//     critical: countries.data.latest_data.critical,
//     deaths: countries.data.latest_data.deaths,
//     casesPerMillion: countries.data.latest_data.calculated.cases_per_million_population,
//     deathRate: countries.data.latest_data.calculated.death_rate,
//     timeline: countries.data.timeline.slice(0, 7),
//   }
// );

export const filterWHO = (countries) => {
  const response = [];
  countries.data.forEach((country) => {
    if (southAmericaCountries.includes(country.code)) {
      response.push({
        code: country.code,
        name: country.name,
        population: country.population,
        confirmed: country.latest_data.confirmed,
        critical: country.latest_data.critical,
        deaths: country.latest_data.deaths,
        casesPerMillion: country.latest_data.calculated.cases_per_million_population,
        deathRate: country.latest_data.calculated.death_rate,
        timeline: [],
      });
    }
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
