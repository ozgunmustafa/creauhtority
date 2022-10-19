import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading } from '../settings/siteSettingSlice';
import CategoryService from './CategoryService';

const initialState = {
  featuredCategories: {
    loading: false,
    data: null,
    error: '',
    message: '',
  },
};

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

export const followCategory = createAsyncThunk(
  'followCategory',
  async ({ token, categoryId }, { dispatch, getState }) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/categories/${categoryId}/follow`,
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer: ${getState().auth.authToken}`,
            Authorization: `Bearer: ${token}`,
          },
        },
      );
      return res.data;
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
