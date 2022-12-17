import axios from 'axios';
import urlCovid19 from '../Global';

const southAmericaCountries = [
  'argentina',
  'bolivia',
  'brazil',
  'chile',
  'colombia',
  'ecuador',
  'french-guiana',
  'guyana',
  'peru',
  'paraguay',
  'suriname',
  'uruguay',
  'venezuela',
];

// https://api.covid19api.com/total/country/brazil?from=2022-12-11T00:00:00Z&to=2022-12-17T00:00:00Z

export const filterCovid19 = (data) => {
  const response = [];
  data.Countries.forEach((country) => {
    if (southAmericaCountries.includes(country.Slug)) {
      response.push({
        slug: country.Slug,
        code: country.CountryCode,
        name: country.Country,
        confirmed: country.TotalConfirmed,
        deaths: country.TotalDeaths,
        date: country.Date,
      });
    }
  });
  return response;
};

const axiosGetHome = async () => {
  try {
    const response = await axios.get(`${urlCovid19}summary`);
    return filterCovid19(response.data);
  } catch (error) {
    throw new Error(error);
  }
};

export default axiosGetHome;
