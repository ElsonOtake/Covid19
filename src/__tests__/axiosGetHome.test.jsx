import axiosGetHome from '../redux/Home/axiosGetHome';

describe('Tests for axiosGetHome service', () => {
  let homeData;

  beforeAll(async () => {
    homeData = await axiosGetHome();
  });

  test('returns all 13 South American countries', () => {
    expect(homeData.length).toBe(13);
  });

  test('each country contains required properties', () => {
    const firstCountry = homeData[0];
    expect(firstCountry).toHaveProperty('slug');
    expect(firstCountry).toHaveProperty('code');
    expect(firstCountry).toHaveProperty('name');
    expect(firstCountry).toHaveProperty('confirmed');
    expect(firstCountry).toHaveProperty('deaths');
    expect(firstCountry).toHaveProperty('date');
  });

  test('contains Brazil and Argentina', () => {
    const slugs = homeData.map((c) => c.slug);
    expect(slugs).toContain('brazil');
    expect(slugs).toContain('argentina');
  });

  test('confirmed and deaths are positive numbers', () => {
    const brazil = homeData.find((c) => c.slug === 'brazil');
    expect(brazil.confirmed).toBeGreaterThan(0);
    expect(brazil.deaths).toBeGreaterThan(0);
  });

  test('date is in 2021', () => {
    expect(homeData[0].date).toMatch(/^2021-/);
  });
});
