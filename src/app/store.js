import { configureStore } from '@reduxjs/toolkit';
import authenticatedUserSlice from '../features/auth/authSlice';
import categorySlice from '../features/category/CategorySlice';
import postSlice from '../features/post/PostSlice';
import siteSettingSlice from '../features/settings/siteSettingSlice';

export const store = configureStore({
  reducer: {
    settings: siteSettingSlice,
    auth: authenticatedUserSlice,
    categories: categorySlice,
    posts:postSlice
  },
});
