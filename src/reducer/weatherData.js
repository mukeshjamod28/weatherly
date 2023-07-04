import { createSlice } from '@reduxjs/toolkit';

let nextId = 1;

const initialState = {
  weather: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    saveData: (state, action) => {
      const newData = {
        id: nextId++,
        data: action.payload,
      };
      state.weather.push(newData);
    },
  },
});

export const { saveData } = dataSlice.actions;

export default dataSlice.reducer;
