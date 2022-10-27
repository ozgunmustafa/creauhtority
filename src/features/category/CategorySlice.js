import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openLoginModal, setLoading } from '../settings/siteSettingSlice';
import CategoryService from './CategoryService';

const initialState = {
  featuredCategories: {
    loading: false,
    data: null,
    error: '',
    message: '',
  },
  categoryDetails: {
    loading: true,
    data: {},
    message: '',
  },

  popularCategories: {
    loading: false,
    data: null,
    error: '',
    message: '',
  },
};
export const getCategoryDetails = createAsyncThunk(
  'getCategory',
  async (categoryId, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));

    try {
      const res = await CategoryService.getSingleCategory(categoryId);
      thunkAPI.dispatch(setLoading(false));

      return res.data.data;
    } catch (err) {
      thunkAPI.dispatch(setLoading(false));
      console.log(err);
    }
  },
);
export const getFeaturedCategories = createAsyncThunk(
  'getFeaturedCategories',
  async (load, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const res = await CategoryService.getFeaturedCategories();
      thunkAPI.dispatch(setLoading(false));
      return res.data.data;
    } catch (err) {
      thunkAPI.dispatch(setLoading(false));
      console.log(err);
    }
  },
);
export const getPopularCategories = createAsyncThunk(
  'getPopularCategories',
  async (load, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const res = await CategoryService.getPopularCategories();
      thunkAPI.dispatch(setLoading(false));
      return res.data.data;
    } catch (err) {
      thunkAPI.dispatch(setLoading(false));
      console.log(err);
    }
  },
);
export const followCategory = createAsyncThunk(
  'followCategory',
  async (categoryId, { dispatch, getState }) => {
    try {
      const userAuth = getState().auth.authToken;
      if (userAuth) {
        const res = await CategoryService.followCategory(categoryId);
        return res.data;
      } else {
        dispatch(openLoginModal());
      }
    } catch (err) {
      console.err(err);
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryDetails.pending, (state, action) => {
        state.categoryDetails.loading = true;
        state.categoryDetails.message = 'Data Fetching';
      })
      .addCase(getCategoryDetails.fulfilled, (state, action) => {
        state.categoryDetails.loading = false;
        state.categoryDetails.message = 'Data Fetched';
        state.categoryDetails.data = action.payload;
      })
      .addCase(getCategoryDetails.rejected, (state, action) => {
        state.categoryDetails.loading = false;
        state.categoryDetails.message = 'An error occured when data fetching';
      })
      .addCase(getPopularCategories.pending, (state, action) => {
        state.popularCategories.loading = true;
        state.popularCategories.error = '';
      })
      .addCase(getPopularCategories.fulfilled, (state, action) => {
        state.popularCategories.loading = false;
        state.popularCategories.data = action.payload;
      })
      .addCase(getPopularCategories.rejected, (state, action) => {
        state.popularCategories.loading = false;
        state.popularCategories.error =
          'An error occurred while featured categories';
      })
      .addCase(getFeaturedCategories.pending, (state, action) => {
        state.featuredCategories.loading = true;
        state.featuredCategories.error = '';
      })
      .addCase(getFeaturedCategories.fulfilled, (state, action) => {
        state.featuredCategories.loading = false;
        state.featuredCategories.data = action.payload;
      })
      .addCase(getFeaturedCategories.rejected, (state, action) => {
        state.featuredCategories.loading = false;
        state.featuredCategories.error =
          'An error occurred while featured categories';
      })
      .addCase(followCategory.pending, (state, action) => {
        state.featuredCategories.loading = true;
        state.featuredCategories.error = '';
      })
      .addCase(followCategory.fulfilled, (state, action) => {
        state.featuredCategories.loading = false;
        state.featuredCategories.message = action.payload;
      })
      .addCase(followCategory.rejected, (state, action) => {
        state.featuredCategories.loading = false;
        state.featuredCategories.error =
          'An error occurred while follow categories';
      });
  },
});

export default categorySlice.reducer;
