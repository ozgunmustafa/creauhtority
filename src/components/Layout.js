import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeLoginModal,
  setLang,
  setLoading,
} from '../features/settings/siteSettingSlice';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import LoadingBar from './partials/LoadingBar';
import Modal from 'react-modal';
import { TextField } from './partials/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginCall } from '../features/auth/authApiCalls';


const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const loginValidation = Yup.object().shape({
    email: Yup.string()
      .email(() => t('validation.invalid', { inputName: t('email') }))
      .required(() => t('validation.required', { inputName: t('email') })),
    password: Yup.string()
      .min(6, () => t('validation.minLength', { count: '6' }))
      .required(() =>
        t('validation.required', { inputName: t('password.key') }),
      ),
  });

  const { language, theme, loading, loginModalIsOpen } = useSelector(
    (state) => state.settings,
  );
  const { authenticatedUser, authToken } = useSelector((state) => state.auth);

  const setUILanguage = (lng) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLang(language === lng));
      i18n.changeLanguage((i18n.language = lng));
      dispatch(setLoading(false));
    }, 1000);
  };
  useEffect(() => {
    Modal.setAppElement('body');
  });

  return (
    <React.Fragment>
      {loading && <LoadingBar type="fullsize" color="text-slate-600" />}
      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={() => {
          dispatch(closeLoginModal());
        }}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="  p-4 rounded-lg lg:p-10 lg:border lg:border-zinc-300 lg:bg-white">
          <h1 className="text-3xl font-medium"> {t('login')}</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidation}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(loginCall(values)).then((res) => {
                setSubmitting(false);
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="py-6 ">
                  <div className="mb-3">
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder={t('placeholder', {
                        inputName: `${t('email').toLowerCase()}`,
                      })}
                    />
                  </div>

                  <div className="mb-3">
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      placeholder={t('placeholder', {
                        inputName: `${t('password.key').toLowerCase()}`,
                      })}
                    />
                  </div>
                </div>
                <button
                  className="btn capitalize rounded-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {t('login')}
                </button>
              </form>
            )}
          </Formik>

        </div>
      </Modal>
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
                className="bg-slate-200 py-2 px-4 mr-3 text-slate-500 rounded-full "
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
