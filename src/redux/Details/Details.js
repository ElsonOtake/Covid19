import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosGetDetails from './axiosGetDetails';

const FETCH = 'who-covid19/details/FETCH';

const detailsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH:
      return action.payload;
    default:
      return state;
  }
};

export const fetchDetails = createAsyncThunk(
  FETCH,
  async (code, { dispatch }) => {
    const res = await axiosGetDetails(code)
      .then(
        (data) => dispatch({
          type: FETCH,
          payload: data,
        }),
      );
    return res;
  },
);

export default detailsReducer;
