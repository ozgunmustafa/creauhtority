import React from 'react';
import Layout from '../components/Layout';

import Image from '../components/partials/Image';
import { useDispatch, useSelector } from 'react-redux';
import { loginCall } from '../features/auth/authApiCalls';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import * as Yup from 'yup';
import { TextField } from '../components/partials/TextField';

const Login = () => {
  const { t } = useTranslation();

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

  const dispatch = useDispatch();

  // const handleSubmit = () => {
  //   dispatch(
  //     loginCall({ email: 'ozzgunmustafa@gmail.com', password: '1234567' }),
  //   );
  // };

  return (
    <Layout>
      <div className="flex items-center flex-wrap py-8">
        <div className="w-full  lg:w-2/3">
          <div className="flex justify-center items-center">
            <Image
              alt="exercitation in veniam ex ad. Commodo in ipsum sunt reprehenderi"
              url="/login-illustration.svg"
              classNames="w-2/3 lg:w-4/6"
            />
          </div>
        </div>
        <div className=" w-full lg:w-1/3 ">
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
                  <button className="btn capitalize rounded-full" type="submit" disabled={isSubmitting}>
                    {t('login')}
                  </button>
                </form>
              )}
            </Formik>

            {/*
            <button className="btn" onClick={handleSubmit}>
              Log in
            </button> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
