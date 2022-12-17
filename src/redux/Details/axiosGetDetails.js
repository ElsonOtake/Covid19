import axios from 'axios';
import urlCovid19 from '../Global';

export const filterDetails = (data) => {
  const timeline = [];
  let date;
  let newConfirmed;
  let newDeaths;
  let Active;
  let auxConfirmed;
  let auxDeaths;
  data.slice(-8).forEach((info) => {
    if (auxConfirmed == null) {
      auxConfirmed = info.Confirmed;
      auxDeaths = info.Deaths;
    } else {
      date = info.Date.substr(8, 2);
      newConfirmed = info.Confirmed - auxConfirmed;
      auxConfirmed = info.Confirmed;
      newDeaths = info.Deaths - auxDeaths;
      auxDeaths = info.Deaths;
      Active = info.Active;
      timeline.push({
        date, newConfirmed, newDeaths, Active,
      });
    }
  });
  return (
    {
      name: data.slice(-1)[0].Country,
      active: data.slice(-1)[0].Active,
      timeline,
    }
  );
};

const today = new Date().toJSON().slice(0, 10);
const lastWeek = new Date(new Date().getTime() - (10 * 24 * 60 * 60 * 1000)).toJSON().slice(0, 10);

const axiosGetDetails = async (slug) => {
  try {
    const response = await axios.get(`${urlCovid19}total/country/${slug}?from=${lastWeek}&to=${today}`);
    return filterDetails(response.data);
  } catch (error) {
    throw new Error(error);
  }
};

export default axiosGetDetails;
