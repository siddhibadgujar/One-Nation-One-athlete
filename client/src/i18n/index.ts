import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en_common from './en/common.json';
import en_auth from './en/auth.json';
import en_dashboard from './en/dashboard.json';
import en_admin from './en/admin.json';
import hi_common from './hi/common.json';
import hi_auth from './hi/auth.json';
import hi_dashboard from './hi/dashboard.json';
import hi_admin from './hi/admin.json';
import mr_common from './mr/common.json';
import mr_auth from './mr/auth.json';
import mr_dashboard from './mr/dashboard.json';
import mr_admin from './mr/admin.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { common: en_common, auth: en_auth, dashboard: en_dashboard, admin: en_admin },
    hi: { common: hi_common, auth: hi_auth, dashboard: hi_dashboard, admin: hi_admin },
    mr: { common: mr_common, auth: mr_auth, dashboard: mr_dashboard, admin: mr_admin }
  }
});

export default i18n;
