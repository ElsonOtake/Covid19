import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosGetWHO from './axiosGetWHO';

const FETCH = 'who-covid19/home/FETCH';

const covid19Reducer = (state = [], action = {}) => {
  switch (action.type) {
    case FETCH:
      return action.payload;
    default:
      return state;
  }
};

export const fetchWHO = createAsyncThunk(
  FETCH,
  async (_, { dispatch }) => {
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
    const info = [];
    await Promise.all(southAmericaCountries.map((code) => {
      axiosGetWHO(code)
        .then(
          (data) => info.push(data),
        );
      return info;
    }));
    dispatch({
      type: FETCH,
      payload: info,
    });
  },
);

export default covid19Reducer;
