import { filterDetails } from '../redux/Details/axiosGetDetails';

const covidData = [
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35396191,
    Deaths: 690229,
    Recovered: 0,
    Active: 34705962,
    Date: '2022-12-07T00:00:00Z',
  },
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35531716,
    Deaths: 690677,
    Recovered: 0,
    Active: 34841039,
    Date: '2022-12-08T00:00:00Z',
  },
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35531716,
    Deaths: 690677,
    Recovered: 0,
    Active: 34841039,
    Date: '2022-12-09T00:00:00Z',
  },
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35531716,
    Deaths: 690677,
    Recovered: 0,
    Active: 34841039,
    Date: '2022-12-10T00:00:00Z',
  },
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35531716,
    Deaths: 690677,
    Recovered: 0,
    Active: 34841039,
    Date: '2022-12-11T00:00:00Z',
  },
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35643770,
    Deaths: 691015,
    Recovered: 0,
    Active: 34952755,
    Date: '2022-12-12T00:00:00Z',
  },
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35696918,
    Deaths: 691178,
    Recovered: 0,
    Active: 35005740,
    Date: '2022-12-13T00:00:00Z',
  },
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35751411,
    Deaths: 691449,
    Recovered: 0,
    Active: 35059962,
    Date: '2022-12-14T00:00:00Z',
  },
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35809832,
    Deaths: 691652,
    Recovered: 0,
    Active: 35118180,
    Date: '2022-12-15T00:00:00Z',
  },
  {
    Country: 'Brazil',
    CountryCode: '',
    Province: '',
    City: '',
    CityCode: '',
    Lat: '0',
    Lon: '0',
    Confirmed: 35869526,
    Deaths: 691810,
    Recovered: 0,
    Active: 35177716,
    Date: '2022-12-16T00:00:00Z',
  },
];

describe('Test the filterDetails function', () => {
  test('code of the input object', () => {
    expect(covidData.slice(-1)[0].Country).toBe('Brazil');
  });

  test('code of the output object', () => {
    expect(filterDetails(covidData).name).toBe('Brazil');
  });

  test('recovered of the input object', () => {
    expect(covidData.slice(-1)[0].City).toBeDefined();
  });

  test('recovered of the output object', () => {
    expect(filterDetails(covidData).City).toBeUndefined();
  });

  test('size of timeline array of the input object', () => {
    expect(covidData.length).toBe(10);
  });

  test('size of timeline array of the output object', () => {
    expect(filterDetails(covidData).timeline.length).toBe(7);
  });

  test('date of the first item of timeline input object', () => {
    expect(covidData[0].Date).toBe('2022-12-07T00:00:00Z');
  });

  test('date of the first item of timeline output object after slice(-7)', () => {
    expect(filterDetails(covidData).timeline[0].date).toBe('10');
  });

  test('Active of the last item of timeline input object', () => {
    expect(covidData.slice(-1)[0].Active).toBe(35177716);
  });

  test('Active (capital A) of the last item of timeline output object', () => {
    expect(filterDetails(covidData).timeline[6].Active).toBeUndefined();
  });

  test('active of the last item of timeline output object', () => {
    expect(filterDetails(covidData).timeline[6].active).toBe(35177716);
  });

  test('Confirmed of the last item of timeline input object', () => {
    expect(covidData.slice(-1)[0].Confirmed).toBe(35869526);
  });

  test('Confirmed of the penultimate item of timeline input object', () => {
    expect(covidData.slice(-2)[0].Confirmed).toBe(35809832);
  });

  test('newConfirmed of the last item of timeline output object must be the difference of the last two', () => {
    expect(filterDetails(covidData).timeline[6].newConfirmed).toBe(35869526 - 35809832);
  });
});
