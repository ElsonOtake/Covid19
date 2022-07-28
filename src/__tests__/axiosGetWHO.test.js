import { filterWHO } from '../redux/Home/axiosGetWHO';

const covidData = {
  data: [{
    code: 'AR',
    coordinates: {
      latitude: -34,
      longitude: -64,
    },
    latest_data: {
      calculated: {
        death_rate: 2.187680456298307,
        recovery_rate: 97.31493411791199,
        recovered_vs_death_ratio: null,
        cases_per_million_population: 1271,
      },
    },
    confirmed: 5248847,
    critical: 26107,
    deaths: 114828,
    recovered: 5107912,
    name: 'Argentina',
    population: 41343201,
    today: {
      deaths: 0,
      confirmed: 0,
    },
    updated_at: '2022-07-28T14:32:54.834Z',
  },
  {
    code: 'CN',
    coordinates: {
      latitude: 35,
      longitude: 105,
    },
    latest_data: {
      calculated: {
        death_rate: 4.8298710228575,
        recovery_rate: 94.10747400662596,
        recovered_vs_death_ratio: null,
        cases_per_million_population: 12,
      },
    },
    confirmed: 95986,
    critical: 1020,
    deaths: 4636,
    recovered: 90330,
    name: 'China',
    population: 1330044000,
    today: {
      deaths: 0,
      confirmed: 38,
    },
    updated_at: '2022-07-28T14:32:54.834Z',
  },
  {
    code: 'UY',
    coordinates: {
      latitude: -33,
      longitude: -56,
    },
    latest_data: {
      calculated: {
        cases_per_million_population: 15,
        death_rate: 1.5582790171845908,
        recovered_vs_death_ratio: null,
        recovery_rate: 98.0623878160144,
      },
      deaths: 6051,
      confirmed: 388313,
      recovered: 380789,
      critical: 1473,
    },
    name: 'Uruguay',
    population: 3477000,
    today: {
      deaths: 0,
      confirmed: 0,
    },
    updated_at: '2022-07-28T14:32:54.834Z',
  }],
};

describe('Test the filterWHO function', () => {
  test('size of the input object', () => {
    expect(covidData.data.length).toBe(3);
  });

  test('size of the output object', () => {
    expect(filterWHO(covidData).length).toBe(2);
  });

  test('code of the input object', () => {
    expect(covidData.data[0].code).toBe('AR');
  });

  test('code of the output object', () => {
    expect(filterWHO(covidData)[0].code).toBe('AR');
  });

  test('name of the input object outside South America', () => {
    expect(covidData.data[1].name).toBe('China');
  });

  test('name of the output object South America filtered', () => {
    expect(filterWHO(covidData)[1].name).toBe('Uruguay');
  });

  test('today of the input object', () => {
    expect(covidData.data[0].today).toBeDefined();
  });

  test('today of the output object', () => {
    expect(filterWHO(covidData)[0].today).toBeUndefined();
  });

  test('critical of the third input object', () => {
    expect(covidData.data[2].latest_data.critical).toBe(1473);
  });

  test('critical of the second output object', () => {
    expect(filterWHO(covidData)[1].critical).toBe(1473);
  });
});
