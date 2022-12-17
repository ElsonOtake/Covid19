import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosGetHome from './axiosGetHome';

const FETCH = 'covid19/home/FETCH';

const homeReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH:
      return action.payload;
    default:
      return state;
  }
};

export const fetchCovid19 = createAsyncThunk(
  FETCH,
  async (_, { dispatch }) => {
    const res = await axiosGetHome()
      .then(
        (data) => dispatch({
          type: FETCH,
          payload: data,
        }),
      );
    return res;
  },
);

export default homeReducer;
