import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLang, setLoading } from '../features/settings/siteSettingSlice';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import LoadingBar from './partials/LoadingBar';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { language, theme, loading } = useSelector((state) => state.settings);
  const { authenticatedUser, authToken } = useSelector((state) => state.auth);
  const setUILanguage = (lng) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLang(language === lng));
      i18n.changeLanguage((i18n.language = lng));
      dispatch(setLoading(false));
    }, 1000);
  };

  return (
    <React.Fragment>
      {loading && <LoadingBar type="fullsize" color="text-slate-600" />}
      <header className="bg-white lg:bg-transparent lg:border-b lg:border-gray-200 py-4 h-[75px] px-4 lg:px-1">
        <div className="flex justify-between items-center container mx-auto">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>

          <div className="flex items-center">
            {authenticatedUser?.name ? (
              <Link
                to="/"
                className="flex items-center border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all p-2  mr-3 text-slate-700 rounded-full"
              >
                <div className="avatar">
                  <div className="w-8 rounded-full border-4 border-slate-300">
                    <img
                      src="https://placeimg.com/192/192/people"
                      alt="Tailwind-CSS-Avatar-component"
                    />
                  </div>
                </div>

                <span className="mx-1 font-medium text-slate-500">
                  {authenticatedUser.name}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-slate-300 py-2 px-4 mr-3 text-slate-500 rounded-full "
              >
                {t('login')}
              </Link>
            )}

            <button
              className={`border border-transparent  border-r-slate-500  px-2 ${
                i18n.language === 'tr' ? 'text-slate-800' : 'text-slate-400'
              }`}
              onClick={() => setUILanguage('tr')}
            >
              TR
            </button>
            <button
              className={`border border-transparent    px-2 ${
                i18n.language === 'en' ? 'text-slate-800' : 'text-slate-400'
              }`}
              onClick={() => setUILanguage('en')}
            >
              EN
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto lg:py-3">{children}</main>
      <footer></footer>
    </React.Fragment>
  );
};

export default Layout;
