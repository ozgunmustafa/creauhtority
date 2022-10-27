import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  language: 'tr',
  loading: false,
  loginModalIsOpen: false,
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
    openLoginModal: (state, action) => {
      state.loginModalIsOpen = true;
    },
    closeLoginModal: (state, action) => {
      state.loginModalIsOpen = false;
    },
  },
});

export const { setTheme, setLang, setLoading,openLoginModal,closeLoginModal } = settingSlice.actions;

export default settingSlice.reducer;
