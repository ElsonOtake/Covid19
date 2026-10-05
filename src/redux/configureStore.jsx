import { configureStore, combineReducers } from '@reduxjs/toolkit';
import homeReducer from './Home/Home';
import detailsReducer from './Details/Details';

const rootReducer = combineReducers({
  homeReducer,
  detailsReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
