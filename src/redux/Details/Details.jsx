import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosGetDetails from './axiosGetDetails';

const FETCH = 'covid19/details/FETCH';

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
  async (slug, { dispatch }) => {
    const res = await axiosGetDetails(slug)
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
