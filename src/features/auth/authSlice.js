import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: '',
  authenticatedUser: {
    _id: '',
    name: '',
    email: '',
    profile_img: '',
  },
};

export const authenticatedUserSlice = createSlice({
  name: 'authenticatedUser',
  initialState,
  reducers: {
    setAuthUserInfo: (state, action) => {
      state.authenticatedUser = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    destroyAuthentication: (state) => {
      state.authToken = '';
      state.userInfo = {
        _id: '',
        name: '',
        email: '',
        profile_img: '',
      };
    },
  },
});

export const { setAuthUserInfo, setAuthToken, destroyAuthentication } =
  authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
