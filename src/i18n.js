import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import localize from './localize/languages.json';

i18next.use(initReactI18next).init({
  resources: localize,
  lng: 'en',
});

export default i18next;
