import { filterCovid19 } from '../redux/Home/axiosGetHome';

const covidData = {
  "ID": "80d15d47-588a-4276-8090-8872f57d9103",
  "Message": "",
  "Global": {
    "NewConfirmed": 710872,
    "TotalConfirmed": 650318672,
    "NewDeaths": 2552,
    "TotalDeaths": 6658397,
    "NewRecovered": 0,
    "TotalRecovered": 0,
    "Date": "2022-12-17T22:35:13.713Z"
  },
  "Countries": [
    {
      "ID": "c685c3c2-4b5c-40e9-8389-c5aec8d7728e",
      "Country": "Argentina",
      "CountryCode": "AR",
      "Slug": "argentina",
      "NewConfirmed": 0,
      "TotalConfirmed": 9766975,
      "NewDeaths": 0,
      "TotalDeaths": 130041,
      "NewRecovered": 0,
      "TotalRecovered": 0,
      "Date": "2022-12-17T22:35:13.713Z",
      "Premium": {}
    },
    {
      "ID": "a4c2b80e-df68-40c4-b95e-7b9e8538f55a",
      "Country": "China",
      "CountryCode": "CN",
      "Slug": "china",
      "NewConfirmed": 15726,
      "TotalConfirmed": 2693817,
      "NewDeaths": 32,
      "TotalDeaths": 16348,
      "NewRecovered": 0,
      "TotalRecovered": 0,
      "Date": "2022-12-17T22:35:13.713Z",
      "Premium": {}
    },
    {
      "ID": "744c423e-39b4-4935-b29a-2f2ccbc8223f",
      "Country": "Uruguay",
      "CountryCode": "UY",
      "Slug": "uruguay",
      "NewConfirmed": 0,
      "TotalConfirmed": 998047,
      "NewDeaths": 0,
      "TotalDeaths": 7548,
      "NewRecovered": 0,
      "TotalRecovered": 0,
      "Date": "2022-12-17T22:35:13.713Z",
      "Premium": {}
    }
  ]
}

describe('Test the filterCovid19 function', () => {
  test('size of the input object', () => {
    expect(covidData.Countries.length).toBe(3);
  });

  test('size of the output object', () => {
    expect(filterCovid19(covidData).length).toBe(2);
  });

  test('code of the input object', () => {
    expect(covidData.Countries[0].CountryCode).toBe('AR');
  });

  test('code of the output object', () => {
    expect(filterCovid19(covidData)[0].code).toBe('AR');
  });

  test('name of the input object outside South America', () => {
    expect(covidData.Countries[1].Country).toBe('China');
  });

  test('name of the output object South America filtered', () => {
    expect(filterCovid19(covidData)[1].name).toBe('Uruguay');
  });

  test('today of the input object', () => {
    expect(covidData.Countries[0].ID).toBeDefined();
  });

  test('today of the output object', () => {
    expect(filterCovid19(covidData)[0].ID).toBeUndefined();
  });

  test('critical of the third input object', () => {
    expect(covidData.Countries[2].TotalDeaths).toBe(7548);
  });

  test('critical of the second output object', () => {
    expect(filterCovid19(covidData)[1].deaths).toBe(7548);
  });
});
