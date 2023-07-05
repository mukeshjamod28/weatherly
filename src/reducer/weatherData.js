import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weather: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    saveData: (state, action) => {
      const newData = {
        date_epoch: action.payload.date_epoch,
        data: action.payload,
      };
      const existingDataIndex = state.weather.findIndex((item) => item.date_epoch === newData.date_epoch);
      if (existingDataIndex !== -1) {
        state.weather[existingDataIndex] = newData;
      } else {
        state.weather.push(newData);
      }
    },
  },
});

export const { saveData } = dataSlice.actions;

export default dataSlice.reducer;
