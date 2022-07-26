import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosGetWHO from './axiosGetWHO';

const FETCH = 'who-covid19/home/FETCH';

const covid19Reducer = (state = [], action) => {
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
    const res = await axiosGetWHO()
      .then(
        (data) => dispatch({
          type: FETCH,
          payload: data,
        }),
      );
    return res;
  },
);

export default covid19Reducer;
