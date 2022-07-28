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
