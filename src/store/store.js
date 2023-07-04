import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../reducer/weatherData';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
