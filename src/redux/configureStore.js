import { configureStore } from '@reduxjs/toolkit';
import covid19Reducer from './Home/Home';

const store = configureStore({
  reducer: covid19Reducer,
});

export default store;