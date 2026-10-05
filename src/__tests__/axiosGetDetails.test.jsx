import axiosGetDetails from '../redux/Details/axiosGetDetails';

describe('Tests for axiosGetDetails service', () => {
  let brazilDetails;

  beforeAll(async () => {
    brazilDetails = await axiosGetDetails('brazil');
  });

  test('returns the correct country name', () => {
    expect(brazilDetails.name).toBe('Brazil');
  });

  test('contains confirmed and deaths counts', () => {
    expect(brazilDetails.confirmed).toBeGreaterThan(0);
    expect(brazilDetails.deaths).toBeGreaterThan(0);
  });

  test('returns a 7-day timeline for line charts', () => {
    expect(brazilDetails.timeline).toBeDefined();
    expect(brazilDetails.timeline.length).toBeGreaterThanOrEqual(7);
  });

  test('timeline items have date, newConfirmed, and newDeaths', () => {
    const firstDay = brazilDetails.timeline[0];
    expect(firstDay).toHaveProperty('date');
    expect(firstDay).toHaveProperty('newConfirmed');
    expect(firstDay).toHaveProperty('newDeaths');
  });

  test('throws error for invalid country slug', async () => {
    await expect(axiosGetDetails('invalid-country')).rejects.toThrow('Country not found');
  });
});
