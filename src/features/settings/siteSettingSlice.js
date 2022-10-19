import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  language: 'tr',
  loading: false,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLang: (state, action) => {
      state.language = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setTheme, setLang, setLoading } = settingSlice.actions;

export default settingSlice.reducer;
