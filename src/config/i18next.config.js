// config/config-i18next.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import inicioES from '../assets/locales/es/inicio.json';
import inicioEN from '../assets/locales/en/inicio.json';
const resources = {
  en: {
    inicio:inicioEN
  },
  es: {
    inicio:inicioES
  },
};

i18n
  .use(initReactI18next) 
  .init({
    lng: 'es', 
    fallbackLng: 'en',
    debug: true, 
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
