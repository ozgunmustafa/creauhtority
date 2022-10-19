import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../settings/siteSettingSlice';
import AuthServices from './authServices';
import Cookies from 'js-cookie';

import { setAuthToken, setAuthUserInfo } from './authSlice';
import api from '../api';
import axios from 'axios';

export const loginCall = createAsyncThunk(
  'login',
  async ({ email, password }, { dispatch }) => {
    console.log(email, password);

    try {
      dispatch(setLoading(true));
      const res = await AuthServices.loginUser({ email, password });

      dispatch(setAuthToken(res.data.access_token));
      dispatch(setAuthUserInfo(res.data.user));

      Cookies.set('token', res.data.access_token, { expires: 1000 });

      return res.data;
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const verifyAuthToken = createAsyncThunk(
  'verifyAuthToken',
  async (token, { dispatch }) => {
    api.defaults.headers.common['Authorization'] = `Bearer: ${token}`;
    try {
      const res = await api.post(
        `${process.env.REACT_APP_API_URL}/auth/verify-token`,
        {},
      );

      dispatch(setAuthToken(token));
      dispatch(setAuthUserInfo(res.data));

      return res.data;
    } catch (err) {
      console.log(err);
      //dispatch(setAuthToken(''));
      //dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  },
);
