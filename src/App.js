import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { verifyAuthToken } from './features/auth/authApiCalls';

import Home from './pages/Home';
import Login from './pages/Login';
import PostDetails from './pages/PostDetails';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const authCookie = Cookies.get('token');

    if (!authCookie) {
      return;
    }
    dispatch(verifyAuthToken(authCookie)).then((res) => {
      console.log(res.payload);
      if (!res.payload) {
        Cookies.remove('token');
        return navigate('/login');
      }
    });
  }, [dispatch, navigate]);
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/post/:slug" element={<PostDetails />}></Route>
      <Route path="/category/:slug" element={<PostDetails />}></Route>
    </Routes>
  );
}

export default App;
