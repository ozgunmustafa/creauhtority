import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLoading } from '../settings/siteSettingSlice';

import UserService from './UserService';

const initialState = {
  popularUsers: {
    message: '',
    loading: false,
    data: [],
  },
  userShown: {
    message: '',
    loading: false,
    data: {
      name: '',
      email: '',
      role: '',
      links: {},
      profile_img: '',
      blocked: false,
      likes: [],
      following: [],
      followingCategory: [],
      followingUser: [],
      followers: [],
      about:'',
    },
  },
  usersPosts: {
    message: '',
    loading: false,
    data: [],
  },
};

export const getPopularUsers = createAsyncThunk('getPopularUsers', async () => {
  try {
    const res = await UserService.getPopularUsers();
    return res.data.data;
  } catch (err) {
    console.err(err);
  }
});

export const getUser = createAsyncThunk(
  'getUser',
  async (userId, { dispatch }) => {
    try {
      const res = await UserService.getUser(userId);
      return res.data.data;
    } catch (err) {
      console.err(err);
    }
  },
);
export const getUsersPosts = createAsyncThunk(
  'getUsersPosts',
  async (userId, { dispatch }) => {
    try {
      const res = await UserService.getUsersPosts(userId);
      return res.data.data;
    } catch (err) {
      console.err(err);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularUsers.pending, (state, action) => {
        state.popularUsers.loading = true;
        state.popularUsers.message = 'Popular users are fetching';
      })
      .addCase(getPopularUsers.fulfilled, (state, action) => {
        state.popularUsers.loading = false;
        state.popularUsers.message = 'Popular users fetched';
        state.popularUsers.data = action.payload;
      })
      .addCase(getPopularUsers.rejected, (state, action) => {
        state.popularUsers.loading = false;
        state.popularUsers.message = 'An error occured when data fetching.';
      })
      .addCase(getUser.pending, (state, action) => {
        state.userShown.loading = true;
        state.userShown.message = 'User is fetching';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userShown.loading = false;
        state.userShown.data = action.payload;
        state.userShown.message = 'User details fetched';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userShown.loading = false;
        state.userShown.message = 'An error occured when data fetching.';
      })
      .addCase(getUsersPosts.pending, (state, action) => {
        state.usersPosts.loading = true;
        state.usersPosts.message = 'Posts are fetching.';
      })
      .addCase(getUsersPosts.fulfilled, (state, action) => {
        state.usersPosts.loading = false;
        state.usersPosts.data = action.payload;
        state.usersPosts.message = 'Posts Fetched';
      })
      .addCase(getUsersPosts.rejected, (state, action) => {
        state.usersPosts.loading = false;
        state.usersPosts.message = 'An error occured when data fetching.';
      });
  },
});

export default userSlice.reducer;
