import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const apiWithHeader = (token) => {
  if (!token) return;

  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer: ${token}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};
