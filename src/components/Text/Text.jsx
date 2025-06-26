import React, { forwardRef, memo } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import enTranslation from "../../translation/enTranslation.json"
import en from '../../constants/language';
import ruTranslation from "../../translation/ruTranslation.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ru : {translation : ruTranslation}
    },
    lng: en ? "en" : "ru", // set default language
    fallbackLng: 'en', // set fallback language
    interpolation: { escapeValue: false },
  });

const Text = forwardRef(({ children, className = "",  ...props} , ref) => {
    const { t } = useTranslation();
    return (
        <p className={className} ref={ref} {...props}>{t(String(children))}</p>
    );
});

export default memo(Text);