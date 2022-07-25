import axios from 'axios';

const urlWHO = 'https://corona-api.com/countries';

const axiosGetWHO = async () => {
  try {
    const response = await axios.get(urlWHO);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default axiosGetWHO;
