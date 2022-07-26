import { configureStore, combineReducers } from '@reduxjs/toolkit';
import covid19Reducer from './Home/Home';
import detailsReducer from './Details/Details';

const rootReducer = combineReducers({
  covid19Reducer,
  detailsReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
