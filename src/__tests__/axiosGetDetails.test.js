import { filterDetails } from '../redux/Details/axiosGetDetails';

const covidData = {
  data: {
    code: 'BR',
    coordinates: {
      latitude: -10,
      longitude: -55,
    },
    latest_data: {
      calculated: {
        death_rate: 2.7837054080493573,
        recovery_rate: 95.30557939527795,
        recovered_vs_death_ratio: null,
        cases_per_million_population: 8318,
      },
    },
    confirmed: 21327616,
    critical: 407510,
    deaths: 593698,
    recovered: 20326408,
    name: 'Brazil',
    population: 201103330,
    timeline: [{
      active: 33026589,
      confirmed: 33704393,
      date: '2022-07-28',
      deaths: 677804,
      new_confirmed: 44514,
      new_deaths: 310,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-28T04:20:56.000Z',
    },
    {
      active: 32982385,
      confirmed: 33659879,
      date: '2022-07-27',
      deaths: 677494,
      new_confirmed: 37914,
      new_deaths: 351,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-27T04:21:04.000Z',
    },
    {
      active: 32944822,
      confirmed: 33621965,
      date: '2022-07-26',
      deaths: 677143,
      new_confirmed: 30609,
      new_deaths: 179,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-26T04:20:58.000Z',
    },
    {
      active: 32914392,
      confirmed: 33591356,
      date: '2022-07-25',
      deaths: 676964,
      new_confirmed: 35830,
      new_deaths: 198,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-25T04:20:51.000Z',
    },
    {
      active: 32878760,
      confirmed: 33555526,
      date: '2022-07-24',
      deaths: 676766,
      new_confirmed: 0,
      new_deaths: 0,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-24T04:20:47.000Z',
    },
    {
      active: 32878760,
      confirmed: 33555526,
      date: '2022-07-23',
      deaths: 676766,
      new_confirmed: 49799,
      new_deaths: 280,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-23T04:20:53.000Z',
    },
    {
      active: 32829241,
      confirmed: 33505727,
      date: '2022-07-22',
      deaths: 676486,
      new_confirmed: 51433,
      new_deaths: 269,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-22T04:21:15.000Z',
    },
    {
      active: 32778077,
      confirmed: 33454294,
      date: '2022-07-21',
      deaths: 676217,
      new_confirmed: 56480,
      new_deaths: 346,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-21T04:21:10.000Z',
    },
    {
      active: 32721943,
      confirmed: 33397814,
      date: '2022-07-20',
      deaths: 675871,
      new_confirmed: 57999,
      new_deaths: 353,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-20T04:20:59.000Z',
    },
    {
      active: 32664297,
      confirmed: 33339815,
      date: '2022-07-19',
      deaths: 675518,
      new_confirmed: 38697,
      new_deaths: 168,
      new_recovered: 0,
      recovered: 0,
      updated_at: '2022-07-19T04:20:58.000Z',
    }],
    today: {
      deaths: 0,
      confirmed: 0,
    },
  },
};

describe('Test the filterDetails function', () => {
  test('code of the input object', () => {
    expect(covidData.data.code).toBe('BR');
  });

  test('code of the output object', () => {
    expect(filterDetails(covidData).code).toBe('BR');
  });

  test('name of the input object', () => {
    expect(covidData.data.name).toBe('Brazil');
  });

  test('name of the output object', () => {
    expect(filterDetails(covidData).name).toBe('Brazil');
  });

  test('recovered of the input object', () => {
    expect(covidData.data.recovered).toBeDefined();
  });

  test('recovered of the output object', () => {
    expect(filterDetails(covidData).recovered).toBeUndefined();
  });

  test('size of timeline array of the input object', () => {
    expect(covidData.data.timeline.length).toBe(10);
  });

  test('size of timeline array of the output object', () => {
    expect(filterDetails(covidData).timeline.length).toBe(7);
  });

  test('date of the first item of timeline input object', () => {
    expect(covidData.data.timeline[0].date).toBe('2022-07-28');
  });

  test('date of the first item of timeline output object after reverse and slice', () => {
    expect(filterDetails(covidData).timeline[0].date).toBe('22');
  });

  test('new_deaths of the second item of timeline input object', () => {
    expect(covidData.data.timeline[1].new_deaths).toBe(351);
  });

  test('new_deaths of the second item of timeline output object', () => {
    expect(filterDetails(covidData).timeline[1].new_deaths).toBeUndefined();
  });

  test('newDeaths of the second item of timeline output object after reverse', () => {
    expect(filterDetails(covidData).timeline[5].newDeaths).toBe(351);
  });

  test('death_rate of the input object', () => {
    expect(covidData.data.latest_data.calculated.death_rate).toBe(2.7837054080493573);
  });

  test('death_rate of the output object', () => {
    expect(filterDetails(covidData).death_rate).toBeUndefined();
  });

  test('deathRate of the output object', () => {
    expect(filterDetails(covidData).deathRate).toBe(2.7837054080493573);
  });
});
